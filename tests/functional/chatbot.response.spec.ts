import { expect, test } from "@playwright/test";
import { Homepage } from "../../fixtures/homepage.js";
import { Chatbot } from "../../fixtures/chatbot.js";

test.describe.parallel("chatbot", () => {
  test("valid request", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    await chatbot.validateChatBotUIResponse(
      "hello",
      "Hi there, what can I help you with today?"
    );
  });

  test("Invalid request", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    await chatbot.enterUserDetails("tom", "test6655@gmail.com");

    await chatbot.validateChatBotUIResponse(
      "hefdfdfllo",
      "I am sorry. I don't have an answer for that."
    );
  });

  test("Validate chatbot network response", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.launchHomepage();
    await homepage.openMcPizzaChatBot();

    const chatbot = new Chatbot(page);
    await chatbot.startChatBoxSession();
    const userFirstName = "tom";
    const userEmailID = "test6655@gmail.com";
    await chatbot.enterUserDetails(userFirstName, userEmailID);

    const message = "hefdfdfllo";
    const response = await chatbot.validateChatBotApiResponse(message);
    expect(
      response.message.content,
      "Message Content does not matched"
    ).toEqual(message);
    expect(
      response.message.user.first_name,
      "User first name does not matched"
    ).toEqual(userFirstName);
  });
});
