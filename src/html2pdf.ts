import { CustomJSClient } from "./client.js";

export interface HTML2PDFConfig {
  pdfWidthMm?: number;
  pdfHeightMm?: number;
}

export interface HTML2PDFOptions {
  html: string;
  data?: Record<string, any>;
  config?: HTML2PDFConfig;
}

export class HTML2PDF {
  constructor(private client: CustomJSClient) {}

  async convert(options: HTML2PDFOptions): Promise<Buffer> {
    const { html, data, config } = options;

    const input: {
      html: string;
      data?: Record<string, any>;
      config?: HTML2PDFConfig;
    } = { html };
    
    if (data) {
      input.data = data;
    }

    if (config) {
      input.config = config;
    }

    return this.client.request({
      endpoint: "/html2pdf",
      input,
      origin: "sdk/js/html2pdf"
    });
  }
}
