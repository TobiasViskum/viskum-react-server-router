import { Meta } from "./meta/index";

class SharedConfig {
  private metaValue: Meta = {};
  public meta = {
    set: this.setMeta,
    get: this.getMeta,
  };

  constructor() {}

  private setMeta(meta: Meta) {
    this.metaValue = { ...this.metaValue, ...meta };
  }

  private getMeta() {
    return this.metaValue;
  }
}

export { SharedConfig };
