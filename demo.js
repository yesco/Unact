// demo: binary tree drawing app

/// tree drawin basics
function Tree(t, old) {
  if (!Array.isArray(t)) return t === null ? undefined : span(t);
  return table(tbody(
    tr(td(center(t[0])).a('colSpan', 2)),
    tr(td(function(){return Tree(t[1]);}),
       td(function(){return Tree(t[2]);}))))
    .s('border', '1px solid black').s('zoom', '8%');
}

function insert(t, v) {
  if (t === null) return [v, null, null];
  if (v <= t[0]) return [t[0], insert(t[1], v), t[2]];
  return [t[0], t[1], insert(t[2], v)];
}

function dotree(n, tree) {
  setTimeout(function(){

    var v = Math.round(Math.random()*500);
    var old = tree;
    tree = insert(tree, v);

    var y =
        span(
          h('h1', 'Tree Demo'),
          span(n),
          center(Tree(tree, old)));

    render(y, 'tree');

    if (n-- > 0) dotree(n, tree);
  }, 0);
}

function bouncy(n, pos, w, z){
  setTimeout(function(){
    var l = [];
    for(let j = 0; j < w; j++) {
      l.push(div(j).s('width', '30px').s('background', j == pos ? 'black' : 'white').s('display', 'inline-block'));
    }
    pos += z;
    if (pos >= w || pos < 0) { z = -z; pos += z; }
    render(span(h1("bouncy"), div(n), div(l)), 'bouncy');

    if (n-- > 0) bouncy(n, pos, w, z);
  }, 0);
}

function bouncy_handopt(n, pos, w, z) {
  setTimeout(function(){
    // first time
    if (!bouncy_handopt.l) {
      bouncy_handopt.l = [];
      for(let j = 0; j < w; j++) {
        bouncy_handopt.l.push(div(j).i('x' + j)
                              .s('width', '30px')
                              .s('display', 'inline-block')
                             );
      }
      i = 0;
      bouncy_handopt.num = div(n).i('num');
      render(span(h1('bouncy_handopt'),
                  "only fast when run alone",
                  bouncy_handopt.num,
                  div(bouncy_handopt.l)), 'handopt');
    }

    // update
    bouncy_handopt.num.innerText = n;
    bouncy_handopt.l[i].s('background', 'white');

    i += z;
    if (i >= w || i < 0) { z = -z; i += z; }

    bouncy_handopt.l[i].s('background', 'black');

    if (n-- > 0) {
      bouncy_handopt(n, pos, w, z);
    } else {
      bouncy_handopt.l = undefined;
    }
  }, 0);
}
