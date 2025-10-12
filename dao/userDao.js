import { createHash } from 'node:crypto';

export default class UserDao {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    hash(input) {
    return createHash('md5').update(input).digest('hex');
}

 kdf(password, salt) {
    let t = this.hash(password + salt);
    for (let i = 0; i < 3; i += 1) {
        t = this.hash(t);
    }
    return t;
}
  async register(data) {
    if (typeof data.name === 'undefined' || data.name.length === 0) {
        throw "name not defined or empty";
    }

    if (typeof data.email === 'undefined' || data.email.length === 0) {
        throw "email not defined or empty";
    }

    if (typeof data.login === 'undefined' || data.login.length === 0) {
        throw "login not defined or empty";
    }

    if (typeof data.password === 'undefined' || data.password.length === 0) {
        throw "password not defined or empty";
    }
let sql = "SELECT id FROM `user_accesses` WHERE login = ? LIMIT 1";
        const [rows] = await this.dbPool.query(sql, [data.login]);
        if (rows.length > 0) {
            return { error: true, message: `login '${data.login}' is already taken` };
        }
    
 sql="SELECT UUID() AS U";
const [res]= await this.dbPool.query(sql);
console.log(res);
const id = res[0].U;

         sql = `INSERT INTO \`users\`(id, name, email, birthdate, registered_at)
                   VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
        await this.dbPool.query(sql, [id, data.name,  data.email, data.birthdate]);

        const salt = id.replace(/-/g, '').substring(0, 16) ;
        sql = `INSERT INTO \`user_accesses\`(id, user_id, role_id, login, salt, dk)
               VALUES (UUID(), ?, ?, ?, ?, ?)`;
        await this.dbPool.query(sql, [id,'user', data.login, salt, this.kdf(data.password, salt)]);

       

        return "Registered";
    }

    async getUserAccessByCredentials(login, password) {
    const sql = "SELECT * FROM user_accesses WHERE login = ? LIMIT 1";
    const [rows] = await this.dbPool.query(sql, [login]);
    if (rows.length === 0) return null;

    const ua = rows[0];
    const hash = this.kdf(password, ua.salt);

    if (hash !== ua.dk) return null;

    return ua;
}

async getDbIdentity() {
    const [res] = await this.dbPool.query("SELECT UUID() AS U");
    return res[0].U;
}

async createTokenForUserAccess(userAccess) {
    const id = await this.getDbIdentity();
    const timestamp = new Date().getTime()/1000|0;
    const exp = timestamp + 1e6;

    const sql = `
        INSERT INTO tokens (id, access_id, issued_at, expired_at)
        VALUES (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?))
    `;
    await this.dbPool.query(sql, [id, userAccess.id, timestamp, exp]);

    return { id, timestamp, exp };
}



    install() {
        const sql1 = `
CREATE TABLE IF NOT EXISTS \`users\`(
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    birthdate DATETIME NULL,
    registered_at DATETIME NOT NULL,
    deleted_at DATETIME NULL
) ENGINE = InnoDB 
  DEFAULT CHARSET = utf8mb4 
  COLLATE = utf8mb4_unicode_ci;
`;
       const sql2 = `
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(16) PRIMARY KEY,
    description VARCHAR(64) NOT NULL,
    can_create TINYINT NOT NULL,
    can_read TINYINT NOT NULL,
    can_update TINYINT NOT NULL,
    can_delete TINYINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

       const sql3 = `
CREATE TABLE IF NOT EXISTS user_accesses (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    role_id VARCHAR(16) NOT NULL,
    login VARCHAR(32) NOT NULL,
    salt CHAR(16) NOT NULL,
    dk CHAR(32) NOT NULL,
    UNIQUE (login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const sql4 = `
CREATE TABLE IF NOT EXISTS tokens (
    id CHAR(36) PRIMARY KEY,
    access_id CHAR(36) NOT NULL,
    issued_at DATETIME NOT NULL,
    expired_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
return Promise.all([
    this.dbPool.query(sql1),
    this.dbPool.query(sql2),
    this.dbPool.query(sql3),
    this.dbPool.query(sql4)
])

    }
}