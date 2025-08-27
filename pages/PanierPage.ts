import { expect, Page } from '@playwright/test';

export class PanierPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  ajouterPanierField = '#shopping_cart_container';
  buttonCheckoutField = '#checkout';


  async addElements(elementsList: string[]) {
    const items = await this.page.locator('.inventory_item');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const title = await item.locator('[data-test="inventory-item-name"]').textContent();

      if (title && elementsList.includes(title.trim())) {
        const addButton = item.locator('button');
        await addButton.click();
      }
    }
  }

  async verifierPanier(produitSouhaites: string[]) {
    const elements = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    const produitsAjoutes = [...elements];

    const produitsAttendus = [...produitSouhaites];

    produitsAjoutes.sort();
    produitsAttendus.sort();

    expect(produitsAjoutes).toEqual(produitsAttendus);
  }

  async calculTotal() {
    const prixElements = await this.page.locator('[data-test="inventory-item-price"]');
    const count = await prixElements.count();

    let total = 0;
    for (let i = 0; i < count; i++) {
      const text = await prixElements.nth(i).textContent();
      if (text) {
        total += parseFloat(text.replace('$', ''));
      }
    }

    console.log('Total :', total.toFixed(2));
  }

  async clickCheckout() {
    await this.page.click(this.buttonCheckoutField);
  }
}
