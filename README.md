## Connect Python/Node.js on EC2/Lamda to AWS RDS using AWS Secrets Manager

|S/N|Topic|Link|
|---|---|---|
|1.|Setup AWS RDS instance|<https://github.com/joetanx/aws-rds-sm/blob/main/prepare-rds.md>|
|2.|Prepare AWS Secrets Manager<br>• Create secret for RDS account<br>• Create VPC endpoint for Secrets Manager<br>• Create IAM policy for Secrets access|<https://github.com/joetanx/aws-rds-sm/blob/main/prepare-sm.md>|
|3.|Setup EC2 instance with instance profile to access AWS Secrets Manager|<https://github.com/joetanx/aws-rds-sm/blob/main/prepare-ec2.md>|
|3.1.|Connect Python on EC2 to RDS using AWS Secrets Manager|<https://github.com/joetanx/aws-rds-sm/blob/main/ec2-python.md>|
|3.2.|Connect Node.js on EC2 to RDS using AWS Secrets Manager|<https://github.com/joetanx/aws-rds-sm/blob/main/ec2-node.js.md>|
|4.|Connect Node.js Lambda function to RDS using AWS Secrets Manager<br>+ publish lambda through API gateway|<https://github.com/joetanx/aws-rds-sm/blob/main/lambda-node.js-api-gw.md>|
