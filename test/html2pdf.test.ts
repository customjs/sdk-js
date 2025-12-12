import { describe, it, before } from "node:test";
import assert from "node:assert";
import { config } from "dotenv";
import { CustomJSClient } from "../src/client.ts";
import { HTML2PDF } from "../src/html2pdf.ts";

// Load environment variables
config();

describe("HTML2PDF", () => {
  let client: CustomJSClient;
  let html2pdf: HTML2PDF;

  before(() => {
    const apiKey = process.env.CUSTOMJS_API_KEY;
    if (!apiKey) {
      throw new Error("CUSTOMJS_API_KEY environment variable is required");
    }
    client = new CustomJSClient(apiKey);
    html2pdf = new HTML2PDF(client);
  });

  it("should convert simple HTML to PDF", async () => {
    const pdfBuffer = await html2pdf.convert({
      html: "<h1>Test PDF</h1><p>This is a test.</p>"
    });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
    
    // Check if it's a PDF file (starts with %PDF)
    const pdfSignature = Buffer.from("%PDF");
    assert.ok(
      pdfBuffer.subarray(0, 4).equals(pdfSignature),
      "Should be a valid PDF file"
    );
  });

  it("should convert HTML with CSS to PDF", async () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Styled PDF</h1>
          <p>This PDF has custom CSS styling.</p>
        </body>
      </html>
    `;

    const pdfBuffer = await html2pdf.convert({ html });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
  });

  it("should convert HTML with template data to PDF", async () => {
    const html = "<h1>Hello {{ name }}</h1><p>Total: {{ total }}</p>";

    const pdfBuffer = await html2pdf.convert({
      html,
      data: {
        name: "John",
        total: 100
      }
    });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
  });

  it("should convert HTML with lists to PDF", async () => {
    const html = `
      <h1>List Example</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `;

    const pdfBuffer = await html2pdf.convert({
      html
    });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
  });
});
