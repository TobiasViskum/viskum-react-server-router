# React server router

## Creating a simple server

```TSX
// server.tsx
const server = new Viskum();

server.newPage("/", (req, res, config) => {
  res.html(
    <html>
      <head>
        <title>React server router</title>
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
        <title>My App</title>
      </head>
      <body>
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
        <p>Url from layout: {req.url} </p>
        {children}
      </body>
    </html>
  ));
});


const server = new Viskum();

server.newPage("/", (req, res, config) => {
  config.useRouteGroup(routeGroup);

  res.html(
    <div>
      <p>This was rendered inside a layout</p>
    </div>
  );
});

server.listen(3000)
```
