import { test, expect } from '@playwright/test';
import { PanierPage } from '../pages/PanierPage'

test.describe('Tests Panier', () => {
  test('Ajouter des produits et vérifier le panier', async ({ page }) => {
    const panierPage = new PanierPage(page);

    await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Ajouter des produits spécifiques
    const produitsAAjouter = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    await panierPage.addElements(produitsAAjouter);

    // Aller dans le panier
    await page.click(panierPage.ajouterPanierField);

    // Vérifier que les bons produits sont présents
    await panierPage.verifierPanier(produitsAAjouter);

    // Calculer le total (console log)
    await panierPage.calculTotal();

    // Passer à la caisse
    await panierPage.clickCheckout();
  });
});