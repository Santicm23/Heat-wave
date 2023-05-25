
import webdriver from 'selenium-webdriver';
import casual from 'casual';


describe('Authentication tests', () => {
    
    test('Users should be able to login and be redirected to the feed page. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        const url = 'http://localhost:8080';

        await driver.get(url);

        const name = await driver.findElement(webdriver.By.id('un-email'));
        name.sendKeys('username');
        const pass = await driver.findElement(webdriver.By.id('pass'));
        pass.sendKeys('123456');
        
        const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
        await btnLogin.click();

        await driver.sleep(3000);
        
        expect(await driver.getCurrentUrl()).toBe(`${url}/feed.html`);

        await driver.quit();
        
    }, 10000);

    test('Users should be redirected to de login page if they are not autheticated. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        const url = 'http://localhost:8080';

        await driver.get(`${url}/feed.html`);

        await driver.sleep(1000);
        
        expect(await driver.getCurrentUrl()).toBe(`${url}/index.html`);
        
        await driver.get(`${url}/profile.html`);

        await driver.sleep(1000);
        
        expect(await driver.getCurrentUrl()).toBe(`${url}/index.html`);

        await driver.quit();

    }, 8000);

    test('Users should not be able to login if wrong data is provided', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        const url = 'http://localhost:8080';

        await driver.get(`${url}`);

        const first_window = await driver.getCurrentUrl();

        const name = await driver.findElement(webdriver.By.id('un-email'));
        name.sendKeys(casual.name);
        const pass = await driver.findElement(webdriver.By.id('pass'));
        pass.sendKeys(casual.password);

        const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
        await btnLogin.click();

        await driver.sleep(3000);

        expect(await driver.getCurrentUrl()).toBe(first_window);

        await driver.quit();
        
    }, 8000);

    test('Users should be able to register and then login with that account. (frontend)', async() => {

    });
    
});