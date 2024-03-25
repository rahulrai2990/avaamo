export default {
  getStartedButton: ".get-started-link",
  chatBotIFrame: "iframe[name='avaamoIframe']",
  userNameTextField: ".form-group input#first_name",
  email: ".form-group input#email",
  nextButton: "button[type='submit']",
  chatBotTextBox: "div#combobox-wrapper textarea#queryTextbox",
  orderPizzaText: "I want to order a pizza",
  sendButtonText: "Send",
  submitButton: ".default_card_submit",
  thinCrustLabel: "Thin Crust",
  thickCrustLabel: "Thick Crust",
  vegFoodType: "veg",
  nonVegFoodType: "non-veg",
  cheeseTopping: "Cheese",
  tomatoTopping: "Tomato",
  baconTopping: "bacon",
  pepperoniTopping: "Pepperoni",
  mediumSize: "Medium",
  smallSize: "Small",
  largeSize: "Large",
  yesLabel: "Yes",
  positiveFeedbackLabel: ".thumbs-up",
  negativeFeedbackLabel: ".thumbs-down",
  selectButton: "input[data-ele-name='pick_list_select']",
  feedbackToImprove: "div input[class='textbox avm_accessible_txt_box_helper']",
  good: "li[data-idx='Good']",
  average: "li[data-idx='Average']",
  excellent: "li[data-idx='Excellent']",
};

export enum FoodType {
  Veg = "veg",
  NonVeg = "non-veg",
}

export enum Topping {
  Cheese = "cheese",
  Tomato = "tomato",
  Bacon = "bacon",
  Pepperoni = "Pepperoni",
}

export enum Crust {
  Thin = "thin",
  Thick = "thick",
}

export enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum FeedbackType {
  Positive = "positive",
  Negative = "negative",
}

export enum FeedbackLabel {
  Good = "Good",
  Average = "Average",
  Excellent = "Excellent",
}
