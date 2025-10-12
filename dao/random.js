export default class Random {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }
async install() {
  const sql = `
    DROP TABLE IF EXISTS random_items;
    CREATE TABLE random_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      int_val INT,
      float_val FLOAT,
      str_val VARCHAR(50)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  return this.dbPool.query(sql)
    .then(() => console.log("✅ Table 'random_items' recreated"))
    .catch(console.error);
}
}
export function getRandomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min = 0, max = 100) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export function getRandomString(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
