import { type Locator, type Page, expect } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly mainSelector: Locator;
  readonly startButton: Locator;
  readonly companyName: Locator;
  readonly address: Locator;
  readonly einInput: Locator;
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
  readonly captchaButton: Locator;
  readonly captchaTitle: Locator;
  readonly inputLocator: String =
    '.Group:not([style*="display: none"]) .Group:not(:has(.Group)):has(.Text:has-text(":input:")) .Input';

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole("button", { name: "Start" });
    this.mainSelector = page.locator(
      'css=.Group:not([style*="display: none"]) .Group:not(:has(.Group)):has(.Text:has-text("Company Name")) .Input'
    );
    this.companyName = page.locator(
      'css=.Group:not([style*="display: none"]) .Group:not(:has(.Group)):has(.Text:has-text("Company Name")) input'
    );
    this.address = page.locator(
      this.inputLocator.replace(":input:", "Address")
    );
    this.einInput = page.locator(this.inputLocator.replace(":input:", "EIN"));
    this.sector = page.locator(this.inputLocator.replace(":input:", "Sector"));
    this.automationTool = page.locator(
      this.inputLocator.replace(":input:", "Automation Tool")
    );
    this.annualSaving = page.locator(
      this.inputLocator.replace(":input:", "Annual Saving")
    );
    this.date = page.locator(this.inputLocator.replace(":input:", "Date"));
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.signInButton = page.getByRole("button", { name: "SIGN UP OR LOGIN" });
    this.orLoginButton = page.getByRole("button", {
      name: "OR LOGIN",
      exact: true,
    });
    this.email = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "LOG IN" });
    this.captchaTitle = page.getByText(
      "Get through this reCAPTCHA to continue"
    );
    this.captchaButton = page.getByRole("button", { name: "presentation" });
  }

  async clickStartButton() {
    await this.startButton.click();
  }

  async fillCompanyName(companyName: string) {
    await this.captchaHandler()
    await this.companyName.fill(companyName, { timeout: 10000 });
  }

  async fillAddress(address: string) {
    await this.captchaHandler()
    await this.address.fill(address);
  }

  async fillEIN(ein: string) {
    await this.captchaHandler()
    await this.einInput.fill(ein);
  }

  async fillSector(sector: string) {
    await this.captchaHandler()
    await this.sector.fill(sector);
  }

  async fillAutomationTool(automationTool: string) {
    await this.captchaHandler()
    await this.automationTool.fill(automationTool);
  }

  async fillAnnualSaving(annualSaving: string) {
    await this.captchaHandler()
    await this.annualSaving.fill(annualSaving);
  }

  async fillDate(date: string) {
    await this.captchaHandler()
    await this.date.fill(date);
  }

  async clickSubmitButton() {
    await this.captchaHandler()
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

  async fillForm(
    companyName: string,
    address: string,
    ein: string,
    sector: string,
    automationTool: string,
    annualSaving: string,
    date: string
  ) {
    await this.fillCompanyName(companyName);
    await this.fillAddress(address);
    await this.fillEIN(ein);
    await this.fillSector(sector);
    await this.fillAutomationTool(automationTool);
    await this.fillAnnualSaving(annualSaving);
    await this.fillDate(date);
  }

  async captchaHandler() {
    if (await this.captchaTitle.isVisible()) {
      await this.captchaButton.click();
      await expect(this.captchaTitle).not.toBeVisible();
    }
  }
}

export default MainPage;
