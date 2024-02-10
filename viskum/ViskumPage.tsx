import { ReactNode } from "react";

class ViskumPage {
  private html: ReactNode;

  constructor() {}

  public setHtml(html: ReactNode) {
    this.html = html;
  }

  public getHtml() {
    return this.html;
  }
}

export { ViskumPage };
