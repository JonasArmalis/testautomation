const { test, expect } = require('@playwright/test');
const {DuckResultsPage} = require('../pages/duckStartPage.js');


const {DuckStartPage} = require('../pages/duckResultsPage');

test.describe('', () => {
    let page;
    test.beforeAll(async({browser}) => {
        page = await browser.newPage();
        startPage = new DuckStartPage(page);
        resultsPage = new DuckResultsPage(page);
    });
    test.beforeEach(async () => {
        await startPage.goto();
    });

test('Check if duckduckGo page opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');
  expect(isLogoVisible).toBe(true);
});

test('Check that results page opens and rerusts are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', 'Test');
    await page.click('#search_button_homepage');
    const textContent = await page.textContent('#r1-0');
    expect(textContent).toContain('Test');
  });

test('Inspector demo', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
        page.click('input:has-text("S")')
    ]);
    const textContent = await page.textContent('#r1-0');
    expect(textContent).toContain('Test');
  });

test('Check that Search "microsoft word cheat sheet" return correct results', async ({ page }) => {
    await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
    await page.click('#search_button_homepage');
    const headerShown = await page.textContent('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    const titleShown = await page.textContent('.c-base__title');
    expect(headerShown).toContain('Cheat Sheet');
    expect(titleShown).toContain('Microsoft Word 2010');
  });


test('Check that Search on “Lithuania” has sidebar that has information summary on Lithuania displayed', async ({ page }) => {
    await page.fill('#search_form_input_homepage', 'Lithuania');
    await page.click('#search_button_homepage');

    const textContent = await page.textContent('.module.module--about.module--zci-wikipedia_fathead.js-module--wikipedia_fathead.js-about-module.has-content-height');
    expect(textContent).toContain('lithuania');
  });

test('Shortened wikipedea link', async ({ page }) => {
    await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.org/');
    await page.click('#search_button_homepage');

    const shortURL = await page.inputValue('#shorten-url');
    await page.goto(shortURL);
    const title = await page.isVisible('#www-wikipedia-org');
    expect(title).toBe(true);
  });

test('panda', async ({page}) => {
    await page.waitForSelector("#search_form_input_homepage");
    await page.fill('#search_form_input_homepage', "intitle:panda");
    await page.click("#search_button_homepage", { force: true });
    await page.waitForNavigation();
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    results.forEach(result => {
      expect(result).toContain("Panda");
    });
  });

const passwordsLengths = ['8', '16', '64'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await resultsPage.getGeneratedPassword();
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

});