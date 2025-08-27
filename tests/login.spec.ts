import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('username correct et pass correct', {tag :['@tc-001','@regression']}, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage:LoginPage= new LoginPage(page);
  await loginPage.saisirUsername('standard_user');
  await loginPage.saisirPassword('secret_sauce');
  await loginPage.clicSurLogin();
  await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html'); 
  
});

test('username incorrect et pass correct', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage:LoginPage= new LoginPage(page);
  await loginPage.saisirUsername('standard_user_incorrect');
  await loginPage.saisirPassword('secret_sauce');
  await loginPage.clicSurLogin();
  await expect( await loginPage.getErrorMessage()).toBeVisible();
});