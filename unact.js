// mini react

function hlist(e, start, args) {
  if (0 && args[0] instanceof Function) {
    trace++;
    var r = args[0](args[1]);
    trace--;
    console.log("CALL", args[1], "==>", r);
    return r;
  }

  for (let k in args) {
    if (k >= start) {
      var v = args[k];
      if (v === undefined || v === null) {
        ;
      } else if (v instanceof Function) {
        // console.log("OPTIMIZE!");
        var vv = v();
        // var vh = !vv || vv.hashCode;
        // var c = cache[vh];
        // if (c) yyy++;
        hlist(e, 0, [vv])
      } else if (v instanceof HTMLElement) {
        // subelements don't effect this dom elements rendering!
        // e.h('html', (e.append(v), v.hashCode));
        e.append(v);
      } else if (v instanceof String) {
        e.h('text', (e.append(v), v));
      } else if (Array.isArray(v)) {
        hlist(e, 0, v);
      } else if (v instanceof Object) {
        if (v.length !== undefined && v.toString === {}.toString) { // array style object
          hlist(e, 0, v);
        } else {
          e.h('text', (e.append(v), v));
        }
      } else {
        e.h('text', (e.append(v), v));
      }
    }
  }
}

function h(tag) {
  var args = (tag instanceof Object) ? tag : arguments;
  if (this instanceof String) tag = this;
  var e = document.createElement(tag);
  e.hashCode = '';
  e.h = function(name, val) { e.hashCode += name + '{' + val + '}'; return e; };
//  e.h = function(name, val) { return e; };
  e.a = function(name, val) { return e.h('attr', e[name] = val); };
  e.s = function(name, val) { return e.h('style.' + name, e.style[name] = val); };
  e.c = function(name) { e.classList.add(name); return e.h('class', name); };
  e.i = function(name) { return e.h('id', e.id = name); };
  e.h('tag', tag);
  hlist(e, tag === this ? 0 : 1, args);
  return e;
}

'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption center cite code col colgroup data datalist dd del dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub sup table tbody td template textarea tfoot th thead time title tr track tt u ul var video wbr'.split(/ /).forEach(function(tag){
  window[tag] = Function('', "return h.call('" + tag + "', arguments)");
});

function unsafehtml(h) {
  var r = span();
  r.innerHTML = h;
  return r;
}

function render(what, where) {
  if (where === undefined) where = 'root';
  if (typeof(where) === 'string') {
    var d = document.getElementById(where);
    if (!d) return setTimeout(function(){ render(what, where); }, 100);
    where = d;
  }
  // clear and replace inside
  where.innerHTML = '';
  where.append(what);
}

