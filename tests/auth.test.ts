
import webdriver from 'selenium-webdriver';
import casual from 'casual';


describe('Authentication tests', () => {
    
    test('Users should be able to login and be redirected to the feed page. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        try {
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
            
        } catch (error) {
            await driver.quit();
            throw error;
        }

        
    }, 10000);

    test('Users should be redirected to de login page if they are not autheticated. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        
        try {
            const url = 'http://localhost:8080';
    
            await driver.get(`${url}/feed.html`);
    
            await driver.sleep(1000);
            
            expect(await driver.getCurrentUrl()).toBe(`${url}/index.html`);
            
            await driver.get(`${url}/profile.html`);
    
            await driver.sleep(1000);
            
            expect(await driver.getCurrentUrl()).toBe(`${url}/index.html`);
    
            await driver.quit();
            
        } catch (error) {
            await driver.quit();
            throw error;
        }
        

    }, 8000);

    test('Users should not be able to login if wrong data is provided', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        try {
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
            
        } catch (error) {
            await driver.quit();
            throw error;
        }
        
        
    }, 8000);

    test('Users should be able to register and then login with that account. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        try {
            const url = 'http://localhost:8080';
    
            await driver.get(`${url}/signUp.html`);
    
            const fake_username = casual.username;
            const fake_pass = casual.password;
            
            const name = await driver.findElement(webdriver.By.id('name'));
            name.sendKeys(casual.full_name);
            const email = await driver.findElement(webdriver.By.id('email'));
            email.sendKeys(casual.email);
            const username = await driver.findElement(webdriver.By.id('username'));
            username.sendKeys(fake_username);
            const pass = await driver.findElement(webdriver.By.id('pass'));
            pass.sendKeys(fake_pass);
            
            const btnSignUp = await driver.findElement(webdriver.By.id('btnSignUp'));
            await btnSignUp.click();
            
            await driver.sleep(1000);
            
            await driver.get(url);
            
            const loginName = await driver.findElement(webdriver.By.id('un-email'));
            loginName.sendKeys(fake_username);
            const loginPass = await driver.findElement(webdriver.By.id('pass'));
            loginPass.sendKeys(fake_pass);
    
            const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
            await btnLogin.click();
            
            await driver.sleep(1000);
    
            expect(await driver.getCurrentUrl()).toBe(`${url}/feed.html`);
    
            await driver.quit();
            
        } catch (error) {
            await driver.quit();
            throw error;
        }
        
    }, 12000);
    
});