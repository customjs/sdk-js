import { CustomJSClient } from "./client.js";

export interface HTML2PDFOptions {
  html: string;
  data?: Record<string, any>;
}

export class HTML2PDF {
  constructor(private client: CustomJSClient) {}

  async convert(options: HTML2PDFOptions): Promise<Buffer> {
    const { html, data } = options;

    const input: { html: string; data?: Record<string, any> } = { html };
    
    if (data) {
      input.data = data;
    }

    return this.client.request({
      endpoint: "/html2pdf",
      input
    });
  }
}
