# CustomJS SDK

Official TypeScript/JavaScript SDK for the CustomJS API.

## Installation

```bash
npm install @custom-js/sdk-js
```

## Quick Start

```typescript
import { CustomJSClient, Screenshot, HTML2PDF, Markdown2PDF, Scraper } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
```

Get your API key at [customjs.io](https://customjs.io)

## Features

- 📸 **Screenshot** - Capture screenshots with automation
- 📄 **HTML to PDF** - Convert HTML to PDF with template support
- 📝 **Markdown to PDF** - Convert Markdown to PDF
- 🕷️ **Scraper** - Scrape web pages with automation

## Examples

### Screenshot

```typescript
import { CustomJSClient, Screenshot } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
const screenshot = new Screenshot(client);

const image = await screenshot.capture({
  url: "https://example.com",
  commands: [
    { action: "wait", value: 1000 },
    { action: "scroll", value: 500 }
  ]
});
```

### HTML to PDF

```typescript
import { CustomJSClient, HTML2PDF } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
const html2pdf = new HTML2PDF(client);

const pdf = await html2pdf.convert({
  html: "<h1>Hello {{ name }}</h1>",
  data: { name: "World" }
});
```

### Markdown to PDF

```typescript
import { CustomJSClient, Markdown2PDF } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
const markdown2pdf = new Markdown2PDF(client);

const pdf = await markdown2pdf.convert({
  markdown: "# Hello World\n\nThis is **bold**."
});
```

### Scraper

```typescript
import { CustomJSClient, Scraper } from "@custom-js/sdk-js";

const client = new CustomJSClient("YOUR_API_KEY");
const scraper = new Scraper(client);

const html = await scraper.scrape({
  url: "https://example.com",
  commands: [
    { action: "waitForSelector", selector: "h1" }
  ]
});
```

## Automation Commands

| Command | Parameters | Description |
|---------|-----------|-------------|
| `click` | `selector: string` | Click on an element |
| `type` | `selector: string, value: string` | Type text into input |
| `wait` | `value: number` | Wait for milliseconds |
| `waitForSelector` | `selector: string` | Wait for element |
| `scroll` | `value: number` | Scroll down by pixels |
| `hover` | `selector: string` | Hover over element |

## Documentation

Full documentation: [API Documentation](https://www.customjs.space/integration/native-api/documentation/)

## License

MIT
