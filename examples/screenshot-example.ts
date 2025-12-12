import { CustomJSClient, Screenshot } from "@custom-js/sdk-js";
import { writeFileSync } from "fs";

async function main() {
  // Initialize client with your API key
  const client = new CustomJSClient(process.env.CUSTOMJS_API_KEY || "YOUR_API_KEY");
  const screenshot = new Screenshot(client);

  // Example 1: Basic screenshot
  console.log("Taking basic screenshot...");
  const basicImage = await screenshot.capture({
    url: "https://example.com"
  });
  writeFileSync("basic-screenshot.png", basicImage);
  console.log("✓ Saved basic-screenshot.png");

  // Example 2: Interactive screenshot with commands
  console.log("\nTaking interactive screenshot...");
  const interactiveImage = await screenshot.capture({
    url: "https://scrapx.io",
    commands: [
      { action: "click", selector: "[754,759]" },
      { action: "type", selector: "#input", value: "hello" },
      { action: "wait", value: 1000 }
    ],
    box: { x: 185, y: 185, width: 824, height: 471 }
  });
  writeFileSync("interactive-screenshot.png", interactiveImage);
  console.log("✓ Saved interactive-screenshot.png");

  // Example 3: Screenshot with scroll
  console.log("\nTaking screenshot after scroll...");
  const scrolledImage = await screenshot.capture({
    url: "https://example.com",
    commands: [
      { action: "scroll", value: 500 },
      { action: "wait", value: 500 }
    ]
  });
  writeFileSync("scrolled-screenshot.png", scrolledImage);
  console.log("✓ Saved scrolled-screenshot.png");
}

main().catch(console.error);
