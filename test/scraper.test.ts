import { describe, it, before } from "node:test";
import assert from "node:assert";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { CustomJSClient } from "../src/client.ts";
import { Scraper } from "../src/scraper.ts";

// Load environment variables
config();

function writeArtifact(filename: string, content: string) {
  const dir = path.resolve(process.cwd(), "tmp", "test-artifacts", "scraper");
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, filename), content, "utf8");
}

describe("Scraper", () => {
  let client: CustomJSClient;
  let scraper: Scraper;

  before(() => {
    const apiKey = process.env.CUSTOMJS_API_KEY;
    if (!apiKey) {
      throw new Error("CUSTOMJS_API_KEY environment variable is required");
    }
    client = new CustomJSClient(apiKey);
    scraper = new Scraper(client);
  });

  it("should scrape basic HTML", async () => {
    const html = await scraper.scrape({
      url: "https://example.com"
    });

    assert.ok(typeof html === "string", "Should return a string");
    assert.ok(html.length > 0, "HTML should not be empty");
    assert.ok(html.includes("<html"), "Should contain HTML tags");

    writeArtifact("basic.html", html);
  });

  it("should scrape with wait command", async () => {
    const html = await scraper.scrape({
      url: "https://example.com",
      commands: [
        { action: "wait", value: 500 }
      ]
    });

    assert.ok(typeof html === "string", "Should return a string");
    assert.ok(html.length > 0, "HTML should not be empty");

    writeArtifact("wait.html", html);
  });

  it("should scrape with scroll command", async () => {
    const html = await scraper.scrape({
      url: "https://example.com",
      commands: [
        { action: "scroll", value: 500 },
        { action: "wait", value: 300 }
      ]
    });

    assert.ok(typeof html === "string", "Should return a string");
    assert.ok(html.length > 0, "HTML should not be empty");

    writeArtifact("scroll.html", html);
  });
});
