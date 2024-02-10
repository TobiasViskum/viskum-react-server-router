import { ReactNode } from "react";
import { ViskumReq } from "./ViskumReq";
import { ViskumRes } from "./ViskumRes";

type LayoutHtml = ({ children }: { children: ReactNode }) => React.JSX.Element;
type Cb = (req: ViskumReq, res: ViskumRes, children) => void;

class ViskumLayout {
  private htmlComponent: LayoutHtml;

  constructor(htmlComponent: LayoutHtml) {
    this.htmlComponent = htmlComponent;
  }

  public getHtmlComponent(): LayoutHtml {
    return this.htmlComponent;
  }
}

export { ViskumLayout };
