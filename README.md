# Unact

A non-react, react style tiny un-optimized function drawing non-framework.

## Why?

Yeah, why?

Portable non-install, passive react, functional rendering.

It seems to turn out that react is mostly only optimizable for really big stuff,
and when states are kept in components (not very functional!).

`x.innerHTML = y.innerHTML` is almost as fast as just inserting the nodes
and for small enough sizes more or less equivalent to react in speed.

For complete rendering without using caching components a lot of time is
spent in building the structures.

## Generate HTMLElements

```
var items = [1,2,3,4,5,6,7,8].map(li);
var view = span(h1('foo').i('title'),
     h2('bar').s('background', 'yellow'),
     ul(items));

render(view);
```

## Functions

Tags are global functions `h1` ... `tt` `pre` generate the tag with same name.
All tag functions take a list of arguments. An argument can be:
- a string which will be html quoted
- an HTMLElement as generated
- a list/enumerable (like arguments)
- undefined/null are ignored
- an object - whatever HTMLElement.append() does
- a closure function with no arguments - evaluated a is (experimential)

A tag can be manipulated by setting

- attributes: `span("click me").a('onclick', myclickhandler)`
- class `span("trout").c('fish')`
- style: `h1("homepage").s('background', 'pink')`
- id: `span(0).i('counter')`

`unsafehtml("&nbsp;")` inserts raw html.

## rendering

`render(HTMLElement)` as created with functions above.

`render(HTMLElement, 'root')` the id of the element to change, will retry every 100ms if element is not yet created.

`render(HTMLElement, destination_HTMLElement)` will replace all children of destination.
