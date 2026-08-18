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

  function filterItems(items, query) {
    if (!query) return items;
    var q = String(query).toLowerCase();
    return items.filter(function (item) {
      var title = (item.title || '').toLowerCase();
      var description = (item.description || '').toLowerCase();
      return title.indexOf(q) !== -1 || description.indexOf(q) !== -1;
    });
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
          query: { type: 'string', description: 'Optional search text in Persian or English' }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        return JSON.stringify(filterItems(catalog.logbook || [], args && args.query));
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
