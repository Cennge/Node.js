export default class ClientController {
    doGet(request, response, id) {
        response.writeHead(200);
        response.end("ClientController");
    }

    doPost(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
            "controller": "ClientController",
            "method": "POST"
        }));
    }

    doPut(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
            "controller": "ClientController",
            "method": "PUT"
        }));
    }

    doPatch(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
            "controller": "ClientController",
            "method": "PATCH"
        }));
    }
}