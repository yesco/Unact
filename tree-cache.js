// NOT WORKING! experiments
// demo: binary tree drawing app
// this is a version that experiments with caching

var xxx = 0, yyy = 0;
var hash = {}; cache = {};
var trace = 0;

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
 var old = tree;
 tree = insert(tree, v);

// console.log('-------------');
 var y =
  span(
    h('h1', 'foobar').c('background', 'green'),
    h2('foobar'),
    span(i),
    center(Tree(tree, old)));
// none // 20321 ms
//  document.body.innerHTML = y.innerHTML; // 54672 ms
//  var nw = span(y).i('foo');
//  d.replaceWith(nw);
//  d = document.getElementById('foo');
  d.innerHTML = y.innerHTML;
  i++;
  if (i >= 100) {
    var tm = Date.now() - start;
    console.log('DONE', tm, n, xxx, yyy);
    d.style.background = 'pink';
    N = 100;
    z = +1;
    switch (0) {
    case 0: break;
    case 1: blinky(0); break;
    case 2: fast(0); break;
    }
  } else {
    doit();
  }
 }, 0);
};
doit();
