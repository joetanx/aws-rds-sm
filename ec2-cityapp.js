const secretRegion = 'ap-southeast-1'
const secretName = 'jtan-rds-cityapp-2'
const {SecretsManagerClient,GetSecretValueCommand} = require('@aws-sdk/client-secrets-manager')
const client = new SecretsManagerClient({region: secretRegion})

const mysql = require('mysql2')
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

getSecret().then(secret => {
  const connectionConfig = {
    host: secret['host'],
    user: secret['username'],
    password: secret['password'],
    database: secret['dbname']
  }
  const connection = mysql.createConnection(connectionConfig)
  connection.connect(function(err){
    if (err) throw err
    connection.query(query, function(err,results,fields){
      if (err) throw err
      for(row of results){
        console.log(row)
      }
    })
    connection.end()
  })
})
