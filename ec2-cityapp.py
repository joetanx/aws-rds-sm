import mysql.connector
import boto3
import json 

REGION="ap-southeast-1"

client = boto3.client('secretsmanager',region_name=REGION)
response = client.get_secret_value(SecretId='jtan-rds-cityapp-2')
database_secrets = json.loads(response['SecretString'])

USER=database_secrets['username']
PASSWORD=database_secrets['password']
HOST=database_secrets['host']
DBNAME=database_secrets['dbname']

db = mysql.connector.connect(
  host=HOST,
  user=USER,
  password=PASSWORD,
  database=DBNAME
)

cursor = db.cursor()

cursor.execute("SELECT city.Name as City,country.name as Country,city.District,city.Population FROM city,country WHERE city.CountryCode = country.Code ORDER BY RAND() LIMIT 0,1")

result = cursor.fetchall()

for row in result:
  print(row)
