import { ReactNode } from "react";
import { ViskumReq } from "../ViskumReq";
import { RouteGroupConfig } from "./RouteGroupConfig";

class RouteRes {
  private routeGroup: RouteGroup;

  constructor(routeGroup: RouteGroup) {
    this.routeGroup = routeGroup;
  }

  public layout(cb: ({ children }: { children: ReactNode }) => React.JSX.Element) {
    this.routeGroup.setLayout(cb);
  }

  public error(cb: ({ e }: { e: any }) => React.JSX.Element) {
    this.routeGroup.error = cb;
  }
}

class RouteGroup {
  public layout: (({ children }: { children: ReactNode }) => React.JSX.Element) | undefined;
  public template: (({ children }: { children: ReactNode }) => React.JSX.Element) | undefined;
  public loading: (() => React.JSX.Element) | undefined;
  public error: (({ e }: { e: any }) => React.JSX.Element) | undefined;
  public cb: (req: ViskumReq, res: RouteRes, config: RouteGroupConfig) => void;
  public config: RouteGroupConfig;

  constructor(cb: (req: ViskumReq, res: RouteRes, config: RouteGroupConfig) => void) {
    this.cb = cb;
    this.config = new RouteGroupConfig();
  }

  public setLayout(cb: ({ children }: { children: ReactNode }) => React.JSX.Element) {
    this.layout = cb;
  }

  public setError(cb: ({ e }: { e: any }) => React.JSX.Element) {
    this.error = cb;
  }
}

export { RouteGroup, RouteRes };
