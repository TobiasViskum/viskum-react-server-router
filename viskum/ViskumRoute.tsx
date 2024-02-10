import React from "react";
import { ViskumPage } from "./ViskumPage";
import { renderToString as reactRenderToString } from "react-dom/server";
import { RouteGroup } from "./RouteGroup/RouteGroup";
import { DefaultErrorPage } from "./Defaults/DefaultErrorPage";
import { ViskumPageConfig } from "./ViskumPageConfig";
import { applyMetaTags } from "./meta/index";

type Layout = ({ children }: { children: React.ReactNode }) => React.JSX.Element;

class ViskumRoute {
  private routeGroups: RouteGroup[] = [];
  private page: ViskumPage;
  private viskumPageConfig: ViskumPageConfig;

  constructor() {}

  public setup(page: ViskumPage, viskumPageConfig: ViskumPageConfig) {
    this.page = page;
    this.viskumPageConfig = viskumPageConfig;
  }

  public pushRouteGroup(routeGroup: RouteGroup) {
    this.routeGroups.push(routeGroup);
  }

  public renderToString(type: "page" | "error" = "page", e?: any) {
    if (type === "page") {
      const pageHtml = transformHtml(this.page.getHtml(), "data-viskum-page", "true");

      const routesGroups = this.routeGroups;
      let html: Layout;

      for (let i = routesGroups.length - 1; i >= 0; i--) {
        const Layout = routesGroups[i].layout;
        if (!Layout) continue;
        if (i === routesGroups.length - 1) {
          // @ts-ignore
          html = React.cloneElement(Layout({ children: pageHtml }), {
            "data-viskum-layout-id": i.toString(),
          });
        } else {
          // @ts-ignore
          html = React.cloneElement(Layout({ children: html }), {
            "data-viskum-layout-id": i.toString(),
          });
        }
      }

      // @ts-ignore
      let htmlStr = reactRenderToString(html);

      this.routeGroups.map((routeGroup) => {
        const layoutMeta = routeGroup.config.meta.get();
        htmlStr = applyMetaTags(htmlStr, layoutMeta);
      });

      const pageMeta = this.viskumPageConfig.meta.get();
      htmlStr = applyMetaTags(htmlStr, pageMeta);

      return htmlStr;
    } else if (type === "error") {
      for (let i = this.routeGroups.length - 1; i >= 0; i--) {
        const Error = this.routeGroups[i].error;

        if (!Error) continue;

        return reactRenderToString(<Error e={e} />);
      }

      return reactRenderToString(<DefaultErrorPage e={e} />);
    }
  }
}

export { ViskumRoute };

function transformHtml<T extends React.ReactNode | Layout>(
  html: T,
  attributeName: string,
  attributeValue: string
): T {
  if (React.isValidElement(html)) {
    // @ts-ignore
    return React.cloneElement(html, { [attributeName]: attributeValue });
  }

  throw new Error("Invalid html");
}
