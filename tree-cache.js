// NOT WORKING! experiments
// demo: binary tree drawing app
// this is a version that experiments with caching

var xxx = 0, yyy = 0;
var hash = {}; cache = {};
var trace = 0;

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

function blinky(i){
  setTimeout(function(){
    var l = [];
    for(let j = 0; j < N; j++) {
      l.push(div(j).s('width', '30px').s('background', j == i ? 'black' : 'white').s('display', 'inline-block'));
    }
    i += z;
    if (i === 0) {
      var tm = Date.now() - start;
      console.log('blinky', tm/2/N);
      start = Date.now();
    }
    if (i >= N || i < 0) { z = -z; i += z; }
    if (0) {
      var nw = span(h1(l)).i('foo');
      d.replaceWith(nw);
      d = document.getElementById('foo');
    } else {
      d.innerHTML = h1(l).innerHTML;
    }
    blinky(i);
  }, 0);
}

var l;
function fast(i){
  setTimeout(function(){
    if (!l) {
      l = [];
      for(let j = 0; j < N; j++) {
        l.push(div(j).i('x' + j)
               .s('width', '30px')
               .s('display', 'inline-block')
               );
      }
      i = 0;
      var nw = span(h1(l)).i('foo');
      d.replaceWith(nw);
    }

    // update
    l[i].s('background', 'white');
    
    i += z;
    if (i === 0) {
      var tm = Date.now() - start;
      console.log('blinky', tm/2/N);
      start = Date.now();
    }
    if (i >= N || i < 0) { z = -z; i += z; }

    // update
    l[i].s('background', 'black');

    fast(i);
  }, 0);
}
