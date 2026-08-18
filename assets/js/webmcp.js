(function () {
  'use strict';

  function modelContext() {
    if (document.modelContext && typeof document.modelContext.registerTool === 'function') {
      return document.modelContext;
    }
    if (navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') {
      return navigator.modelContext;
    }
    return null;
  }

  function findByPath(items, path) {
    if (!path) return null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].url === path) return items[i];
    }
    return null;
  }

  function filterItems(items, query, category) {
    var result = items;
    if (query) {
      var q = String(query).toLowerCase();
      result = result.filter(function (item) {
        var title = (item.title || '').toLowerCase();
        var description = (item.description || '').toLowerCase();
        var tags = (item.tags || item.categories || []).join(' ').toLowerCase();
        return title.indexOf(q) !== -1 || description.indexOf(q) !== -1 || tags.indexOf(q) !== -1;
      });
    }
    if (category) {
      var c = String(category).toLowerCase();
      result = result.filter(function (item) {
        var cats = item.categories || [];
        for (var i = 0; i < cats.length; i++) {
          if (String(cats[i]).toLowerCase() === c) return true;
        }
        return false;
      });
    }
    return result;
  }

  function allowedPath(path, catalog) {
    if (!path || typeof path !== 'string' || path.charAt(0) !== '/') return false;
    if (path.indexOf('//') !== -1 || path.indexOf('\\') !== -1) return false;
    if (path === '/' || path === '/logbook/' || path === '/blog/') return true;
    var lists = (catalog.logbook || []).concat(catalog.blog || []);
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].url === path) return true;
    }
    return false;
  }

  function currentPage() {
    return {
      url: location.pathname,
      title: document.title,
      kind:
        location.pathname.indexOf('/logbook/') === 0
          ? 'ascent_report'
          : location.pathname.indexOf('/blog/') === 0
            ? 'note'
            : location.pathname === '/'
              ? 'home'
              : 'page'
    };
  }

  async function register(catalog) {
    var ctx = modelContext();
    if (!ctx) return;

    await ctx.registerTool({
      name: 'list_ascent_reports',
      description:
        'List published mountaineering ascent reports (گزارش صعود) on kavehrs.com. Optional query filters by title or description.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional search text in Persian or English' },
          category: {
            type: 'string',
            description:
              'Optional discipline slug: training-camp, snowfield, glacier, icefall, winter-ascent, high-altitude, technical-mountaineering, hiking, rock-climbing, wall-climbing'
          }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        return JSON.stringify(filterItems(catalog.logbook || [], args && args.query, args && args.category));
      }
    });

    await ctx.registerTool({
      name: 'list_notes',
      description:
        'List published technical notes (یادداشت‌ها) on kavehrs.com. Optional query filters by title or description.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional search text in Persian or English' }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        return JSON.stringify(filterItems(catalog.blog || [], args && args.query));
      }
    });

    await ctx.registerTool({
      name: 'search_site',
      description:
        'Search published ascent reports and notes on kavehrs.com by title, description, tag, or category.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search text in Persian or English' }
        },
        required: ['query']
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var query = args && args.query;
        return JSON.stringify({
          logbook: filterItems(catalog.logbook || [], query),
          blog: filterItems(catalog.blog || [], query)
        });
      }
    });

    await ctx.registerTool({
      name: 'get_ascent_report',
      description: 'Return one published ascent report (گزارش صعود) by its site path, such as /logbook/2026-08-07-kahar-peak/.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Catalog URL path beginning with /logbook/' }
        },
        required: ['path']
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var item = findByPath(catalog.logbook || [], args && args.path);
        return item ? JSON.stringify(item) : 'Not found: path is not a published ascent report.';
      }
    });

    await ctx.registerTool({
      name: 'get_note',
      description: 'Return one published note (یادداشت) by its site path, such as /blog/2026-08-18-mountaineering-return-knowledge/.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Catalog URL path beginning with /blog/' }
        },
        required: ['path']
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var item = findByPath(catalog.blog || [], args && args.path);
        return item ? JSON.stringify(item) : 'Not found: path is not a published note.';
      }
    });

    await ctx.registerTool({
      name: 'get_current_page',
      description: 'Return the current page path, title, and kind (home, ascent_report, note, or page).',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        return JSON.stringify(currentPage());
      }
    });

    await ctx.registerTool({
      name: 'open_page',
      description:
        'Open a same-site page: /, /logbook/, /blog/, or a published report/note URL from the catalog.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Site path such as /, /logbook/, /blog/, or a catalog URL'
          }
        },
        required: ['path']
      },
      annotations: { readOnlyHint: false },
      execute: async function (args) {
        var path = args && args.path;
        if (!allowedPath(path, catalog)) {
          return 'Refused: path is not a published page on this site.';
        }
        window.location.assign(path);
        return 'Opening ' + path;
      }
    });
  }

  var ctx = modelContext();
  if (!ctx) return;

  fetch('/webmcp-catalog.json', { credentials: 'same-origin' })
    .then(function (response) {
      if (!response.ok) throw new Error('catalog');
      return response.json();
    })
    .then(register)
    .catch(function () {});
})();
