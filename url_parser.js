import http from "http"
import * as fs from "node:fs/promises"

const HTTP_PORT = 81;

async function serverFunction(request, response) {
    //console.log(request)
    const pageData = {
        method: request.method, 
        httpVersion: request.httpVersion, 
        url: request.url,
        query: null,
        controller: "home",
        action: "index",
        slug: null
    }

    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    let parts = request.url.split("?")
    if (parts.length > 2) {
        response.writeHead(400)
        response.end("Bad request")
    }
    if (parts.length == 2) {

        pageData.query = parts[1]
        let tempString = '<pre>{\n'

        let queryEntry = parts[1].split('&')
        for (let entryIndex in queryEntry) {
            let entrySplit = queryEntry[entryIndex].split('=')
            if (entrySplit.length != 2) {
                throw `Format Error: invalid query entry`
            }
            tempString += `    ${entrySplit[0]}: ${entrySplit[1]}${entryIndex == queryEntry.length - 1 ? '' : ','}\n`
        }
        tempString += '}</pre>'
        pageData.query = tempString
    }
    pageData.path = parts[0]


    parts = parts[0].split('/')
    let path = parts.slice(1)
    if (path.length > 0) {
        pageData.controller = path[0]
    }
    path = path.slice(1)
    if (path.length > 0) {
        pageData.action = path[0]
    }
    path = path.slice(1)
    if (path.length > 0) {
        let slug = ''
        for (let entry of path) {
            slug += `/${entry}`
        }
        pageData.slug = slug
    }

    const file = await fs.open("home.html", "r")
    let html = (await file.readFile()).toString()
    file.close()
    for (let k in pageData) {
        html = html.replaceAll(`{{${k}}}`, pageData[k])
    }

    response.end(html)
}

const server = http.createServer(serverFunction)
server.on('close', () => {
    console.log('Server stopped')
    process.exit()
})


server.listen(HTTP_PORT, () => {
    console.log('Server listening port', HTTP_PORT)
    console.log('Press Ctrl-C to stop')
})

process.on('SIGINT', () => {
    server.close()
})

// header line and body separator: /r/n
// HTTP Request:
// 9 Standart Methods: 
// GET - get, 
// POST - create, 
// PUT - replace, PATCH - update, 
// DELETE, 
// HEAD, TRACE, CONNECT, 
// OPTIONS
// no body allowed for GET and HEAD