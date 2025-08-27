import { expect, Page } from "@playwright/test";

class MenuPage{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    elements = {
        menubar: ()=>this.page.locator('button[id="react-burger-menu-btn"]'),
        menuAll: ()=>this.page.locator('a[id="inventory_sidebar_link"]'),
        menuAbout: ()=>this.page.locator('a[id="about_sidebar_link"]'),
        menuLogout: ()=>this.page.locator('a[id="logout_sidebar_link"]'),
        menuReset: ()=>this.page.locator('a[id="reset_sidebar_link"]')
    }

    async clickMenu(){
        await this.elements.menubar().click();
    }

    async clickMenuAll(){
        await this.elements.menuAll().click();
    }

    async clickMenuAbout(){
        await this.elements.menuAbout().click();
    }

    async clickMenuLogout(){
        await this.elements.menuLogout().click();
    }

    async clickMenuReset(){
        await this.elements.menuReset().click();
    }
    
}

export default  MenuPage;