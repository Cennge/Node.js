export default class UserController {
    index(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        response.end("<h1>User</h1>");
    }

    signup(request, response, id) {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        response.end("<h1>Registration</h1>");
    }

    async makeGroupsHtml() {
        const [data] = await dbPool.query('SELECT * FROM \`groups\`')
        let wasChild
        do {
            wasChild = false
            for (let i = 0; i < data.length; i++) {
                let grp = data[i]
                if (grp["parent_id"] != null) {
                    wasChild = true
                    let parent = this.findParent(data, grp["parent_id"])
                    if (typeof parent.sub == 'undefined') {
                        parent.sub = []
                    }
                    parent.sub.push(grp)
                    data.splice(i, 1)
                }
            }
        } while (wasChild)

        return this.grpToHtml(data)
    }

    grpToHtml(grps) {
        let html = "<ul>"
        for (let grp of grps) {
            html += `<li>${grp.name}`
            if (typeof grp.sub != 'undefined' && grp.sub.length > 0) {
                html += this.grpToHtml(grp.sub)
            }
            html += '</li>'
        }
        html += '</ul>'
        return html
    }

    findParent(arr, parent_id) {
        for (let elem of arr) {
            if (elem.id == parent_id) return elem
            if (typeof elem.sub != 'undefined') {
                let p = this.findParent(elem.sub, parent_id)
                if (p != null) return p
            }
        }
        return null
    }


};