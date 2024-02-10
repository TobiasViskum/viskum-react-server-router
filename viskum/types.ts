import { ViskumLayout } from "./ViskumLayout";
import { RenderingStategy } from "./ViskumPageConfig";

export type PageConfig = {
  layouts: ViskumLayout[];
  renderingStrategy: RenderingStategy;
};
