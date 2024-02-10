import React from "react";
import { HttpResponse } from "uWebSockets.js";
import { ViskumPage } from "./ViskumPage";

class ViskumRes {
  private res: HttpResponse;
  private page: ViskumPage;

  constructor(res: HttpResponse, page: ViskumPage) {
    this.page = page;
    this.res = res;
  }

  public redirect(path: string) {
    this.res.cork(() => {
      this.res.writeStatus("302 Found").writeHeader("Location", path);
    });

    return;
  }

  public html(html: React.JSX.Element) {
    this.page.setHtml(html);
  }
}

export { ViskumRes };
