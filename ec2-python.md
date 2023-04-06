## 1. Python + boto3 on EC2: connection to RDS using Secrets Manager

### 1.1. Prepare python packages:

```console
yum -y install python3-pip
pip install mysql-connector-python boto3
```

### 1.2. Sample python script

- The AWS boto3 SDK [credentials can be configured in multiple ways](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html), when the session is called with empty arguments `client = boto3.client()`, it uses the instance metadata service
- The secret can be retrieve using `get_secret_value(SecretId='jtan-rds-cityapp-2')` function from the client created
- The remaining code uses the secret to connect to the database and retrieve a random row

https://github.com/joetanx/aws-rds-sm/blob/c6cdea352cbb033999da86fd114a46afe06cab97/ec2-cityapp.py#L1-L30

### 1.3. Sample output:

```console
[root@ip-192-168-94-94 ~]# python cityapp.py
('Lubao', 'Philippines', 'Central Luzon', 125699)
```
