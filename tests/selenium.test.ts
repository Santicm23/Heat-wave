
import webdriver from 'selenium-webdriver';


const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

jest.setTimeout(10000);

describe('Interactive tests with selenium', () => {
    
    test('Selenium should be able to login', async() => {
        await driver.get('http://localhost:8080');

        const first_window = await driver.getCurrentUrl();

        const name = await driver.findElement(webdriver.By.id('un-email'));
        name.sendKeys('username');
        const pass = await driver.findElement(webdriver.By.id('pass'));
        pass.sendKeys('123456');
        
        const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
        await btnLogin.click();

        await driver.sleep(1000);
        
        expect(await driver.getCurrentUrl()).not.toBe(first_window);

        await driver.sleep(1000);
        
        await driver.quit();
    });
    
});