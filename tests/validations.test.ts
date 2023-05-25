
import webdriver from 'selenium-webdriver';
import casual from 'casual';


describe('Validation tests', () => {

    test('Users should be seeing an error if the email provided is not valid. (frontend)', async() => {
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        
        try {
            const url = 'http://localhost:8080';
    
            await driver.get(`${url}/signUp.html`);
            
            const name = await driver.findElement(webdriver.By.id('name'));
            name.sendKeys(casual.full_name);
            const email = await driver.findElement(webdriver.By.id('email'));
            email.sendKeys(casual.full_name); //! mandamos email invalido para que falle
            const username = await driver.findElement(webdriver.By.id('username'));
            username.sendKeys(casual.username);
            const pass = await driver.findElement(webdriver.By.id('pass'));
            pass.sendKeys(casual.password);
            
            const btnSignUp = await driver.findElement(webdriver.By.id('btnSignUp'));
            await btnSignUp.click();
            
            await driver.sleep(2000);
            
            const error = await driver.findElement(webdriver.By.className('swal2-container'));
            
            expect(error).toBeTruthy();
    
            await driver.quit();
            
        } catch (error) {
            await driver.quit();
            throw error;
        }
        
    }, 12000);
    
});