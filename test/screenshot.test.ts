import { describe, it, before } from "node:test";
import assert from "node:assert";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { CustomJSClient } from "../src/client.ts";
import { Screenshot } from "../src/screenshot.ts";

// Load environment variables
config();

function writeArtifact(filename: string, content: Buffer) {
  const dir = path.resolve(process.cwd(), "tmp", "test-artifacts", "screenshot");
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, filename), content);
}

describe("Screenshot", () => {
  let client: CustomJSClient;
  let screenshot: Screenshot;

  before(() => {
    const apiKey = process.env.CUSTOMJS_API_KEY;
    if (!apiKey) {
      throw new Error("CUSTOMJS_API_KEY environment variable is required");
    }
    client = new CustomJSClient(apiKey);
    screenshot = new Screenshot(client);
  });

  it("should capture a basic screenshot", async () => {
    const imageBuffer = await screenshot.capture({
      url: "https://example.com"
    });

    assert.ok(imageBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(imageBuffer.length > 0, "Buffer should not be empty");
    
    // Check if it's a PNG file (starts with PNG signature)
    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
    assert.ok(
      imageBuffer.subarray(0, 4).equals(pngSignature),
      "Should be a valid PNG file"
    );

    writeArtifact("basic.png", imageBuffer);
  });

  it("should capture screenshot with custom box", async () => {
    const imageBuffer = await screenshot.capture({
      url: "https://example.com",
      box: { x: 0, y: 0, width: 800, height: 600 }
    });

    assert.ok(imageBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(imageBuffer.length > 0, "Buffer should not be empty");

    writeArtifact("box.png", imageBuffer);
  });

  it("should capture screenshot with wait command", async () => {
    const imageBuffer = await screenshot.capture({
      url: "https://example.com",
      commands: [
        { action: "wait", value: 500 }
      ]
    });

    assert.ok(imageBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(imageBuffer.length > 0, "Buffer should not be empty");

    writeArtifact("wait.png", imageBuffer);
  });

  it("should capture screenshot with scroll command", async () => {
    const imageBuffer = await screenshot.capture({
      url: "https://example.com",
      commands: [
        { action: "scroll", value: 500 },
        { action: "wait", value: 300 }
      ]
    });

    assert.ok(imageBuffer instanceof Buffer, "Should return a Buffer");
    assert.ok(imageBuffer.length > 0, "Buffer should not be empty");

    writeArtifact("scroll.png", imageBuffer);
  });
});
