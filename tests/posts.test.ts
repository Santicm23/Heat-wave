
// import webdriver from 'selenium-webdriver';
// import request from 'supertest';

// import { server } from '../app';


// describe('Posts tests', () => {

//     test('Users should be able to publish a post', async() => {
//         const driver = new webdriver.Builder()
//             .forBrowser('chrome')
//             .build();

//         try {
//             await driver.sleep(3000);

//             const url = 'http://localhost:8080';

//             let res = await request(server.app).get('/posts/count/username');

//             const cant = res.body.feedposts.length;

//             await driver.get(url);
    
//             const name = await driver.findElement(webdriver.By.id('un-email'));
//             name.sendKeys('username');
//             const pass = await driver.findElement(webdriver.By.id('pass'));
//             pass.sendKeys('123456');
            
//             const btnLogin = await driver.findElement(webdriver.By.id('btnLogin'));
//             await btnLogin.click();

//             const btnPerfil = await driver.findElement(webdriver.By.id('perfil'));
//             await btnPerfil.click();

//             const btnCreate = await driver.findElement(webdriver.By.id('btnCreate'));
//             await btnCreate.click();
            
//             const btnSongs = await driver.findElement(webdriver.By.className('select-btn'));
//             await btnSongs.click();
            
//             const btnSong1 = await driver.findElement(webdriver.By.id('cancion1'));
//             await btnSong1.click();
            
            
//             const btnPost = await driver.findElement(webdriver.By.id('btn-post'));
//             await btnPost.click();

//             await driver.sleep(2000);

//             res = await request(server.app).get('/posts/count/username');

//             const cant2 = res.body.feedposts.length;

//             expect(cant2).toBe(cant + 1);
    
//             await driver.quit();
            
//         } catch (error) {
//             await driver.quit();
//             throw error;
//         }
//     }, 10000);

// });