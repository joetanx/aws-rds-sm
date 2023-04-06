## 1. Node.js on EC2: connection to RDS using IAM authentication

### 1.1. Prepare NPM packages

Install NPM packages:

```console
npm install mysql2 @aws-sdk/client-secrets-manager
```

### 1.2. Sample node.js script

https://github.com/joetanx/aws-rds-sm/blob/332da45d49d18ce95d2ac5a9053fc3b43f7813e5/ec2-cityapp.js#L1-L38

### 1.3. Sample output:

```console
[root@ip-192-168-94-94 ~]# node cityapp.js
{
  City: 'Tema',
  Country: 'Ghana',
  District: 'Greater Accra',
  Population: 109975
}
```
