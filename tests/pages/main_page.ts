import { type Locator, type Page, expect } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly startButton: Locator;
    readonly companyName: Locator;
    readonly address: Locator;
    readonly ein: Locator;
    readonly sector: Locator;
    readonly automationTool: Locator;
    readonly annualSaving: Locator;
    readonly date: Locator;
    readonly submitButton: Locator;
    readonly resetButton: Locator;
    readonly signInButton: Locator;
    readonly orLoginButton: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startButton = page.getByRole('button', { name: 'Start' });
        this.companyName = page.locator('div:contains("Company Name") + input');
        this.address = page.locator('div:contains("Address") + input');
        this.ein = page.locator('div:contains("EIN") + input');
        this.sector = page.locator('div:contains("Sector") + input');
        this.automationTool = page.locator('div:contains("Automation Tool") + input');
        this.annualSaving = page.locator('div:contains("Annual Saving") + input');
        this.date = page.locator('div:contains("Date") + input');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.signInButton = page.getByRole('button', { name: 'SIGN UP OR LOGIN' });
        this.orLoginButton = page.getByRole('button', { name: 'OR LOGIN', exact: true });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'LOG IN' });
    }

    async clickStartButton() {
        await this.startButton.click();
    }

    async fillCompanyName(companyName: string) {
        await this.companyName.fill(companyName);
    }

    async fillAddress(address: string) {
        await this.address.fill(address);
    }

    async fillEIN(ein: string) {
        await this.ein.fill(ein);
    }

    async fillSector(sector: string) {
        await this.sector.fill(sector);
    }

    async fillAutomationTool(automationTool: string) {
        await this.automationTool.fill(automationTool);
    }

    async fillAnnualSaving(annualSaving: string) {
        await this.annualSaving.fill(annualSaving);
    }

    async fillDate(date: string) {
        await this.date.fill(date);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await this.signInButton.click();
        await this.orLoginButton.click();
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

export default MainPage;