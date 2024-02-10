# React server router

## Creating a simple server

```typescript
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
```
