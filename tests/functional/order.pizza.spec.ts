import { test } from "@playwright/test";
import {
  FoodType,
  Topping,
  Crust,
  Size,
  FeedbackLabel,
} from "../../selectors/chatbotSelectors.js";
import { Homepage } from "../../fixtures/homepage.js";
import { Chatbot } from "../../fixtures/chatbot.js";

test.describe.parallel("Veg-Pizza", () => {
  test("cheese-thick-small", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    const pizzaType: FoodType = FoodType.Veg;
    const pizzaTopping: Topping = Topping.Cheese;
    const pizzaCrust: Crust = Crust.Thick;
    const pizzaSize: Size = Size.Small;

    await chatbot.orderPizza(pizzaType, pizzaTopping, pizzaCrust, pizzaSize);
  });
});

test.describe.parallel("Non-Veg", () => {
  test("pepperoni-large-thick", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    const pizzaType: FoodType = FoodType.NonVeg;
    const pizzaTopping: Topping = Topping.Pepperoni;
    const pizzaCrust: Crust = Crust.Thick;
    const pizzaSize: Size = Size.Large;

    await chatbot.orderPizzaWithEachOptions(
      pizzaType,
      pizzaTopping,
      pizzaCrust,
      pizzaSize
    );
  });
});

test.describe.parallel("Submit Feedback", () => {
  test("positive with good", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    const pizzaType: FoodType = FoodType.NonVeg;
    const pizzaTopping: Topping = Topping.Bacon;
    const pizzaCrust: Crust = Crust.Thick;
    const pizzaSize: Size = Size.Large;

    await chatbot.orderPizza(pizzaType, pizzaTopping, pizzaCrust, pizzaSize);
    await chatbot.submitPositiveFeedback(FeedbackLabel.Good);
  });

  test("negative with suggestion", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    const pizzaType: FoodType = FoodType.NonVeg;
    const pizzaTopping: Topping = Topping.Bacon;
    const pizzaCrust: Crust = Crust.Thick;
    const pizzaSize: Size = Size.Large;

    await chatbot.orderPizza(pizzaType, pizzaTopping, pizzaCrust, pizzaSize);
    await chatbot.submitNegativeFeedback("Bad Taste");
  });
});
