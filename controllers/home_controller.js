export default class HomeController {
    index(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        response.end("<h1>Home</h1>");
    }
    
    privacy(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        response.end("<h1>Private Policy</h1>");
    }
};