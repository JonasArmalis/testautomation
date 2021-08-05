
const generatedPasswordSelector = ".c-base__title";
exports.DuckResultsPage = class DuckResultsPage {
    constructor(page) {
        this.page = page;
    }

    async getGeneratedPassword() {
        return await this.page.textContent(generatedPasswordSelector);
    }


}