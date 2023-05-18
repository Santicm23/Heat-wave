
const webdriver = require('selenium-webdriver');


const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe('Interactive tests with selenium', () => {
    
    test('Selenium should be able to login', async() => {
        await driver.get('http://localhost:8080');

        await driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n');
        
        const title = await driver.getTitle();
        console.log(title);
        if(title === 'webdriver - Google Search') {
            console.log('Test passed');
        } else {
            console.log('Test failed');
        }
        driver.quit();
    });
    
});