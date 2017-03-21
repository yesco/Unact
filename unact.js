// mini react

function hlist(e, start, args) {
  for (let k in args) {
    if (k >= start) {
      var v = args[k];
      if (v === undefined || v === null)
        ;
      else if (v instanceof HTMLElement) {
        e.h('html', (e.append(v), v.hashCode));
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
//  e.h = function(name, val) { e.hashCode += name + '{' + val + '}'; return e; };
  e.h = function(name, val) { return e; };
  e.a = function(name, val) { return e.h('attr', e[name] = val); };
  e.s = function(name, val) { return e.h('style.' + name, e.style[name] = val); };
  e.c = function(name) { e.classList.add(name); return e.h('class', name); };
  e.i = function(name) { return e.h('id', e.id = name); };
  e.h('tag', tag);
  hlist(e, tag === this ? 0 : 1, args);
  return e;
}

function H() {
  for (let k in arguments) {
    document.body.append(arguments[k]);
  }
}

'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption center cite code col colgroup data datalist dd del dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark meta meter nav noscript object ol optgroup option output p param pre progress q rb rp rt rtc ruby s samp script section select small source span strong style sub sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'.split(/ /).forEach(function(tag){
  window[tag] = Function('', "return h.call('" + tag + "', arguments)");
});

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

function Tree(t) {
  if (!Array.isArray(t)) return t === null ? undefined : span(t);
  return table(tbody(
    tr(td(center(t[0])).a('colSpan', 2)),
    tr(td(Tree(t[1])),
       td(Tree(t[2])))
  )).s('border', '1px solid black');
}

var start = Date.now();
var n = 0;
var i = 0;

var d = p('foo').i('foo');
document.body.appendChild(d);

var tree = null;

function insert(t, v) {
  if (t === null) return [v, null, null];
  if (v <= t[0]) return [t[0], insert(t[1], v), t[2]];
  return [t[0], t[1], insert(t[2], v)];
}

function doit(){
 setTimeout(function(){

 var v = Math.round(Math.random()*500);
 tree = insert(tree, v);

 var y =
  span(
    h('h1', 'foobar').c('background', 'green'),
    h2('foobar'),
    span(i),
    center(Tree(tree)));
// none // 20321 ms
//  document.body.innerHTML = y.innerHTML; // 54672 ms
  var nw = span(y).i('foo');
  d.replaceWith(nw);
  d = document.getElementById('foo');
//  d.innerHTML = y.innerHTML;
  i++;
  if (i >= 100) {
    var tm = Date.now() - start;
    console.log('DONE', tm, n);
  } else {
    doit();
  }
 }, 0);
};

doit();

