import http from "http";
import * as fs from 'node:fs/promises';
import mysql2 from 'mysql2'
import GroupDao from './dao/groupDao.js'
import { getAllowedMimeType } from "./helper.js";



const dbiniFilename = "db.ini"
const HTTP_PORT = 81;
const CONTROLLER_PATH = './controllers/';


const CONTROLLERS_PATH = './controllers/';
const CONTROLLER_FILE_SUFFIX = '_controller.js';


const apicontrollers = {};
const apiPath = CONTROLLERS_PATH + "api/";
const loadApiControllersTask = fs.readdir(apiPath)
    .then(async filenames => {
        for (let filename of filenames) {
            let pos = filename.indexOf(CONTROLLER_FILE_SUFFIX);
            if (pos != -1) {
                const controllerName = filename.substring(0, pos);
                apicontrollers[controllerName] = (await
                    import(apiPath + filename)
                ).default;
            }
        }
    });



const controllers = {};
const loadControllersTask = fs.readdir(CONTROLLERS_PATH)
    .then(async filenames => {
        for (let filename of filenames) {
            let pos = filename.indexOf(CONTROLLER_FILE_SUFFIX);
            if (pos != -1) {
                const controllerName = filename.substring(0, pos);
                controllers[controllerName] = (await
                    import(CONTROLLERS_PATH + filename)
                ).default;
            }
        }
    });
// CONNECT TO DB
const dbFile = await fs.open(dbiniFilename, "r");
let dbConfig = {};
for await (let line of dbFile.readLines()) {
    let parts = line.split("#")
    line = parts[0]
    parts = line.split(";")
    line = parts[0]
    parts = line.split("=")
    if (parts.length != 2) continue
    dbConfig[parts[0].trim()] = parts[1].trim()
}
const dbPool = mysql2.createPool(dbConfig).promise();
const groupDao = new GroupDao(dbPool)


async function serverFunction(request, response) {
    // console.log(request);
    let parts = request.url.split("?");
    if (parts.length > 2) {
        response.writeHead(400);
        response.end("Bad request");
        return;
    }
    const path = parts[0]
    console.log(path)

    if (!path.endsWith('/')) {
        let contentType = getAllowedMimeType(path);
        if (contentType != null) {
            const filePath = "./wwwroot" + path;
            try {
                await fs.access(filePath);
                const stat = await fs.stat(filePath);

                if (stat.isFile()) {
                    console.log(filePath);

                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    // piping - передача даних від потоку читання до потоку запису
                    (await fs.open(filePath, "r")).createReadStream().pipe(response);
                    return;
                }
            }
            catch (_) { }
        }
    }


    let components = path.split("/", 4);
    let controller, action, id;
    // оскільки всі запити починаються з /, то перший елемент масиву буде порожнім
    if (components[1].length > 0) {
        controller = components[1].toLowerCase();
    }
    else {
        controller = "home";
    }
    if (components.length > 2 && components[2].length > 0) {
        action = components[2].toLowerCase();
    }
    else {
        action = "index";
    }
    if (components.length > 3) {
        id = components[3];
    }
    else {
        id = null;
    }
    console.log(controller, action, id);
    if (controller == 'api') {
        if (typeof apicontrollers[action] == 'function') {
            const apiControllerObject = new apicontrollers[action];
            apiControllerObject.dbPool = dbPool;
            const apiAction = "do" + request.method.charAt(0).toUpperCase()
                + request.method.slice(1).toLowerCase();
            if (typeof apiControllerObject[apiAction] == 'function') {
                apiControllerObject[apiAction](request, response, id);
                return;
            }
            else {
                response.writeHead(405);
                response.end();
                return;
            }
        }
    }
    else if (typeof controllers[controller] == 'function') {
        const controllerObject = new controllers[controller];
        if (typeof controllerObject[action] == 'function') {
            controllerObject[action](request, response, id);
            return;
        }
        else {
            response.writeHead(406);
            response.end();
            return;
        }
    }
    else {
        response.writeHead(404);
        response.end();
        return;
    }




    const pageData = {
        method: request.method,
        httpVersion: request.httpVersion,
        url: request.url,
        query: null,
        controller: 'home',
        action: 'index',
        slug: null,

    };

    if (parts.length == 2) {
        pageData.query = {};
        let pairs = parts[1].split("&");
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            let keyValue = pair.split("=");
            pageData.query[keyValue[0]] = keyValue[1];
        }
        let queryStr = "{\\n";
        for (let key in pageData.query) {
            queryStr += `&nbsp;&nbsp;${key}: ${pageData.query[key]},\\n`;
        }
        if (queryStr.includes(",")) {
            queryStr = queryStr.slice(0, -3);
        }
        queryStr += "\\n}";
        pageData.queryString = queryStr.replace(/\\n/g, "<br>");
    } else {
        pageData.query = {};
        pageData.queryString = "{}";
    }

    pageData.path = parts[0];

    let pathParts = pageData.path.split("/").filter(Boolean);

    if (pathParts[0]) {
        pageData.controller = pathParts[0];
    }
    if (pathParts[1]) {
        pageData.action = pathParts[1];
    }
    if (pathParts[2]) {
        pageData.slug = pathParts[2];
    }

    if (parts.length > 2) {
        throw new Error("Format error");
    }

    pageData.groupsHtml = await makeGroupsHtml()

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const file = await fs.open("home.html", "r");
    let html = (await file.readFile()).toString();
    file.close();
    for (let k in pageData) {
        html = html.replaceAll(`{{${k}}}`, pageData[k]);
    }
    response.end(html);
}

async function makeGroupsHtml() {
    const [data] = await dbPool.query('SELECT * FROM \`groups\`')
    let wasChild
    do {
        wasChild = false
        for (let i = 0; i < data.length; i++) {
            let grp = data[i]
            if (grp["parent_id"] != null) {
                wasChild = true
                let parent = findParent(data, grp["parent_id"])
                if (typeof parent.sub == 'undefined') {
                    parent.sub = []
                }
                parent.sub.push(grp)
                data.splice(i, 1)
            }
        }
    } while (wasChild)

    return grpToHtml(data)
}

function grpToHtml(grps) {
    let html = "<ul>"
    for (let grp of grps) {
        html += `<li>${grp.name}`
        if (typeof grp.sub != 'undefined' && grp.sub.length > 0) {
            html += grpToHtml(grp.sub)
        }
        html += '</li>'
    }
    html += '</ul>'
    return html
}

function findParent(arr, parent_id) {
    for (let elem of arr) {
        if (elem.id == parent_id) return elem
        if (typeof elem.sub != 'undefined') {
            let p = findParent(elem.sub, parent_id)
            if (p != null) return p
        }
    }
    return null
}








const server = http.createServer(serverFunction);
server.on('close', () => {
});

process.on('SIGINT', () => {
});

await loadControllersTask;
await loadApiControllersTask;

console.log(controllers, apicontrollers);

server.listen(HTTP_PORT, () => {
    console.log("Server listening port ", HTTP_PORT);
    console.log(`http://localhost:${HTTP_PORT}`);
    console.log("Press Ctrl-C to stop");
});