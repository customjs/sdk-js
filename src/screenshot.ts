import { CustomJSClient } from "./client.js";

export interface ScreenshotBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

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

export type ScreenshotCommand = 
  | ClickCommand 
  | TypeCommand 
  | WaitCommand 
  | WaitForSelectorCommand
  | ScrollCommand 
  | HoverCommand;

export interface ScreenshotOptions {
  url: string;
  commands?: ScreenshotCommand[];
  box?: ScreenshotBox;
}

export class Screenshot {
  constructor(private client: CustomJSClient) {}

  async capture(options: ScreenshotOptions): Promise<Buffer> {
    const { url, commands = [], box } = options;

    const input: { url: string; commands: ScreenshotCommand[]; box?: ScreenshotBox } = {
      url,
      commands
    };

    if (box) {
      input.box = box;
    }

    return this.client.request({
      endpoint: "/screenshot",
      input,
      origin: "sdk/js/screenshot"
    });
  }
}
