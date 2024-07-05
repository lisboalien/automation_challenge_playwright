import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";
import { MainPage } from "../pages/main_page";

const email = process.env.EMAIL ?? "";
const password = process.env.PASSWORD ?? "";

let mainPage: MainPage;

test.describe("Challenge", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await page.goto("/");

    await mainPage.login(email, password);
  });

  //records.forEach((record, index) => {
  test(`TC01 - fill the form`, async ({ page }) => {
    const headers = [
      "ein",
      "company_name",
      "sector",
      "company_address",
      "automation_tool",
      "annual_automation_saving",
      "date_of_first_project",
    ];
    const records = parse(
      fs.readFileSync(
        path.join(__dirname, "../data_driven_tests/challenge.csv")
      ),
      {
        delimiter: ";",
        columns: headers,
        skip_empty_lines: true,
      }
    );

    await mainPage.clickStartButton();

    await expect(mainPage.resetButton).toBeVisible();
    await expect(mainPage.submitButton).toBeVisible();

    for (let i = 1; i < records.length; i++) {
      await mainPage.fillCompanyName(records[i].company_name);
      await mainPage.fillEIN(records[i].ein);
      await mainPage.fillSector(records[i].sector);
      await mainPage.fillAutomationTool(records[i].automation_tool);
      await mainPage.fillAnnualSaving(records[i].annual_automation_saving);
      await mainPage.fillAddress(records[i].company_address);
      await mainPage.fillDate(records[i].date_of_first_project);

      await mainPage.clickSubmitButton();
    }
  });
});
