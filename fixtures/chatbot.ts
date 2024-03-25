import chatbotSelectors, {
  FoodType,
  Topping,
  Crust,
  Size,
  FeedbackLabel,
} from "../selectors/chatbotSelectors.js";
import config from "../config/config.js";
import { Page, expect } from "@playwright/test";

export class Chatbot {
  constructor(public page: Page) {}

  /**
   * Initiates a chat session by clicking a button on the page.
   * Uses Playwright's API to locate and interact with the button element.
   * This function does not return a value.
   */
  async startChatBoxSession() {
    await this.page
      .locator(chatbotSelectors.getStartedButton)
      .waitFor({ state: "visible" });

    await this.page.locator(chatbotSelectors.getStartedButton).click();
  }

  /**
   * Enters user details (username and email) into corresponding fields in the chatbot iframe.
   * Utilizes Playwright's API to interact with elements within the iframe.
   * This function does not return a value.
   * @param {string} username - The username to be entered into the username field.
   * @param {string} email - The email to be entered into the email field.
   */
  async enterUserDetails(username: string, email: string) {
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.userNameTextField)
      .waitFor({ state: "visible" });

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.userNameTextField)
      .fill(username);

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.email)
      .waitFor({ state: "visible" });

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.email)
      .fill(email);

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.nextButton)
      .waitFor({ state: "visible" });

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.nextButton)
      .click();
  }

  /**
   * Orders a pizza through the chatbot interface by selecting pizza type, toppings, crust, and size.
   * Utilizes Playwright's API to interact with elements within the chatbot iframe.
   * This function does not return a value.
   * @param {FoodType} type - The type of pizza to order.
   * @param {Topping} topping - The topping to add to the pizza.
   * @param {Crust} crust - The crust type for the pizza.
   * @param {Size} size - The size of the pizza.
   */
  async orderPizza(type: FoodType, topping: Topping, crust: Crust, size: Size) {
    await this.page.waitForTimeout(config.loadTimeOut);
    await this.enterText(
      chatbotSelectors.chatBotTextBox,
      `I want to order a ${type} ${topping} ${crust} crust ${size} size pizza`
    );
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.chatBotTextBox)
      .press("Enter");

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .getByLabel(chatbotSelectors.yesLabel)
      .click();

    expect(
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByText("CONGRATS ! ORDER PLACED .", { exact: true })
        .waitFor({ state: "visible" }),
      "Order Not Placed Successfully"
    );
  }

  /**
   * Orders a pizza through the chatbot interface by selecting pizza type, toppings, crust, and size.
   * Utilizes Playwright's API to interact with elements within the chatbot iframe.
   * This function does not return a value.
   * @param {FoodType} type - The type of pizza to order.
   * @param {Topping} topping - The topping to add to the pizza.
   * @param {Crust} crust - The crust type for the pizza.
   * @param {Size} size - The size of the pizza.
   */
  async orderPizzaWithEachOptions(
    type: FoodType,
    topping: Topping,
    crust: Crust,
    size: Size
  ) {
    await this.page.waitForTimeout(config.loadTimeOut);
    await this.enterText(
      chatbotSelectors.chatBotTextBox,
      chatbotSelectors.orderPizzaText
    );
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.chatBotTextBox)
      .press("Enter");
    await this.selectPizzaType(type);
    await this.selectPizzaToppings(topping);
    await this.selectPizzaCrust(crust);
    await this.selectPizzaSize(size);
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .getByLabel(chatbotSelectors.yesLabel)
      .click();

    expect(
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByText("CONGRATS ! ORDER PLACED .", { exact: true })
        .waitFor({ state: "visible" }),
      "Order Not Placed Successfully"
    );
  }

  /**
   * Submits positive feedback through the chatbot interface.
   * Utilizes Playwright's API to interact with elements within the chatbot iframe.
   * This function returns a promise that resolves after submitting feedback.
   * @param {FeedbackLabel | string} feedbackLabel - The label indicating the type of feedback (Good, Average, Excellent).
   * @returns {Promise<void>} A promise that resolves after submitting feedback.
   */
  async submitPositiveFeedback(
    feedbackLabel: FeedbackLabel | string
  ): Promise<void> {
    await this.clickElement(chatbotSelectors.positiveFeedbackLabel);
    await this.clickElement(chatbotSelectors.selectButton);
    if (feedbackLabel === FeedbackLabel.Good) {
      await this.clickElement(chatbotSelectors.good);
    }
    if (feedbackLabel === FeedbackLabel.Average) {
      await this.clickElement(chatbotSelectors.average);
    }
    if (feedbackLabel === FeedbackLabel.Excellent) {
      await this.clickElement(chatbotSelectors.excellent);
    }
    await this.clickElement(chatbotSelectors.submitButton);

    expect(
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel("Bot sent, Text. CONGRATS !")
        .getByText("Thank You for Your Support")
        .waitFor({ state: "visible" }),
      "Feedback Not Submitted"
    );
  }

  /**
   * Submits negative feedback through the chatbot interface.
   * Utilizes Playwright's API to interact with elements within the chatbot iframe.
   * This function does not return a value.
   * @param {string} suggestion - The suggestion or feedback to improve.
   */
  async submitNegativeFeedback(suggestion: string) {
    await this.clickElement(chatbotSelectors.negativeFeedbackLabel);
    await this.enterText(chatbotSelectors.feedbackToImprove, suggestion);
    await this.clickElement(chatbotSelectors.submitButton);

    expect(
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel("Bot sent, Text. CONGRATS !")
        .getByText("Thank You for Your Valuable Feedback")
        .waitFor({ state: "visible" }),
      "Feedback Not Submitted"
    );
  }

  async validateChatBotUIResponse(textToSend: string, expectedText: string) {
    await this.page.waitForTimeout(config.loadTimeOut);
    await this.enterText(chatbotSelectors.chatBotTextBox, textToSend );
    await this.page
    .frameLocator(chatbotSelectors.chatBotIFrame)
    .locator(chatbotSelectors.chatBotTextBox)
    .press("Enter");

    expect(
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByText(expectedText, { exact: true })
        .isVisible(),
      "Chatbot response didn't match"
    );
  }

  async validateChatBotApiResponse(textToSend: string): Promise<JSON> {
    await this.page.waitForTimeout(config.loadTimeOut);
    await this.enterText(chatbotSelectors.chatBotTextBox, textToSend );
    const [resp] = await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes("/messages.json") && resp.status() === 201
      ),
      this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(chatbotSelectors.chatBotTextBox)
      .press("Enter")
    ]);
    return await resp.json();
  }

  private async selectPizzaType(type: FoodType) {
    if (type === FoodType.Veg) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.vegFoodType, { exact: true })
        .click();
    }
    if (type === FoodType.NonVeg) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.nonVegFoodType, { exact: true })
        .click();
    }
  }

  private async selectPizzaToppings(topping: Topping) {
    if (topping === Topping.Cheese) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.cheeseTopping)
        .check();
    }
    if (topping === Topping.Tomato) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.tomatoTopping)
        .check();
    }
    if (topping === Topping.Bacon) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.baconTopping)
        .check();
    }
    if (topping === Topping.Pepperoni) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.pepperoniTopping)
        .check();
    }
    await this.clickElement(chatbotSelectors.submitButton);
  }

  private async selectPizzaCrust(crust: Crust) {
    if (crust === Crust.Thin) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.thinCrustLabel)
        .nth(1)
        .click();
    }
    if (crust === Crust.Thick) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.thickCrustLabel)
        .nth(1)
        .click();
    }
  }

  private async selectPizzaSize(size: Size) {
    if (size === Size.Small) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.smallSize)
        .click();
    }
    if (size === Size.Medium) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.mediumSize)
        .click();
    }

    if (size === Size.Large) {
      await this.page
        .frameLocator(chatbotSelectors.chatBotIFrame)
        .getByLabel(chatbotSelectors.largeSize)
        .click();
    }
  }

  private async clickElement(locator: string) {
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(locator)
      .waitFor({ state: "visible" });

    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(locator)
      .click();
  }

  private async enterText(locator: string, text: string) {
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(locator)
      .waitFor({ state: "visible" });
    await this.page
      .frameLocator(chatbotSelectors.chatBotIFrame)
      .locator(locator)
      .pressSequentially(text, { delay: 100 });
    await this.page.waitForTimeout(config.loadTimeOut);
  }
}
