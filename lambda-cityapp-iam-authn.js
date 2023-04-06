const secretRegion = process.env.secretRegion
const secretName = process.env.secretName
const {SecretsManagerClient,GetSecretValueCommand} = require('@aws-sdk/client-secrets-manager')
const client = new SecretsManagerClient({region: secretRegion})

const mysql = require('mysql2/promise')
const query = 'SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1'

async function getSecret(){
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: 'AWSCURRENT'
    })
  )
  const result = JSON.parse(response.SecretString)
  return result
}

exports.handler = async () => {
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: 'AWSCURRENT'
    })
  )
  const result = JSON.parse(response.SecretString)
  const connectionConfig = {
    host: result['host'],
    user: result['username'],
    password: result['password'],
    database: result['dbname']
  }
  const connection = await mysql.createConnection(connectionConfig)
  const [rows,fields] = await connection.execute(query)
  connection.end()
  return Object.assign({}, rows[0], result)
}
