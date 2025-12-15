import { CustomJSClient } from "./client.js";

export interface ClickCommand {
  action: "click";
  selector: string;
}

export interface TypeCommand {
  action: "type";
  selector: string;
  value: string;
}

export interface WaitCommand {
  action: "wait";
  value: number;
}

export interface WaitForSelectorCommand {
  action: "waitForSelector";
  selector: string;
}

export interface ScrollCommand {
  action: "scroll";
  value: number;
}

export interface HoverCommand {
  action: "hover";
  selector: string;
}

export type ScraperCommand = 
  | ClickCommand 
  | TypeCommand 
  | WaitCommand 
  | WaitForSelectorCommand
  | ScrollCommand 
  | HoverCommand;

export interface ScraperOptions {
  url: string;
  commands?: ScraperCommand[];
}

export class Scraper {
  constructor(private client: CustomJSClient) {}

  async scrape(options: ScraperOptions): Promise<string> {
    const { url, commands = [] } = options;

    const buffer = await this.client.request({
      endpoint: "/scraper",
      input: { url, commands },
      origin: "sdk/js/scraper"
    });

    return buffer.toString("utf-8");
  }
}
