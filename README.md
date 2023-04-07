## AWS RDS + Secrets Manager usage example with:

- AJAX client
- API Gateway
- Lambda (Node.js)

![image](https://user-images.githubusercontent.com/90442032/230537581-2167094c-ccf7-495e-abc4-02ae5c5893d1.png)

**PLUS:** Examples for using RDS + Secrets Manager with EC2

## 1. Setup AWS RDS instance

Read: <https://github.com/joetanx/aws-rds-sm/blob/main/prepare-rds.md>

## 2. Prepare Secrets Manager

Read: <https://github.com/joetanx/aws-rds-sm/blob/main/prepare-sm.md>

- Create secret for RDS account
- Create VPC endpoint for Secrets Manager
- Create IAM policy for secrets access

## 3. Setup Node.js lambda connection to RDS using Secrets Manager

### 3.1. Create Lambda function

<details><summary><h4> 3.1.1. Create IAM role</h4></summary>

Create an IAM role for Lambda with the Secrets Manager policy created earlier and the `AWSLambdaVPCAccessExecutionRole` permission

![image](https://user-images.githubusercontent.com/90442032/229332927-8ae183f2-9fd4-40d9-a295-d4d7f9bbec26.png)

![image](https://user-images.githubusercontent.com/90442032/230380894-1cc467c6-e5cd-41ef-bb73-eb926abcaaee.png)

![image](https://user-images.githubusercontent.com/90442032/229334309-00061055-b755-4fd6-abcb-e59836e60470.png)

![image](https://user-images.githubusercontent.com/90442032/230380989-14cc2c9d-fe2e-4043-be6b-5b9a78921582.png)

</details>

#### 3.1.2. Create Lambda function and specify the IAM role created as execution role

![image](https://user-images.githubusercontent.com/90442032/230381382-e89508a6-7ca8-49e9-afc2-776fd66276df.png)

![image](https://user-images.githubusercontent.com/90442032/230381554-e22c7b02-52e3-4da3-943e-e8205f6a36c9.png)

### 3.2. Prepare node.js files

Use a separate node.js machine to prepare the files to be uploaded

```console
[root@localhost ~]# yum -y install nodejs zip
⋮
Installed:
  nodejs-1:16.17.1-1.el9_0.x86_64     nodejs-docs-1:16.17.1-1.el9_0.noarch     nodejs-full-i18n-1:16.17.1-1.el9_0.x86_64     nodejs-libs-1:16.17.1-1.el9_0.x86_64     npm-1:8.15.0-1.16.17.1.1.el9_0.x86_64
  unzip-6.0-56.el9.x86_64             zip-3.0-33.el9.x86_64

Complete!
[root@localhost ~]# mkdir cityapp && cd $_
[root@localhost cityapp]# npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (cityapp)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /root/cityapp/package.json:

{
  "name": "cityapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
[root@foxtrot cityapp]# npm --save install mysql2 @aws-sdk/client-secrets-manager

added 84 packages, and audited 85 packages in 17s
⋮
[root@localhost cityapp]# touch index.js
[root@localhost cityapp]# zip -r cityapp.zip .
  adding: package.json (deflated 35%)
  adding: node_modules/ (stored 0%)
  ⋮
  adding: index.js (stored 0%)
```

#### 3.2.1. Upload the .zip file

![image](https://user-images.githubusercontent.com/90442032/229333243-c01682a6-97e6-4889-aa63-46e6c44caea6.png)

![image](https://user-images.githubusercontent.com/90442032/230382797-67a20625-4214-4ec3-9583-4548937e964e.png)

The code source will be populated with the uploaded prepared archive

![image](https://user-images.githubusercontent.com/90442032/230382940-090b4727-1265-495d-9366-3c1f07a195a1.png)

### 3.3. Test RDS access with hardcoded credentials

#### 3.3.1. Populated the environment variables

Go to Configuration → Environment variables → Edit 

![image](https://user-images.githubusercontent.com/90442032/229333540-84d0a50e-dea0-4fa3-8477-9b789665131f.png)

Add the following entries:

```json
{
  "rdsHost": "jtan-rds.cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com",
  "rdsUser": "admin",
  "rdsPassword": "<redacted>",
  "rdsPort": "3306",
  "rdsDatabase": "world"
}
```

![image](https://user-images.githubusercontent.com/90442032/230384222-56b388f4-4bcb-4827-bc81-f6e2f157667e.png)

#### 3.3.2. Update index.js

[Example lambda function: cityapp using lambda environment variables](/lambda-cityapp-hardcode.js)

https://github.com/joetanx/aws-rds-sm/blob/03a0e1ec0f15fbf936b629be40ec4682ac8f472a/lambda-cityapp-hardcode.js#L1-L15

Update `index.js` with the example code and select `Deploy`

![image](https://user-images.githubusercontent.com/90442032/229333760-510eb001-b18a-4bc0-9743-990f748e944b.png)

#### 3.3.3. Run test

Go to `Test` and click `Test`

(The template doesn't matter since the code doesn't require input)

![image](https://user-images.githubusercontent.com/90442032/229337109-de97c89d-2c72-4555-b8ff-eab7767429ac.png)

Notice that the duration took **45ms**:

![image](https://user-images.githubusercontent.com/90442032/229336876-759c7dd5-2a6a-4b9a-93a7-aa5f569f120f.png)

### 3.4. Test RDS access with Secrets Manager

#### 3.4.1. Populated the environment variables

Update the environment variables to:

```json
{
  "secretName": "jtan-rds-cityapp-2",
  "secretRegion": "ap-southeast-1"
}
```

![image](https://user-images.githubusercontent.com/90442032/230386085-a976b4b4-cd4c-467d-8382-3141199eba6b.png)

#### 3.4.2. Update index.js

[Example lambda function: cityapp using IAM authentication](/lambda-cityapp-sm.js)

https://github.com/joetanx/aws-rds-sm/blob/03a0e1ec0f15fbf936b629be40ec4682ac8f472a/lambda-cityapp-sm.js#L1-L38

Update `index.js` with the example code and select `Deploy`

![image](https://user-images.githubusercontent.com/90442032/230386307-31c14354-e9a7-403e-a79a-be5e99355b5a.png)

#### 3.4.3. Run test

Go to `Test` and click `Test`

(The template doesn't matter since the code doesn't require input)

![image](https://user-images.githubusercontent.com/90442032/229337109-de97c89d-2c72-4555-b8ff-eab7767429ac.png)

The output is exactly the same, but notice that the duration took **110ms** comprared to **45ms** because the secret retrieval takes some time

![image](https://user-images.githubusercontent.com/90442032/230386460-927d51d8-2f70-4ee3-8b82-079595f460e6.png)

## 4. API Gateway

### 4.1. Create REST API:

![image](https://user-images.githubusercontent.com/90442032/229339233-84ea0f6a-aa69-4fbd-9ca7-df489f815ded.png)

#### 4.1.1. Create method:

![image](https://user-images.githubusercontent.com/90442032/229341473-f5a6a9be-b7e1-4e9d-a2f5-37703239835f.png)

#### 4.1.2. Configure GET method to integrate with the Lambda function:

![image](https://user-images.githubusercontent.com/90442032/229341565-949b2a20-78c5-4516-972e-2978babf3252.png)

![image](https://user-images.githubusercontent.com/90442032/229339271-af9ddad2-e18a-4601-a346-2eb537eebf61.png)

#### 4.1.3. Verify method and test:

![image](https://user-images.githubusercontent.com/90442032/229341725-8313b6d6-3098-4801-882e-97db014261b4.png)

![image](https://user-images.githubusercontent.com/90442032/230387121-d032e567-1dcc-4f1e-a806-f3abbc2edc9d.png)

#### 4.1.4. Enable CORS:

☝️ In a production environment, do not set `Access-Control-Allow-Origin` to `*`, set it to allowed sources

![image](https://user-images.githubusercontent.com/90442032/229341889-4116e69f-656b-40db-b45e-45591cf96ea1.png)

![image](https://user-images.githubusercontent.com/90442032/229341918-5106e1f8-4372-4be8-9b2d-b219131fdaa8.png)

![image](https://user-images.githubusercontent.com/90442032/229341963-8cfa3aaf-c528-4580-94cc-742da99ceed9.png)

![image](https://user-images.githubusercontent.com/90442032/229341996-4c86f9e9-6943-414f-bd2b-b92886fc827e.png)

#### 4.1.5. Deploy the API:

![image](https://user-images.githubusercontent.com/90442032/229342039-9216c460-4588-46b2-b241-de855a7e74d9.png)

![image](https://user-images.githubusercontent.com/90442032/229339311-77c93f0b-dcdb-417e-b160-b5ccb483652a.png)

##### The API URL is displayed after deployment:

![image](https://user-images.githubusercontent.com/90442032/229342113-c03e5d0b-1b5b-409d-a715-06cea6f00ac3.png)

##### Test API access:

```powershell
PS C:\Users\Administrator> Invoke-RestMethod -Method Get -Uri 'https://oun0bu8mwf.execute-api.ap-southeast-1.amazonaws.com/dev' -ContentType application/json


City       : Dresden
Country    : Germany
District   : Saksi
Population : 476668
username   : cityapp-2
password   : Cyberark1
engine     : mysql
host       : jtan-rds.cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com
port       : 3306
dbname     : world
```

### 4.2. Test client end javascript access to API gateway

[Example javascript client page](https://github.com/joetanx/aws-rds-sm/blob/main/cityapp-client.html)

AJAX code segment:

https://github.com/joetanx/aws-rds-sm/blob/03a0e1ec0f15fbf936b629be40ec4682ac8f472a/cityapp-client.html#L24-L51

Example output:

![image](https://user-images.githubusercontent.com/90442032/230388585-f08106e1-2601-4232-9478-a9068a89cfde.png)

☝️ The html file can also be hosted as a S3 static website

> S3 static website requires public access to be allowed on the S3 bucket, which my AWS organization policy blocks
>
> Hence, I'm showing it as a local file

## 5. Examples for using RDS + Secrets Manager with EC2

### 5.1. Setup EC2 instance profile for Secrets Manager access

<https://github.com/joetanx/aws-rds-sm/blob/main/prepare-ec2.md>

### 5.2. Example: Python on EC2

<https://github.com/joetanx/aws-rds-sm/blob/main/ec2-python.md>

### 5.3. Example: Node.js on EC2

<https://github.com/joetanx/aws-rds-sm/blob/main/ec2-node.js.md>
