import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { MainPage } from '../pages/main_page';

const records = parse(fs.readFileSync(path.join(__dirname, '../data_driven_tests/challenge.csv')), {
  columns: true,
  skip_empty_lines: true
});

let mainPage: MainPage;

test.describe('Challenge', () => {
  test.beforeAll(async ({ page }) => {
    mainPage = new MainPage(page);
    await page.goto('/');

    await mainPage.login('lisboalien@gmail.com', '9q*2uHMPosHxNZ');
  });

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await page.goto('/');
  });

  //records.forEach((record, index) => {
  test(`TC01 - fill the form`, async ({ page }) => {
    const index = 0;
    if (index === 0) {
      await mainPage.clickStartButton();
    }
    await mainPage.fillCompanyName('111');
  });
  //});
});

