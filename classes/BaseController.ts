import jsdom from 'jsdom'

class BaseController {
  protected getJSDOM(html: string) {
    const virtualConsole = new jsdom.VirtualConsole();
    const { JSDOM } = jsdom
    virtualConsole.on("error", () => {});
    return new JSDOM(html, { virtualConsole });
  }
}

export default BaseController