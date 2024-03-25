import homepageSelectors from "../selectors/homepageSelectors.js";
import config from "../config/config.js";
import { Page } from "@playwright/test";

export class Homepage {
  constructor(public page: Page) {}
  async launchHomepage() {
    await this.page.goto(config.appUrl);
    await this.page.waitForSelector(homepageSelectors.mcPizzaChatBot, {
      timeout: config.locatorTimeOut,
    });
  }

  async openMcPizzaChatBot() {
    await this.page
      .getByAltText(homepageSelectors.mcPizzaChatBotButton)
      .click();
    await this.page.waitForSelector(homepageSelectors.getStartedButton, {
      timeout: config.locatorTimeOut,
    });
  }
}
