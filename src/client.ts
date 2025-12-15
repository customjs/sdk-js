export interface CustomJSRequestOptions {
  endpoint: string;
  input: Record<string, any>;
  origin?: string;
}

export class CustomJSClient {
  constructor(
    private apiKey: string,
    private baseUrl = "https://e.customjs.io"
  ) {}

  async request(options: CustomJSRequestOptions): Promise<Buffer> {
    const { endpoint, input, origin } = options;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey
    };

    if (origin) {
      headers["customjs-origin"] = origin;
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ input })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} ${errorText}`);
    }

    return Buffer.from(await res.arrayBuffer());
  }
}
