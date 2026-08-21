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

  function allNotes(catalog) {
    return (catalog.notes || []).concat(catalog.tech || []);
  }

  function findByPath(items, path) {
    if (!path) return null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].url === path) return items[i];
    }
    return null;
  }

  function filterItems(items, query) {
    var result = items;
    if (query) {
      var q = String(query).toLowerCase();
      result = result.filter(function (item) {
        var title = (item.title || '').toLowerCase();
        var description = (item.description || '').toLowerCase();
        var tags = (item.tags || []).join(' ').toLowerCase();
        return title.indexOf(q) !== -1 || description.indexOf(q) !== -1 || tags.indexOf(q) !== -1;
      });
    }
    return result;
  }

  function allowedPath(path, catalog) {
    if (!path || typeof path !== 'string' || path.charAt(0) !== '/') return false;
    if (path.indexOf('//') !== -1 || path.indexOf('\\') !== -1) return false;
    if (path === '/' || path === '/notes/' || path === '/tech/' || path === '/blog/') return true;
    var lists = allNotes(catalog);
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].url === path) return true;
    }
    return false;
  }

  function currentPage() {
    var path = location.pathname;
    var kind = 'page';
    if (path === '/') kind = 'home';
    else if (path === '/notes/' || path.indexOf('/notes/') === 0) kind = 'personal_notes';
    else if (path === '/tech/' || path.indexOf('/tech/') === 0) kind = 'technical_notes';
    else if (path.indexOf('/blog/') === 0) kind = 'note';
    return { url: path, title: document.title, kind: kind };
  }

  async function register(catalog) {
    var ctx = modelContext();
    if (!ctx) return;

    await ctx.registerTool({
      name: 'list_personal_notes',
      description: 'List published personal notes (یادداشت‌های شخصی) on kavehrs.com.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional search text in Persian or English' }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        return JSON.stringify(filterItems(catalog.notes || [], args && args.query));
      }
    });

    await ctx.registerTool({
      name: 'list_technical_notes',
      description: 'List published technical notes (یادداشت‌های فنی) on kavehrs.com.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional search text in Persian or English' }
        }
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        return JSON.stringify(filterItems(catalog.tech || [], args && args.query));
      }
    });

    await ctx.registerTool({
      name: 'search_site',
      description: 'Search published personal and technical notes on kavehrs.com by title, description, or tag.',
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
          notes: filterItems(catalog.notes || [], query),
          tech: filterItems(catalog.tech || [], query)
        });
      }
    });

    await ctx.registerTool({
      name: 'get_note',
      description: 'Return one published note by its site path, such as /blog/2026-08-18-mountaineering-return-knowledge/.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Catalog URL path beginning with /blog/' }
        },
        required: ['path']
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var item = findByPath(allNotes(catalog), args && args.path);
        return item ? JSON.stringify(item) : 'Not found: path is not a published note.';
      }
    });

    await ctx.registerTool({
      name: 'get_ascent_report',
      description:
        'Climb reports are not on kavehrs.com. Given a former /logbook/ path, return the matching URL on logbook.rocks.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Former path beginning with /logbook/' }
        },
        required: ['path']
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var path = args && args.path;
        if (!path || path.indexOf('/logbook') !== 0) {
          return 'Not a logbook path. Ascent reports live at https://logbook.rocks/logbook/';
        }
        return JSON.stringify({
          moved: true,
          url: 'https://logbook.rocks' + path
        });
      }
    });

    await ctx.registerTool({
      name: 'get_current_page',
      description: 'Return the current page path, title, and kind (home, personal_notes, technical_notes, note, or page).',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        return JSON.stringify(currentPage());
      }
    });

    await ctx.registerTool({
      name: 'open_page',
      description: 'Open a same-site page: /, /notes/, /tech/, /blog/, or a published note URL from the catalog.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Site path such as /, /notes/, /tech/, /blog/, or a catalog URL'
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
