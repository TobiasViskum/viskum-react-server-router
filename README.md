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
