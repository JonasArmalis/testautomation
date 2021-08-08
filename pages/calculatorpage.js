const firstNumberFieldSelector = '#number1Field';
const secondNumberFieldSelector = '#number2Field';
const selectOperationSelector = '.element.select.medium#selectOperationDropdown';
const calculateButtonSelector = '#calculateButton';
const answerFieldSelector = '#numberAnswerField';
const errorMsgFieldSelector = '#errorMsgField';
const selectBuildSelector = '#selectBuild';
const clearButtonSelector = '#clearButton';
const integerBoxSelector = '#integerSelect';

exports.calculatorPage = class calculatorPage {
    constructor(page) {
        this.page = page;
    };

    //Navigates to the calculator page.
    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    };

    //Takes 2 numbers and operation to be executed with them and executes.
    async initOperation (num1, num2, operation){
        await this.page.fill(firstNumberFieldSelector, `${num1}`);
        await this.page.fill(secondNumberFieldSelector, `${num2}`);
        await this.page.selectOption(selectOperationSelector, { label: operation });
        await this.page.click(calculateButtonSelector);
    };

    //Returns the answer from the answer field
    async getAnswer () {
        return await this.page.inputValue(answerFieldSelector);
    };

    //Returns the error message if there is one.
    async getErrorMessage() {
        return await this.page.textContent(errorMsgFieldSelector);
    };

    //Selects a specified build.
    async selectBuild (build) {
        await this.page.selectOption(selectBuildSelector, {label: build});
    };

    //Clicks the clear button.
    async clearAnswer() {
        await this.page.click(clearButtonSelector);
    };

    //Checks the Integer Only box
    async checkIntegerBox () {
        await this.page.click(integerBoxSelector);
    };
}