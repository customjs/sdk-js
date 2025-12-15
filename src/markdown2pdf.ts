import { CustomJSClient } from "./client.js";

export interface Markdown2PDFOptions {
  markdown: string;
}

export class Markdown2PDF {
  constructor(private client: CustomJSClient) {}

  async convert(options: Markdown2PDFOptions): Promise<Buffer> {
    const { markdown } = options;

    return this.client.request({
      endpoint: "/markdown2pdf",
      input: { markdown },
      origin: "sdk/js/markdown2pdf"
    });
  }
}
