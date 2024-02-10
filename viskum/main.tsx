import { App, TemplatedApp, us_listen_socket } from "uWebSockets.js";
import { ViskumRoute } from "./ViskumRoute";
import { ViskumReq } from "./ViskumReq";
import { ViskumRes } from "./ViskumRes";
import { RenderingStategy, ViskumPageConfig, getRenderingStrategySymbol } from "./ViskumPageConfig";
import { ViskumPage } from "./ViskumPage";

type ListenSocket = false | us_listen_socket;

class Viskum {
  private app: TemplatedApp;

  constructor() {
    this.app = App();
  }

  newPage<Path extends string>(
    path: Path,
    cb: (req: ViskumReq, res: ViskumRes, config: ViskumPageConfig) => void
  ) {
    this.app.get(path, (res, req) => {
      let route = new ViskumRoute();

      try {
        res.onAborted(() => {
          console.log("Aborted");
        });

        let page = new ViskumPage();

        const viskumReq = new ViskumReq(req);
        const viskumRes = new ViskumRes(res, page);
        const viskumPageConfig = new ViskumPageConfig(viskumRes, viskumReq, route);

        // This executes the logic
        cb(viskumReq, viskumRes, viskumPageConfig);

        const renderingStrategy: RenderingStategy = viskumPageConfig[getRenderingStrategySymbol]();

        route.setup(page, viskumPageConfig);

        if (renderingStrategy === "single request") {
          const htmlStr = route.renderToString();

          res.cork(() => {
            res.writeHeader("Content-Type", "text/html").end(htmlStr);
          });
        } else {
          res.end(`Rendering strategy not supported: ${renderingStrategy}`);
        }
      } catch (e) {
        const htmlStr = route.renderToString("error", e);
        res.end(htmlStr);
      }
    });
    return path;
  }

  listen(port: number, cb: (listenSocket: ListenSocket) => void) {
    this.app.listen(port, cb);
  }
}

export { Viskum };
