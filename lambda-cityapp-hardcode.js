const mysql = require('mysql2/promise')
const query = 'SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1'
const connectionConfig = {
  host     : process.env.rdsHost,
  user     : process.env.rdsUser,
  password : process.env.rdsPassword,
  port     : process.env.rdsPort,
  database : process.env.rdsDatabase
}
exports.handler = async () => {
  const connection = await mysql.createConnection(connectionConfig)
  const [rows,fields] = await connection.execute(query)
  connection.end()
  return rows[0]
}
