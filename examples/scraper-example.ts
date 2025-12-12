import { CustomJSClient, Scraper } from "@custom-js/sdk-js";
import { writeFileSync } from "fs";

async function main() {
  // Initialize client with your API key
  const client = new CustomJSClient(process.env.CUSTOMJS_API_KEY || "YOUR_API_KEY");
  const scraper = new Scraper(client);

  // Example 1: Basic HTML scraping
  console.log("Scraping basic HTML...");
  const basicHtml = await scraper.scrape({
    url: "https://example.com"
  });
  writeFileSync("scraped-basic.html", basicHtml);
  console.log("✓ Saved scraped-basic.html");

  // Example 2: Scraping with automation commands
  console.log("\nScraping with automation...");
  const interactiveHtml = await scraper.scrape({
    url: "https://example.com",
    commands: [
      { action: "waitForSelector", selector: "h1" },
      { action: "scroll", value: 500 },
      { action: "wait", value: 1000 }
    ]
  });
  writeFileSync("scraped-interactive.html", interactiveHtml);
  console.log("✓ Saved scraped-interactive.html");

  // Example 3: Scraping dynamic content
  console.log("\nScraping dynamic content...");
  const dynamicHtml = await scraper.scrape({
    url: "https://example.com",
    commands: [
      { action: "click", selector: "button.load-more" },
      { action: "wait", value: 2000 },
      { action: "scroll", value: 1000 }
    ]
  });
  writeFileSync("scraped-dynamic.html", dynamicHtml);
  console.log("✓ Saved scraped-dynamic.html");
}

main().catch(console.error);
