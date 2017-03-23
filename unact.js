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
//        console.log("OPTIMIZE!");
        var vv = v();
//        var vh = !vv || vv.hashCode;
//        var c = cache[vh];
//        if (c) yyy++;
        hlist(e, 0, [vv])
      } else if (v instanceof HTMLElement) {
// subelements don't effect this dom elements rendering!
//        e.h('html', (e.append(v), v.hashCode));
        e.append(v);
      } else if (v instanceof String) {
        e.h('text', (e.append(v), v));
      } else if (Array.isArray(v)) {
        hlist(e, 0, v);
      } else if (v instanceof Object) {
        e.h('text', (e.append(v), v));
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

function diff(a, b) {
  console.log('diff.eq', a === b);
  console.log('diff.hashCode', a.hashCode === b.hashCode);
  console.log('diff.a', a.hashCode);
  console.log('diff.b', b.hashCode);
  console.log('diff.innerHTML', a.innerHTML === b.innerHTML);
  if (a === b) return;
  if (a.hashCode === b.hashCode) return;
  if (a.innerHTML === b.innerHTML) return;
}

// http://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
function toHex(v) {
  var ret = ((v<0?0x8:0)+((v >> 28) & 0x7)).toString(16) + (v & 0xfffffff).toString(16);
  while (ret.length < 8) ret = '0'+ret;
  return ret;
}

function hashCode(o, l) {
  l = l || 2;
  var i, c, r = [];
  for (i=0; i<l; i++)
    r.push(i*268803292);
  function stringify(o) {
    var i,r;
    if (o === null) return 'n';
    if (o === true) return 't';
    if (o === false) return 'f';
    if (o instanceof Date) return 'd:'+(0+o);
    i=typeof o;
    if (i === 'string') return 's:'+o.replace(/([\\\\;])/g,'\\$1');
    if (i === 'number') return 'n:'+o;
    if (o instanceof Function) return 'm:'+o.toString().replace(/([\\\\;])/g,'\\$1');
    if (o instanceof Array) {
      r=[];
      for (i=0; i<o.length; i++) 
        r.push(stringify(o[i]));
      return 'a:'+r.join(';');
    }
    r=[];
    for (i in o) {
      r.push(i+':'+stringify(o[i]))
    }
    return 'o:'+r.join(';');
  }
  o = stringify(o);
  for (i=0; i<o.length; i++) {
    for (c=0; c<r.length; c++) {
      r[c] = (r[c] << 13)-(r[c] >> 19);
      r[c] += o.charCodeAt(i) << (r[c] % 24);
      r[c] = r[c] & r[c];
    }
  }
  for (i=0; i<r.length; i++) {
    r[i] = toHex(r[i]);
  }
  return r.join('');
}

xxx = 0;
yyy = 0;

hash = {}; cache = {};

trace = 0;

function Tree(t, old) {
  if (trace) {
    console.log("TREE.trace", t);
  }
  xxx++;
  
//  console.log(xxx);
//  var hh = hashCode(!t || t[0]);
  var hh = hashCode(!t || t[0]);
  hash[hh] = (hash[hh] || 0)+1;

  var c = cache[hh];
  //if (c) return c;

//  console.log(t);
  if (!Array.isArray(t)) return t === null ? undefined : span(t);
  var r = table(tbody(
    tr(td(center(t[0])).a('colSpan', 2)),
    tr(td(function(){return Tree(t[1]);}),
       td(function(){return Tree(t[2]);}))))
  .s('border', '1px solid black')
  .i(hh);

//  var hh = r.hashCode;
  cache[hh] = r;
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
