const mysql = require('mysql2/promise');

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const generateRandomData = () => {
    const randomInt = Math.floor(Math.random() * 1000);
    const randomFloat = Math.random() * 100;
    const randomString = Math.random().toString(36).substring(2, 12);
    return [randomInt, randomFloat, randomString];
};

async function main() {
    let connection;
    try {
        connection = await dbPool.getConnection();

        const createTableSql = `
            CREATE TABLE IF NOT EXISTS random_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                int_val INT,
                float_val FLOAT,
                str_val VARCHAR(255)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4
        `;

        await connection.query(createTableSql);

        const insertSql = 'INSERT INTO random_items (int_val, float_val, str_val) VALUES (?, ?, ?)';
        
        for (let i = 0; i < 5; i++) {
            const randomData = generateRandomData();
            await connection.query(insertSql, randomData);
        }

        const selectSql = 'SELECT * FROM random_items';
        const [rows] = await connection.query(selectSql);
        console.table(rows);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) {
            connection.release();
        }
        await dbPool.end();
    }
}

main();
