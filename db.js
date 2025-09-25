// import * as mysql2 from 'mysql2'

// const connectionData = {
//     host: 'localhost',
//     port: 3306,
//     user: 'user1',
//     password: 'pass',
//     database: 'node_beb',
//     charset: 'utf8mb4'
// }

// const dbPool = mysql2.createPool(connectionData).promise()

// await dbPool.query("SHOW DATABASES")
// .then(([data, fieldsList]) => {
//     console.log(data)
//     console.log(fieldsList)
// })
// .catch(console.error)

// await dbPool.query("SELECT CURRENT_TIMESTAMP")
// .then(([data, fieldsList]) => {
//     console.log(data)
//     console.log(fieldsList)
// })
// .catch(console.error)

// const sql = `CREATE TABLE  (
//     id CHAR(36) PRIMARY KEY,
//     parent_id CHAR(36) NULL,
//     name VARCHAR(64) NOT NULL
// ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4`

// await dbPool.query(sql)
// .then(([data, fieldsList]) => {
//     console.log(data)
//     console.log(fieldsList)
// })
// .catch(console.error)

// const sql = `
//   CREATE TABLE random_items (
//     int_val INT NOT NULL,
//     float_val FLOAT NOT NULL,
//     str_val VARCHAR(64) NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
// `

// await dbPool.query(sql)

// function random_items(length = 6) {
//   const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
//   return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join("")
// }

// for (let i = 0; i < 3; i++) {
//   const intVal = Math.floor(Math.random() * 100);
//   const floatVal = (Math.random() * 100).toFixed(2);
//   const strVal = randomString();

//   await dbPool.query(
//     "INSERT INTO random_items (int_val, float_val, str_val) VALUES (?, ?, ?)",
//     [intVal, floatVal, strVal]
//   );
// }

// const [rows] = await dbPool.query("SELECT * FROM random_items");
// console.log(" Int  |   Float   | Str");
// console.log("-------------------------------");
// rows.forEach(row => {
//     console.log(` ${row.int_val}   | ${row.float_val}     | ${row.str_val}`);
// });


import mysql2 from 'mysql2'
import GroupDao from './dao/groupDAO.js'

const config = {
    host: 'localhost',
    port: 3306,
    user: 'user1',
    password: 'pass',
    database: 'node_beb',
    charset: 'utf8mb4'
}

const dbPool = mysql2.createPool(config).promise()
const groupDao = new GroupDao(dbPool)
await groupDao.install()
await groupDao.seed().then(() => console.log('Seed finished'))

// await dbPool.query("SELECT * FROM `groups` WHERE parent_id = (SELECT ID FROM `groups` WHERE parent_id IS NULL)").then(([data]) => {
//     console.log(data)    
// })

await dbPool.query(`SELECT
    *
FROM
    \`groups\` G1
    JOIN \`groups\` G2 ON G2.parent_id = G1.id
WHERE
    G1.parent_id IS NULL`).then(([data])=>console.log(data));



// await dbPool.query("SHOW DATABASES").then(([data]) => {
//     console.log(data)    
// })


// ДЕРЕВО ДЛЯ ДЗ 

// import mysql2 from "mysql2";
// import GroupDao from "./dao/groupDAO.js";

// const config = {
//   host: "localhost",
//   port: 3306,
//   user: "user1",
//   password: "pass",
//   database: "node_beb",
//   charset: "utf8mb4",
// };

// const dbPool = mysql2.createPool(config).promise();
// const groupDao = new GroupDao(dbPool);

// await groupDao.install();
// await groupDao.seed().then(() => console.log("Seed finished"));

// // Берём все группы
// const [rows] = await dbPool.query("SELECT * FROM `groups`");

// // Функция для печати с отступами
// function printTree(items, parentId = null, level = 0) {
//   items
//     .filter(row => row.parent_id === parentId)
//     .forEach(row => {
//       console.log("  ".repeat(level) + "- " + row.name);
//       printTree(items, row.id, level + 1);
//     });
// }

// // Выводим дерево
// printTree(rows);



dbPool.end()