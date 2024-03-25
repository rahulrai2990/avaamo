# AVAAMO

To Automate chatbot present [here](https://c0.avaamo.com/web_channels/cce5f713-c1f4-4666-8976-b091299cda81/demo.html?banner=true&demo=true&banner_text=%20&banner_title=This%20is%20how%20the%20chat%20agent%20shows%20up)

### Test Cases Automated:

1. Place a veg and non-veg pizza order.
2. Submit positive and negative feedback.
3. Validate the respsone chatbot.
4. Validate the network call made when sending request to chatbot.

### Steps to run:

1. Clone the git repo: ```git clone https://github.com/rahulrai2990/avaamo.git```
2. Open terminal and change the current directory path to cloned repo folder location ``avaamo``
3. Install node 16 from [here](https://nodejs.org/en/download)
4. Once node is installed install typescript using command in terminal: ```npm i typescript```
5. Install playwright using command in terminal: ```npm init playwright@latest```
6. Once you are inside ``avaamo`` folder run following command ``npx playwright test``

[Demo](../../../Desktop/avaamo_report.mov)

### Folder Structures:
1. config is present at: ``playwright.config.ts``
Here you can change following configs:
    a. Number of parallel browsers to be launched
    b. Different browsers like chrome, firefox, safari etc.
    c. Retries on failures.
    d. HTML report changes.

2. Tests are present under ``tests/functional`` folder.
3. Locator to find elements are present under ``selectors`` folder.