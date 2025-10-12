import * as fs from 'node:fs/promises';
export default class UserController {
    async index(request, response, id) {
        await this.layout(response, "<h1>User Controller</h1>");
    }
 
    async signup(request, response, id) {
        await this.layout(response, "<h1>Реєстрація користувача</h1>");
    }
 
    async layout(response, main) {
        const file = await fs.open("layout.html", "r");
        let html = (await file.readFile()).toString();
        file.close();
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });
        response.end( html.replace('{{main}}', main) );
    }
};