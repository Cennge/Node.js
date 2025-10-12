import * as fs from "node:fs/promises";

export default class HomeController {

    async index(request, response, id) {
        let parts = request.url.split("?");

        let queryObj = {};
        if (parts.length === 2 && parts[1].length > 0) {
            let queryStr = parts[1];
            let pairs = queryStr.split("&");
            for (let p of pairs) {
                let [key, val] = p.split("=");
                if (key) queryObj[key] = val ?? null;
            }
        }

        let controller, action;
        const path = parts[0];
        let components = path.split('/');

        if (components.length > 1 && components[1].length > 0) {
            controller = components[1].toLowerCase();
        } else {
            controller = "home";
        }

        if (components.length > 2 && components[2].length > 0) {
            action = components[2].toLowerCase();
        } else {
            action = "index";
        }

        const pageData = {
            method: request.method,
            httpVersion: request.httpVersion,
            url: request.url,
            query: queryObj,
            path: parts[0],
            controller,
            action,
            id,
            groupHtml: await this.makeGroupHtml()
        };

        let mainHtml = `<h1>HomeController: ${controller}/${action}</h1>
                        <p>ID: ${id ?? "нема"}</p>
                        <p>Query: ${JSON.stringify(queryObj)}</p>
                        ${pageData.groupHtml}`;

        await this.layout(response, mainHtml);
    }

    async privacy(request, response, id) {
        await this.layout(response, "<h1>Політика конфіденційності</h1>");
    }

    async layout(response, main) {
        const file = await fs.open("layout.html", "r");
        let html = (await file.readFile()).toString();
        file.close();
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.end(html.replace("{{main}}", main));
    }

    async makeGroupHtml() {
        const [data] = await this.dbPool.query('SELECT * FROM `groups` ');
        let wasChild;
        do {
            wasChild = false;
            for (let i = 0; i < data.length; i += 1) {
                let grp = data[i];
                if (grp["parent_id"] != null) {
                    wasChild = true;
                    let parent = this.findParent(data, grp["parent_id"]);
                    if (typeof parent.sub == 'undefined') {
                        parent.sub = [];
                    }
                    parent.sub.push(grp);
                    data.splice(i, 1);
                }
            }
        } while (wasChild);
        return this.grpToHtml(data);
    }

    grpToHtml(grps) {
        let html = "<ul>";
        for (let grp of grps) {
            if (typeof grp.sub != 'undefined' && grp.sub.length > 0) {
                html += `<li><span class="toggle">${grp.name}</span>`;
                html += this.grpToHtml(grp.sub);
            } else {
                html += `<li>${grp.name}</li>`;
            }
            html += "</li>";
        }
        html += "</ul>";
        return html;
    }

    findParent(arr, parent_id) {
        for (let elem of arr) {
            if (elem.id == parent_id) return elem;
            if (typeof elem.sub != 'undefined') {
                let p = this.findParent(elem.sub, parent_id);
                if (p != null) return p;
            }
        }
        return null;
    }
}
