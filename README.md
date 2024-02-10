# React server router

## Creating a simple server

```TSX
// server.tsx
const server = new Viskum();

server.newPage("/", (req, res, config) => {
  res.html(
    <html>
      <head>
        <title>React Server Router</title>
      </head>
      <body>
        <div>Hello from react server router</div>
      </body>
    </html>
  );
});

server.listen(3000, (listenSocket) => {
  if (listenSocket) {
    console.log("Listening on port 3000");
  } else {
    console.log("Failed to listen on port 3000");
  }
});
```

## Layouts, loading pages, error pages etc.

```TSX
const mainRouteGroup = new RouteGroup((req, res, config) => {
  res.layout(({ children }) => (
    <html>
      <head>
       <title>React Server Router</title>
      </head>
      <body>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
        <main>{children}</main>
      </body>
    </html>
  ));
});


const server = new Viskum();

mainRouteGroup.newPage("/", (req, res, config) => {


  res.html(
    <div>
      <p>This was rendered inside a layout</p>
    </div>
  );
});

server.listen(3000)
```

However if you want to apply a route group to a single page, this can also be done:

```TSX
server.newPage("/", (req, res, config) => {
  /* This has to be before res.html */
  config.useRouteGroup(mainRouteGroup);
  /* Multiple route groups can be used and layouts will be nested in the same order route groups are used */

  res.html(
    <div>
      <p>This was rendered inside a layout</p>
    </div>
  );
});
```
