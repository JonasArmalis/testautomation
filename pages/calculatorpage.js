//CSS selectors
const firstNumberInput = '#number1Field';
const secondNumberInput = '#number2Field';
const operationDropdown = '.element.select.medium#selectOperationDropdown';
const calculateButton = '#calculateButton';
const answerField = '#numberAnswerField';
const errorMsgField = '#errorMsgField';
const selectBuildDropdown = '#selectBuild';
const clearButton = '#clearButton';
const integersOnlyCheckbox = '#integerSelect';

//Page constants
const pageURL = 'https://testsheepnz.github.io/BasicCalculator';

exports.calculatorPage = class calculatorPage {
    constructor(page) {
        this.page = page;
    };

    async goto() {
        await this.page.goto(pageURL);
    };

    //Takes 2 numbers and operation to be executed with them and executes.
    async calculate (num1, num2, operation){
        await this.page.fill(firstNumberInput, `${num1}`);
        await this.page.fill(secondNumberInput, `${num2}`);
        await this.page.selectOption(operationDropdown, { label: operation });
        await this.page.click(calculateButton);
    };

    async getAnswer () {
        return await this.page.inputValue(answerField);
    };

    async getErrorMessage() {
        return await this.page.textContent(errorMsgField);
    };

    async selectBuild (build) {
        await this.page.selectOption(selectBuildDropdown, {label: build});
    };

    async clearAnswer() {
        await this.page.click(clearButton);
    };

    async tickIntegersOnlyCheckbox () {
        await this.page.click(integersOnlyCheckbox);
    };
}