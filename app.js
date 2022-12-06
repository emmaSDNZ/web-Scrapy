const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');


const iniciar = async()=>{
    const header = randomUseragent.getRandom()

    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
    })

    const page = await browser.newPage()

    await page.setUserAgent(header)
 
    await page.goto('http://entrenamiento.beitech.local/')

    //selector inputs
    const loginUsuario = await page.waitForSelector("#name")
    const loginPassword = await page.waitForSelector("#password")

    //limpio los inputs    
    await loginUsuario.click({clickCount: 3});
    await loginUsuario.press('Backspace'); 
    

    //ingreso credenciales
    await loginUsuario.type("###");
    await loginPassword.type("###");
    //loginbtn .toolbar
    await page.click(".toolbar")
    
    await page.goto('http://entrenamiento.beitech.local/webfig/')

    await page.waitForSelector('#content > table.list')
    let elemento = await page.$$('#content > table.list')
    
    for (const item of elemento){
        const elemento = await item.$('tbody:nth-child(5)')
        const texto1 = await page.evaluate(elemento => elemento.innerText, elemento);
        console.log(texto1)
        const elemento1 = await item.$('tbody:nth-child(45)')
        const texto2 = await page.evaluate(elemento1 => elemento1.innerText, elemento1);
        console.log(texto2)
        
    }
    
}
iniciar()

