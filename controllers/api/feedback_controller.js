export default class FeedbackController {
  constructor() {
    this.restResponse = {
      status: {
        code: 200,
        phrase: "OK",
        isSuccess: true,
      },
      meta: {
        service: "Feedback API",
        method: "",
        serverTime: new Date().getTime(),
        cache: 0,
        dataType: "",
      },
      data: null
    };
  }

  doOptions(request, response) {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      'Access-Control-Allow-Headers': "*"
    });
    response.end();
  }

  doGet(request, response, id) {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    this.restResponse.meta.method = request.method;
    this.restResponse.meta.slug = id;
    this.restResponse.meta.cache = 86400;
    this.restResponse.meta.dataType = "string";
    this.restResponse.data = "GET FeedbackController";

    response.end(JSON.stringify(this.restResponse));
  }

  doPost(request, response, id) {
    let body = "";
    request.on('data', chunk => { body += chunk });
    request.on('end', () => {
      if (request.headers["content-type"]?.startsWith("application/json")) {
        try {
          const data = JSON.parse(body);

         this.restResponse.meta.method = request.method;
        this.restResponse.meta.slug = id;
        this.restResponse.meta.cache = 86400;
        this.restResponse.meta.dataType = "json";
        this.restResponse.data = JSON.stringify({
          "Controller": "POST FeedbackController",
          "body": data
        });
          response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          });
          response.end(JSON.stringify(this.restResponse));
        } catch (err) {
          response.writeHead(400);
          response.end("Invalid JSON");
        }
      } else {
        response.writeHead(415);
        response.end("Unsupported Media Type");
      }
    });
  }

  doPut(request, response, id) {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.restResponse.meta.method = request.method;
    this.restResponse.meta.slug = id;
    this.restResponse.meta.cache = 86400;
    this.restResponse.meta.dataType = "string";
    this.restResponse.data = "PUT FeedbackController";

    response.end(JSON.stringify(this.restResponse));
  }

  doPatch(request, response, id) {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.restResponse.meta.method = request.method;
    this.restResponse.meta.slug = id;
    this.restResponse.meta.cache = 86400;
    this.restResponse.meta.dataType = "string";
    this.restResponse.data = "PATCH FeedbackController";

    response.end(JSON.stringify(this.restResponse));
  }

  doDelete(request, response, id) {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.restResponse.meta.method = request.method;
    this.restResponse.meta.slug = id;
    this.restResponse.meta.cache = 86400;
    this.restResponse.meta.dataType = "string";
    this.restResponse.data = "DELETE FeedbackController";

    response.end(JSON.stringify(this.restResponse));
  }
}
