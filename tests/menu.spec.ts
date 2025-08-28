import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import MenuPage from '../pages/MenuPage';

test.describe('@menu', () => {
  let loginPage: LoginPage;
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(80000)
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded', timeout: 100000 });
    loginPage = new LoginPage(page);
    await loginPage.saisirUsername('standard_user');
    await loginPage.saisirPassword('secret_sauce');
    await loginPage.clicSurLogin();
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    menuPage = new MenuPage(page);
  });

  test('click menu @tc-001-01', async () => {
    await menuPage.clickMenu();
  });

  test('click menu All @tc-001-01 @All', async () => {
    await menuPage.clickMenu();
    await menuPage.clickMenuAll();
  });

  test('click menu About @tc-001-01 @About', async ({ page }) => {
    await menuPage.clickMenu();
    await menuPage.clickMenuAbout();
    expect(page.url()).toBe('https://saucelabs.com/');
  });

  test('click menu Logout @tc-001-01 @Logout', async ({ page }) => {
    await menuPage.clickMenu();
    await menuPage.clickMenuLogout();
    expect(page.url()).toBe('https://www.saucedemo.com/');
  });

  test('click menu Reset App State @tc-001-01 @Reset', async () => {
    await menuPage.clickMenu();
    await menuPage.clickMenuReset();
  });
});
