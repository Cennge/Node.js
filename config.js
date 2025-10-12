import * as fs from 'node:fs/promises';

const CONFIG_FILE = './config.ini';

const defaultConfig = `
host =             localhost
port= 3306;


scheme    = node_db
user = node_user
password = node_pass%10
charset = utf8mb4
`;

fs.access(CONFIG_FILE)
.then(async () => {
    console.log("Config file exists");

    const content = await fs.readFile(CONFIG_FILE, 'utf-8');
    const lines = content.split(/\r?\n/);

    const config = {};

    for (let line of lines) {
        line = line.trim();

        if (!line || line.startsWith('#') || line.startsWith(';')) continue;

        const [key, value] = line.split('=');

        if (key && value) {
            config[key.trim()] = value.trim();
        }
    }

    console.log("Config object:", config);
})
.catch(async () => {
    console.log("⚠️ Config file not found. Creating...");

    let f = await fs.open(CONFIG_FILE, 'w');
    await f.write(defaultConfig);
    f.close();

    console.log("Config file created with default values.");
});
