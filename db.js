import * as mysql2 from 'mysql2'

const connectionData = {
    host: 'localhost',
    port: 3306,
    user: 'user_231',
    password: 'pass_231',
    database: 'node_231',
    charset: 'utf8mb4'
}

const dbPool = mysql2.createPool(connectionData).promise()

dbPool.query("SHOW DATABASES")
.then(([data, fieldsList]) => {
    console.log(data)
    console.log(fieldsList)
})

await dbPool.query("SELECT CURRENT_TIMESTAMP", [1])
.then(([data, fieldslist])=>{
console.log(data);
console.log(fieldslist);
})

.catch(console.error);
dbPool.end();
