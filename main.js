const _url = "https://login:passw0rd@music.portal.fun:80/rock/ballads?search=scorpions&from=1990#descending";

// p@ss:w%rd --> p%40s%3Asw%25rd  (@->%40, :->%3A, %->%25)
const invalidUrl = "123";
let result = {
    "scheme": "https",
    "auth": {
        "user-id": "login",
        "password": "passw0rd"
    },
    "host": {
        "tld": "fun",
        "domain": "portal",
        "subdomain": "music"
    },
    "port": 80,
    "path": [
        "rock",
        "ballads"
    ],
    "query": {
        "search": "scorpions",
        "from": "1990"
    },
    "fragment": "descending"
};

function parseUrl(url) {
    let result = {};
    let parts = url.split("://");
    if (parts.length !== 2) throw new Error("Invalid URL: Missing or multiple scheme separators");
    result.scheme = parts[0];

    parts = parts[1].split("@");
    if (parts.length === 2) {
        let authParts = parts[0].split(":");
        if (authParts.length !== 2) throw new Error("Invalid URL: Invalid authentication format");
        result.auth = {
            "user-id": authParts[0],
            "password": authParts[1]
        };
    } else if (parts.length > 2) {
        throw new Error("Invalid URL: Multiple authentication separators");
    }

    let afterAuth = parts.length === 2 ? parts[1] : parts[0];

    let hostPortAndRest = afterAuth.split("/");
    let hostPort = hostPortAndRest[0];
    let [host, port] = hostPort.split(":");
    result.port = port ? Number(port) : undefined;

    let hostParts = host.split(".");
    if (hostParts.length === 3) {
        result.host = {
            subdomain: hostParts[0],
            domain: hostParts[1],
            tld: hostParts[2]
        };
    } else if (hostParts.length === 2) {
        result.host = {
            domain: hostParts[0],
            tld: hostParts[1]
        };
    } else {
        result.host = { tld: hostParts[0] };
    }

    let rest = hostPortAndRest.slice(1).join("/");
    let pathAndQuery = rest.split("?");
    let pathStr = pathAndQuery[0];
    let queryAndFrag = pathAndQuery[1];
    result.path = pathStr ? pathStr.split("/").filter(Boolean) : [];

    if (queryAndFrag) {
        let fragSplit = queryAndFrag.split("#");
        let queryStr = fragSplit[0];
        let fragment = fragSplit[1];

        if (queryStr) {
            result.query = {};
            queryStr.split("&").forEach(pair => {
                let [key, value] = pair.split("=");
                result.query[key] = value;
            });
        }

        if (fragment) {
            result.fragment = fragment;
        }
    }

    console.log(result);
}

parseUrl(_url);