
import webdriver from 'selenium-webdriver';


const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

jest.setTimeout(10000);

describe('Authentication tests', () => {
    
    test('Users should be able to login and be redirected to the feed page. (frontend)', async() => {
        const url = 'http://localhost:8080';

        await driver.get(url);

        // const first_window = await driver.getCurrentUrl();

        const name = await driver.findElement(webdriver.By.id('un-email'));
        name.sendKeys('username');
        const pass = await driver.findElement(webdriver.By.id('pass'));
        pass.sendKeys('123456');
        
        const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
        await btnLogin.click();

        await driver.sleep(3000);
        
        expect(await driver.getCurrentUrl()).toBe(`${url}/feed.html`);
        
        await driver.quit();
    });
    
});