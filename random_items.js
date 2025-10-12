import mysql from 'mysql2/promise';
import Random from './dao/random.js';
import { getRandomInt, getRandomFloat, getRandomString } from './dao/random.js'; 

const config = {
  host: 'localhost',
  port: 3306,
  user: 'random',
  password: 'pass',
  database: 'random_items',
  charset: 'utf8mb4',
   multipleStatements: true,
};

const dbPool = await mysql.createPool(config);

const random = new Random(dbPool);  
await random.install();

const N = 5;
for (let i = 0; i < N; i++) {
  await dbPool.query(
    "INSERT INTO random_items (int_val, float_val, str_val) VALUES (?, ?, ?)",
    [getRandomInt(), getRandomFloat(), getRandomString()]
  );
}

const [rows] = await dbPool.query("SELECT * FROM random_items");
console.log("Table content:");
console.table(rows);

await dbPool.end();
