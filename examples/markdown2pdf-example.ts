import { CustomJSClient, Markdown2PDF } from "@custom-js/sdk-js";
import { writeFileSync } from "fs";

async function main() {
  // Initialize client with your API key
  const client = new CustomJSClient(process.env.CUSTOMJS_API_KEY || "YOUR_API_KEY");
  const markdown2pdf = new Markdown2PDF(client);

  // Example: Convert Markdown to PDF
  console.log("Converting Markdown to PDF...");
  
  const markdown = `
# CustomJS Markdown to PDF Example

This PDF was generated from **Markdown** using the CustomJS SDK.

## Features

- Easy to use
- Supports all standard Markdown syntax
- Code blocks with syntax highlighting

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

## Lists

1. First item
2. Second item
3. Third item

---

*Generated with CustomJS*
  `;

  const pdfBuffer = await markdown2pdf.convert({ markdown });

  writeFileSync("markdown-output.pdf", pdfBuffer);
  console.log("✓ Saved markdown-output.pdf");
}

main().catch(console.error);
