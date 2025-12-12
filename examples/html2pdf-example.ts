import { CustomJSClient, HTML2PDF } from "@custom-js/sdk-js";
import { writeFileSync } from "fs";

async function main() {
  // Initialize client with your API key
  const client = new CustomJSClient(process.env.CUSTOMJS_API_KEY || "YOUR_API_KEY");
  const html2pdf = new HTML2PDF(client);

  // Example: Convert HTML to PDF
  console.log("Converting HTML to PDF...");
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #333; }
          p { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>CustomJS PDF Example</h1>
        <p>This PDF was generated using the CustomJS SDK.</p>
        <p>You can include any HTML content, including:</p>
        <ul>
          <li>Lists</li>
          <li>Tables</li>
          <li>Images</li>
          <li>Custom CSS styles</li>
        </ul>
      </body>
    </html>
  `;

  const pdfBuffer = await html2pdf.convert({ html });

  writeFileSync("output.pdf", pdfBuffer);
  console.log("✓ Saved output.pdf");

  // Example 2: HTML with template data
  console.log("\nConverting HTML with template data to PDF...");
  
  const templateHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Hello {{ name }}!</h1>
        <p>Your order total is: ${{ total }}</p>
      </body>
    </html>
  `;

  const templatePdfBuffer = await html2pdf.convert({
    html: templateHtml,
    data: {
      name: "John Doe",
      total: 99.99
    }
  });

  writeFileSync("template-output.pdf", templatePdfBuffer);
  console.log("✓ Saved template-output.pdf");
}

main().catch(console.error);
