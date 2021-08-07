exports.DuckStartPage = class DuckStartPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://start.duckduckgo.com/');
    }

    async initiateSearch(searchCriteria) {
        await this.page.fill('#search_form_input_homepage', searchCriteria);
        await this.page.click('#search_button_homepage');
        await this.page.waitForNavigation();
    }

}