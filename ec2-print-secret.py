import boto3 
import json 
client = boto3.client(
  service_name='secretsmanager',
  region_name='ap-southeast-1'
)
response = client.get_secret_value(
  SecretId='jtan-rds-cityapp-2'
)
database_secrets = json.loads(response['SecretString'])
print(database_secrets
