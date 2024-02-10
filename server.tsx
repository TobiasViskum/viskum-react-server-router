import React from "react";
import { Viskum, RouteGroup } from "./viskum";

// const myPlugin = new ViskumPlugin({
//   name: "My Plugin",
//   onBeforeServerStart: (server) => {},
//   onBeforeRequest: (req, res) => {},
//   onAfterRequest: (req, res) => {},
// });

// server.notFound((req, res) => {
//   res.html(<div>Not Found</div>);
// })

// res.loading(() => <div>Loading...</div>);

// res.error(() => <div>Error</div>);

// res.template(({ children }) => (
//   <div>
//     <p>Template</p>
//     {children}
//   </div>
// ));

const server = new Viskum();

const routeGroup = new RouteGroup((req, res, config) => {
  config.meta.set({
    title: "My App - Home",
    description: "Home page",
    charset: "UTF-8",
    themeColor: "red",
  });

  res.error(({ e }) => (
    <html>
      <head>
        <title>My App - Error</title>
      </head>
      <body>
        <p>Error: {e.message}</p>
        <div>Hello error :=:</div>
      </body>
    </html>
  ));

  res.layout(({ children }) => (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <div style={{ display: "flex", "columnGap": "8px" }}>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
        <p>Url from layout: {req.url} </p>
        {children}
      </body>
    </html>
  ));
});

server.use((req, res, next) => {});

server.newPage("/", (req, res, config) => {
  res.redirect("/about");

  config.useRouteGroup(routeGroup);
  config.useRenderingStrategy("single request");

  const url = req.url;

  res.html(
    <div>
      <p>Home</p>
      <p>Url: {url}</p>
    </div>
  );
});

server.newPage("/about", (req, res, config) => {
  config.useRouteGroup(routeGroup);
  const url = req.url;

  config.meta.set({
    title: "My App - About",
    description: "About page",
  });

  res.html(
    <div>
      <p>About</p>
      <p>Url: {url}</p>
    </div>
  );
});

server.listen(3000, (listenSocket) => {
  if (listenSocket) {
    console.log("Listening on port 3000");
  } else {
    console.log("Failed to listen on port 3000");
  }
});

// routeGroup.newPage("/", (req, res) => {})

// server.useRouteGroup(routeGroup);

// const anotherLayout = new Layout((req, res, children) => {
//   res.html(
//     <div>
//       <p>Another layout</p>
//       {children}
//     </div>
//   );
// });

// const routeGroup = server.createRouteGroup([layout, anotherLayout]);

// routeGroup.newPage("/", (req, res) => {
//   res.html(<div>Home</div>);
// })

// server.middleware((req, res, next) => {})
