# صندوق پایش SEO و فهرست‌شدن به‌عنوان منبع هوش مصنوعی

منتشر نمی‌شود. هر ۴۵ دقیقه: راهنمای رسمی SEO + روش ارجاع/فهرست AI را بخوان؛ فقط سیگنال فنی روی سایت اعمال کن.

قوانین اعمال:

- `_blog/*.md` و `_logbook/*.md` را بازنویسی نکن (بدنه، عنوان، description، برچسب).
- متن باشگاه‌ها را کپی نکن.
- تغییرات مجاز: `robots.txt`، `/llms.txt`، کاتالوگ WebMCP، IndexNow، `rel=describedby`، JSON-LD در includes، هدر کلودفلر / Content-Signal.
- منبع اعمال: Google Search Central، Bing، schema.org، llmstxt.org، مستندات خزندهٔ OpenAI/Anthropic — نه وبلاگ‌های تصادفی SEO.

## ۲۸ مرداد ۱۴۰۵ / ۱۹ اوت ۲۰۲۶ — اصلاح مأموریت + اعمال اول

برداشت قبلی (گزارش باشگاه‌ها از SERP) اشتباه بود. مأموریت درست: رصد مطالب **سئو** و **قرارگیری سایت به‌عنوان منبع هوش مصنوعی**، سپس اعمال بدون آسیب به مطالب منتشرشده.

منابع خوانده‌شده:

- [llms.txt v2](https://llmstxt.org/) — فایل Markdown در ریشه؛ `rel=describedby` به `/llms.txt`؛ لینک‌های حاشیه‌ای برای عامل‌ها. Google این فایل را فاکتور رتبه نمی‌داند؛ برای عامل‌ها و ارجاع است.
- OpenAI crawlers: `OAI-SearchBot` برای ظاهر شدن در ChatGPT Search / citation؛ `GPTBot` جدا و برای آموزش مدل. اجازه به اولی با مسدود ماندن دومی سازگار است.
- Anthropic: `ClaudeBot` آموزش؛ `Claude-SearchBot` جستجو/ارجاع.
- Cloudflare Content Signals: `search` ایندکس است نه خلاصهٔ مولّد؛ برای پاسخ زنده / grounding باید `ai-input=yes`. `ai-train=no` و `use=reference` برای ارجاع بدون آموزش مدل مناسب است. بلوک managed کلودفلر هنوز GPTBot / Google-Extended / ClaudeBot را Disallow می‌کند — عمداً دست نخورده.
- Google AI Overviews از ایندکس Googlebot می‌آید؛ `Google-Extended` را برای آموزش مسدود کردن ارجاع Overview را قطع نمی‌کند. `nosnippet` ارجاع را می‌کشد — استفاده نشد.

اعمال روی سایت (بدون ویرایش `_blog/` و `_logbook/`):

- `/llms.txt` از روی عنوان و توضیح موجود گزارش‌ها و یادداشت‌ها ساخته می‌شود (ایندکس، نه بازنویسی متن).
- در `<head>`: `rel=describedby` → `/llms.txt` و `rel=alternate` JSON کاتالوگ WebMCP.
- `robots.txt` مبدأ: `Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference` به‌همراه Allow برای OAI-SearchBot / Claude-SearchBot / PerplexityBot / Googlebot / Bingbot.
- زمان‌بند ۴۵دقیقه‌ای: `.cursor/automations/seo-ai-source-watch-prompt.md` + `.github/workflows/seo-ai-source-watch.yml` (فقط وقتی اثرانگشت منابع رسمی عوض شود ایجنت را راه می‌اندازد).

منتشرنشده: `_seo/guidance-sources.yml` و `_seo/guidance-fingerprint.txt`.

تا شارژ حساب Cursor و روشن شدن Automation / `CURSOR_API_KEY`، حلقهٔ ۴۵دقیقه در داشبورد اجرا نمی‌شود؛ فایل‌ها آماده‌اند.
