# Stamp intrinsic width/height on every locally hosted <img> in the rendered HTML.
#
# Layout reserved for an image before it loads is what keeps Cumulative Layout
# Shift near zero, and news and article bodies carry raw <img> tags written by
# hand, so there is nowhere to put the numbers by hand without editing 250+
# published files. Reading them from the file at build time keeps the markup and
# the asset in sync forever.
#
# The same dimensions land in site.data["image_dims"] so JSON-LD can publish an
# ImageObject instead of a bare URL.

module LogbookImageSize
  JPEG_SOF = (0xC0..0xCF).to_a - [0xC4, 0xC8, 0xCC]

  class << self
    def cache
      @cache ||= {}
    end

    # => [width, height] or nil when the file is missing or not a raster we read.
    def dimensions(path)
      return cache[path] if cache.key?(path)

      cache[path] = begin
        File.open(path, "rb") { |io| read(io) }
      rescue SystemCallError, IOError
        nil
      end
    end

    private

    def read(io)
      head = io.read(32) or return nil
      io.rewind

      case head
      when /\A\x89PNG\r\n\x1a\n/n then png(io)
      when /\A\xff\xd8/n then jpeg(io)
      when /\AGIF8/n then gif(io)
      when /\ARIFF....WEBP/n then webp(io)
      end
    end

    def png(io)
      io.seek(16)
      width, height = io.read(8).unpack("N2")
      [width, height] if width.to_i.positive? && height.to_i.positive?
    end

    def jpeg(io)
      io.seek(2)
      loop do
        byte = io.read(1)
        return nil if byte.nil?
        next unless byte.unpack1("C") == 0xFF

        marker = io.read(1)
        return nil if marker.nil?
        marker = marker.unpack1("C")
        next if marker == 0xFF # fill bytes
        return nil if [0xD8, 0x01].include?(marker) || (0xD0..0xD7).cover?(marker)
        return nil if marker == 0xD9 # end of image, no frame header found

        length = io.read(2)&.unpack1("n")
        return nil if length.nil? || length < 2

        if JPEG_SOF.include?(marker)
          frame = io.read(5)
          return nil if frame.nil? || frame.bytesize < 5

          _precision, height, width = frame.unpack("Cn2")
          return [width, height] if width.to_i.positive? && height.to_i.positive?
          return nil
        end

        io.seek(length - 2, IO::SEEK_CUR)
      end
    end

    def gif(io)
      io.seek(6)
      width, height = io.read(4).unpack("v2")
      [width, height] if width.to_i.positive? && height.to_i.positive?
    end

    def webp(io)
      io.seek(12)
      chunk = io.read(4)
      case chunk
      when "VP8 "
        io.seek(26)
        width, height = io.read(4).unpack("v2")
        [width & 0x3FFF, height & 0x3FFF]
      when "VP8L"
        io.seek(21)
        bits = io.read(4).unpack1("V")
        [(bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1]
      when "VP8X"
        io.seek(24)
        bytes = io.read(6).unpack("C6")
        width = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16)
        height = bytes[3] | (bytes[4] << 8) | (bytes[5] << 16)
        [width + 1, height + 1]
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  dims = {}

  Dir.glob(File.join(site.source, "assets", "**", "*")).each do |path|
    next unless File.file?(path)
    next if path.split(File::SEPARATOR).any? { |part| part.start_with?("_") }

    size = LogbookImageSize.dimensions(path)
    next if size.nil?

    url = "/" + path.sub(/\A#{Regexp.escape(site.source)}\/?/, "")
    dims[url] = { "width" => size[0], "height" => size[1] }
  end

  site.data["image_dims"] = dims
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |item|
  next unless item.output_ext == ".html"
  next if item.output.nil?

  source = item.site.source

  # jekyll-seo-tag spells the schema.org type "imageObject" in its JSON-LD, and
  # schema.org type names are case-sensitive.
  item.output = item.output.gsub(/("@type":\s*)"imageObject"/, '\1"ImageObject"')

  item.output = item.output.gsub(/<img\b[^>]*>/) do |tag|
    next tag if tag =~ /\bwidth=/ && tag =~ /\bheight=/

    src = tag[/\bsrc=["']([^"']+)["']/, 1]
    next tag if src.nil? || src.start_with?("http", "//", "data:")

    size = LogbookImageSize.dimensions(File.join(source, src.split("?").first.split("#").first))
    next tag if size.nil?

    tag.sub(/\s*\/?>\z/) { %( width="#{size[0]}" height="#{size[1]}"#{Regexp.last_match(0).lstrip}) }
  end
end
