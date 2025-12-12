import { describe, it, before } from "node:test";
import assert from "node:assert";
import { config } from "dotenv";
import { CustomJSClient } from "../src/client.ts";
import { Markdown2PDF } from "../src/markdown2pdf.ts";

// Load environment variables
config();

// NOTE: Tests are currently skipped because the /markdown2pdf endpoint
// is returning 500 errors. Enable these tests once the endpoint is deployed.
describe.skip("Markdown2PDF", () => {
  let client: CustomJSClient;
  let markdown2pdf: Markdown2PDF;

  before(() => {
    const apiKey = process.env.CUSTOMJS_API_KEY;
    if (!apiKey) {
      throw new Error("CUSTOMJS_API_KEY environment variable is required");
    }
    client = new CustomJSClient(apiKey);
    markdown2pdf = new Markdown2PDF(client);
  });

  it("should convert simple Markdown to PDF", async () => {
    const pdfBuffer = await markdown2pdf.convert({
      markdown: "# Hello World\n\nThis is **bold** text."
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

  it("should convert Markdown with lists to PDF", async () => {
    const markdown = `
# List Example

- Item 1
- Item 2
- Item 3

## Numbered List

1. First
2. Second
3. Third
    `;

    const pdfBuffer = await markdown2pdf.convert({ markdown });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
  });

  it("should convert Markdown with code blocks to PDF", async () => {
    const markdown = `
# Code Example

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`
    `;

    const pdfBuffer = await markdown2pdf.convert({ markdown });

    assert.ok(pdfBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(pdfBuffer.length > 0, "Buffer should not be empty");
  });
});
