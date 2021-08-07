const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage');
const { DuckResultsPage } = require('../pages/duckResultsPage');

test.describe('Duck duck test suite', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckStartPage(page);
    resultsPage = new DuckResultsPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });

  test('Check if duckduckGo page opened', async () => {
    const isLogoVisible = await page.isVisible('#logo_homepage_link');
    expect(isLogoVisible).toBe(true);
  });

  test('Check that results page opens and rerusts are correct', async () => {
    await startPage.initiateSearch('Test');
    const textContent = await page.textContent('#r1-0');
    expect(textContent).toContain('Test');
  });

  test('Check that Search "microsoft word cheat sheet" return correct results', async () => {
    await startPage.initiateSearch('microsoft word cheat sheet');
    const headerShown = await page.textContent('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    const titleShown = await page.textContent('.c-base__title');
    expect(headerShown).toContain('Cheat Sheet');
    expect(titleShown).toContain('Microsoft Word 2010');
  });

  test('Check that Search on “Lithuania” has sidebar that has information summary on Lithuania displayed', async () => {
    await startPage.initiateSearch('Lithuania');
    const textContent = await page.textContent('.module.module--about.module--zci-wikipedia_fathead.js-module--wikipedia_fathead.js-about-module.has-content-height');
    expect(textContent).toContain('lithuania');
  });

  test('Shortened wikipedea link', async () => {
    await startPage.initiateSearch('shorten www.wikipedia.org/');
    const shortURL = await page.inputValue('#shorten-url');
    await page.goto(shortURL);
    const title = await page.isVisible('#www-wikipedia-org');
    expect(title).toBe(true);
  });

  test('panda', async () => {
    await startPage.initiateSearch('intitle:panda');
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    results.forEach(result => {
      expect(result).toContain("Panda");
    });
  });

  const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
      await startPage.initiateSearch(`password ${passwordLength}`);
      const generatedPassword = await resultsPage.getGeneratedPassword();
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });

});