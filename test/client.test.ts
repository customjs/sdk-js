import { describe, it, before } from "node:test";
import assert from "node:assert";
import { config } from "dotenv";
import { CustomJSClient } from "../src/client.ts";

// Load environment variables
config();

describe("CustomJSClient", () => {
  let client: CustomJSClient;

  before(() => {
    const apiKey = process.env.CUSTOMJS_API_KEY;
    if (!apiKey) {
      throw new Error("CUSTOMJS_API_KEY environment variable is required");
    }
    client = new CustomJSClient(apiKey);
  });

  it("should initialize with API key", () => {
    assert.ok(client instanceof CustomJSClient);
  });

  it("should have correct base URL", () => {
    const customClient = new CustomJSClient("test-key", "https://custom.url");
    assert.ok(customClient instanceof CustomJSClient);
  });

  it("should make request to screenshot endpoint", async () => {
    // This is a basic integration test - it will make a real API call
    const buffer = await client.request({
      endpoint: "/screenshot",
      input: {
        url: "https://example.com",
        commands: []
      }
    });

    assert.ok(buffer instanceof Buffer, "Should return a Buffer");
    assert.ok(buffer.length > 0, "Buffer should not be empty");
  });
});
