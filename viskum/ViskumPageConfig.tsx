import { RouteGroup, RouteRes } from "./RouteGroup/RouteGroup";
import { SharedConfig } from "./SharedConfig";
import { ViskumReq } from "./ViskumReq";
import { ViskumRes } from "./ViskumRes";
import { ViskumRoute } from "./ViskumRoute";

export type RenderingStategy = "single request" | "stream";

export const getRenderingStrategySymbol = Symbol("getRenderingStrategySymbol");

class ViskumPageConfig extends SharedConfig {
  private renderingStrategy: RenderingStategy = "single request";
  private res: ViskumRes;
  private req: ViskumReq;
  private route: ViskumRoute;

  constructor(viskumRes: ViskumRes, viskumReq: ViskumReq, route: ViskumRoute) {
    super();
    this.res = viskumRes;
    this.req = viskumReq;
    this.route = route;

    this[getRenderingStrategySymbol] = () => {
      return this.renderingStrategy;
    };
  }

  public useRouteGroup(routeGroup: RouteGroup) {
    routeGroup.cb(this.req, new RouteRes(routeGroup), routeGroup.config);
    this.route.pushRouteGroup(routeGroup);
  }

  public useRenderingStrategy(strategy: RenderingStategy) {
    this.renderingStrategy = strategy;
  }
}

export { ViskumPageConfig };

/*

Correctly make type PathType to "/" | "/about" without manually creating it. It should be infered by these lines: viskum.newPage("/", (req, res, config) => {
  // page configuration for the root path
});

viskum.newPage("/about", (req, res, config) => {
  // page configuration for the about path
});

Therefore you should NOT create the type PathType = "/" | "/about" manually/statically

*/
