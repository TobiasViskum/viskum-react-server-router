import { HttpRequest } from "uWebSockets.js";

interface IViskumReq {
  url: string;
  rawSearch: string;
}

class ViskumReq implements IViskumReq {
  public url: string;
  public rawSearch: string;

  constructor(req: HttpRequest) {
    this.url = req.getUrl();
    this.rawSearch = req.getQuery();
  }
}

export { ViskumReq };
