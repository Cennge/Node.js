
export default class GroupDao {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }
    install() {
        const sql = `CREATE TABLE IF NOT EXISTS \`groups\`(
id CHAR(36) PRIMARY KEY,
parent_id CHAR(36) NULL,
name VARCHAR(64) NOT NULL COLLATE utf8mb4_unicode_ci)
ENGINE = InnoDb DEFAULT CHARSET = utf8mb4`;
        return this.dbPool.query(sql)
            .then(() => console.log("Table 'groups' created"))
            .catch(console.error)
    }

   seed() {
    let tasks = [];
    let sql;

    // Побутова техніка
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('849a792b-9206-11f0-875d-0250b9ae25c3',null, 'Побутова техніка') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Для вани
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('93814048-9207-11f0-875d-0250b9ae25c3','849a792b-9206-11f0-875d-0250b9ae25c3', 'Для вани') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('dee36336-9207-11f0-875d-0250b9ae25c3','93814048-9207-11f0-875d-0250b9ae25c3', 'Пральні машини') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('e22029df-9207-11f0-875d-0250b9ae25c3','93814048-9207-11f0-875d-0250b9ae25c3', 'Сушарки') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Для кухні
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('4ede7995-9208-11f0-875d-0250b9ae25c3','849a792b-9206-11f0-875d-0250b9ae25c3', 'Для кухні') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('4caa4e37-9208-11f0-875d-0250b9ae25c3','4ede7995-9208-11f0-875d-0250b9ae25c3', 'Холодильники') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('4a9283e4-9208-11f0-875d-0250b9ae25c3','4ede7995-9208-11f0-875d-0250b9ae25c3', 'Посудомийки') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Для прибирання
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('f58972fb-9208-11f0-875d-0250b9ae25c3','849a792b-9206-11f0-875d-0250b9ae25c3', 'Для прибирання') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('f327273e-9208-11f0-875d-0250b9ae25c3','f58972fb-9208-11f0-875d-0250b9ae25c3', 'Пилососи побутові') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('f0ed1ee0-9208-11f0-875d-0250b9ae25c3','f58972fb-9208-11f0-875d-0250b9ae25c3', 'Пилососи-машини') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Комп'ютерна техніка
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('c1b4e610-9209-11f0-875d-0250b9ae25c3',null, 'Компютерна техніка') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('c4ffb470-9209-11f0-875d-0250b9ae25c3','c1b4e610-9209-11f0-875d-0250b9ae25c3', 'Ноутбуки') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('c6f6de3f-9209-11f0-875d-0250b9ae25c3','c1b4e610-9209-11f0-875d-0250b9ae25c3', 'Десктопи') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Аксесуари
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('c8b8e35e-9209-11f0-875d-0250b9ae25c3','c1b4e610-9209-11f0-875d-0250b9ae25c3', 'Аксесуари') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Витратні матеріали
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('ca74b2f0-9209-11f0-875d-0250b9ae25c3','c8b8e35e-9209-11f0-875d-0250b9ae25c3', 'Витратні матеріали') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Для принтерів
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('cc3150e1-9209-11f0-875d-0250b9ae25c3','ca74b2f0-9209-11f0-875d-0250b9ae25c3', 'Для принтерів') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('cdf732a0-9209-11f0-875d-0250b9ae25c3','cc3150e1-9209-11f0-875d-0250b9ae25c3', 'Чорнила') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('cfbfeed0-9209-11f0-875d-0250b9ae25c3','cc3150e1-9209-11f0-875d-0250b9ae25c3', 'Тонери') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Папір
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('d19bb8a0-9209-11f0-875d-0250b9ae25c3','ca74b2f0-9209-11f0-875d-0250b9ae25c3', 'Папір') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Серветки
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('d35ff5f0-9209-11f0-875d-0250b9ae25c3','ca74b2f0-9209-11f0-875d-0250b9ae25c3', 'Серветки для чищення') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Носії даних
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('d52f66c0-9209-11f0-875d-0250b9ae25c3','c8b8e35e-9209-11f0-875d-0250b9ae25c3', 'Носії даних') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Сумки, рюкзаки
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('d71f07f0-9209-11f0-875d-0250b9ae25c3','c8b8e35e-9209-11f0-875d-0250b9ae25c3', 'Сумки, рюкзаки') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    // Меблі
    sql = `insert into \`groups\` (id, parent_id,name)
    values ('e1a1e810-9209-11f0-875d-0250b9ae25c3',null, 'Меблі') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('e3691f90-9209-11f0-875d-0250b9ae25c3','e1a1e810-9209-11f0-875d-0250b9ae25c3', 'Корпусні') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    sql = `insert into \`groups\` (id, parent_id,name)
    values ('e52a2780-9209-11f0-875d-0250b9ae25c3','e1a1e810-9209-11f0-875d-0250b9ae25c3', 'Мякі') 
    on duplicate key update name = values(name), parent_id =values(parent_id)`;
    tasks.push(this.dbPool.query(sql));

    return Promise.all(tasks);
}

}