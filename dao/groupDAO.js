// SELECT UUID()

export default class GroupDao {
    constructor(dbPool) {
        this.dbPool = dbPool
    }
    install() {
        const sql = `CREATE TABLE  IF NOT EXISTS  \`groups\`(
            id CHAR(36) PRIMARY KEY,
            parent_id CHAR(36) NULL,
            name VARCHAR(64) NOT NULL COLLATE utf8mb4_unicode_ci
        ) ENGINE = InnoDb  DEFAULT CHARSET = utf8mb4`;
        return this.dbPool.query(sql)
            .then(() => console.log("Table 'groups' created"))
            .catch(console.error)
    }
    seed() {
        let tasks = [];

        let sql = `INSERT INTO \`groups\`(id, parent_id, name)
        VALUES('78d45d87-9206-11f0-b367-54e1ad32308c', NULL, 'Побутова техніка')
        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        parent_id = VALUES(parent_id) `
        tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('878c7ead-9207-11f0-b367-54e1ad32308c', '78d45d87-9206-11f0-b367-54e1ad32308c', 'Для ванни')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('356a4fa7-9208-11f0-b367-54e1ad32308c', '878c7ead-9207-11f0-b367-54e1ad32308c', 'Пральні машини')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('0cb34277-9209-11f0-b367-54e1ad32308c', '878c7ead-9207-11f0-b367-54e1ad32308c', 'Сушарки')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('b21e9bac-920a-11f0-b367-54e1ad32308c', '78d45d87-9206-11f0-b367-54e1ad32308c', 'Для кухні')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('119cfc49-920b-11f0-b367-54e1ad32308c', 'b21e9bac-920a-11f0-b367-54e1ad32308c', 'Холодильники')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('21682208-920b-11f0-b367-54e1ad32308c', 'b21e9bac-920a-11f0-b367-54e1ad32308c', 'Посудомийка')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('1333272e-940c-11f0-b367-54e1ad32308c', '78d45d87-9206-11f0-b367-54e1ad32308c', 'Для прибирання')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('3c024e67-940c-11f0-b367-54e1ad32308c', '1333272e-940c-11f0-b367-54e1ad32308c', 'Пилисоси побутові')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('4aebab71-940c-11f0-b367-54e1ad32308c', '1333272e-940c-11f0-b367-54e1ad32308c', 'Пилисоси-машини')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

        sql = `INSERT INTO \`groups\`(id, parent_id, name)
        VALUES('760f952d-940c-11f0-b367-54e1ad32308c', NULL, 'Компютерна техніка')
        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        parent_id = VALUES(parent_id) `
        tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('929de18e-940c-11f0-b367-54e1ad32308c', '760f952d-940c-11f0-b367-54e1ad32308c', 'Ноутбуки')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('adb0784c-940c-11f0-b367-54e1ad32308c', '760f952d-940c-11f0-b367-54e1ad32308c', 'Десктопи')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('bc353fa5-940c-11f0-b367-54e1ad32308c', '760f952d-940c-11f0-b367-54e1ad32308c', 'Аксесуари')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('f4527e46-940c-11f0-b367-54e1ad32308c', 'bc353fa5-940c-11f0-b367-54e1ad32308c', 'Витратні матеріали')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                                VALUES('1550e11c-940d-11f0-b367-54e1ad32308c', 'f4527e46-940c-11f0-b367-54e1ad32308c', 'Для принтерів')
                                ON DUPLICATE KEY UPDATE
                                name = VALUES(name),
                                parent_id = VALUES(parent_id) `
                                tasks.push(this.dbPool.query(sql));

                                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                                        VALUES('400ed7ad-940d-11f0-b367-54e1ad32308c', '1550e11c-940d-11f0-b367-54e1ad32308c', 'Чорнила')
                                        ON DUPLICATE KEY UPDATE
                                        name = VALUES(name),
                                        parent_id = VALUES(parent_id) `
                                        tasks.push(this.dbPool.query(sql));

                                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                                        VALUES('585b4d86-940d-11f0-b367-54e1ad32308c', '1550e11c-940d-11f0-b367-54e1ad32308c', 'Тонери')
                                        ON DUPLICATE KEY UPDATE
                                        name = VALUES(name),
                                        parent_id = VALUES(parent_id) `
                                        tasks.push(this.dbPool.query(sql));

                                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                                VALUES('71e92921-940d-11f0-b367-54e1ad32308c', 'f4527e46-940c-11f0-b367-54e1ad32308c', 'Папір')
                                ON DUPLICATE KEY UPDATE
                                name = VALUES(name),
                                parent_id = VALUES(parent_id) `
                                tasks.push(this.dbPool.query(sql));

                                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                                VALUES('82593885-940d-11f0-b367-54e1ad32308c', 'f4527e46-940c-11f0-b367-54e1ad32308c', 'Серветки для чищення')
                                ON DUPLICATE KEY UPDATE
                                name = VALUES(name),
                                parent_id = VALUES(parent_id) `
                                tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('a590eb2f-940d-11f0-b367-54e1ad32308c', 'bc353fa5-940c-11f0-b367-54e1ad32308c', 'Носії даних')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

                        sql = `INSERT INTO \`groups\`(id, parent_id, name)
                        VALUES('b8febd3a-940d-11f0-b367-54e1ad32308c', 'bc353fa5-940c-11f0-b367-54e1ad32308c', 'Сумки, рюкзаки')
                        ON DUPLICATE KEY UPDATE
                        name = VALUES(name),
                        parent_id = VALUES(parent_id) `
                        tasks.push(this.dbPool.query(sql));

        sql = `INSERT INTO \`groups\`(id, parent_id, name)
        VALUES('ab07e0bd-940e-11f0-b367-54e1ad32308c', NULL, 'Меблі')
        ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        parent_id = VALUES(parent_id) `
        tasks.push(this.dbPool.query(sql));       

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('cf90dbec-940e-11f0-b367-54e1ad32308c', 'ab07e0bd-940e-11f0-b367-54e1ad32308c', 'Корпусні')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));       

                sql = `INSERT INTO \`groups\`(id, parent_id, name)
                VALUES('e2dc57d1-940e-11f0-b367-54e1ad32308c', 'ab07e0bd-940e-11f0-b367-54e1ad32308c', 'Мякі')
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                parent_id = VALUES(parent_id) `
                tasks.push(this.dbPool.query(sql));     

                                                

        return Promise.all(tasks);
    }
} 




