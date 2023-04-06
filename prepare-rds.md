## 1. Setup

### 1.1. Create AWS RDS

![image](https://user-images.githubusercontent.com/90442032/226158645-6ade85e1-e898-4b1d-a99b-7ddb7f4ba3c2.png)

<details><summary><h4>1.1.1. Aurora (MySQL Compatible)</h4></summary>

![image](https://user-images.githubusercontent.com/90442032/229324103-b4b6e8ce-f95e-4373-9aa1-1a6a36efb2bb.png)

![image](https://user-images.githubusercontent.com/90442032/229324109-24a6dce6-6e2f-4c4f-aef2-7eb9d20abfcf.png)

![image](https://user-images.githubusercontent.com/90442032/229324117-4f688b6a-f5c4-46f5-9d87-a1ea7f90dd69.png)

![image](https://user-images.githubusercontent.com/90442032/229324124-0644c570-7ac2-4581-b0c4-e3be1dfb2484.png)

![image](https://user-images.githubusercontent.com/90442032/229324127-c58de7db-3a3d-4540-80fd-53d98b41ef41.png)

![image](https://user-images.githubusercontent.com/90442032/229324136-e4854808-17f6-468f-b1ce-e7edfc465242.png)

![image](https://user-images.githubusercontent.com/90442032/229324141-d37f5210-16ea-4e28-be9a-80ce14548a66.png)

![image](https://user-images.githubusercontent.com/90442032/229324144-17b10d79-585a-4a96-b806-888b96c470a5.png)

![image](https://user-images.githubusercontent.com/90442032/229324148-4a581a22-8b5d-4b8c-b64f-8ae553b2a50a.png)

</details>

<details><summary><h4>1.1.2. MySQL</h4></summary>

![image](https://user-images.githubusercontent.com/90442032/226158646-aa286119-6cff-46a3-9ef4-c951e3d6f3db.png)

![image](https://user-images.githubusercontent.com/90442032/226158649-18338594-f46b-411e-85f3-55a90db71820.png)

![image](https://user-images.githubusercontent.com/90442032/226158654-d1ee9959-393a-4687-ae93-89f0c90b2ed5.png)

![image](https://user-images.githubusercontent.com/90442032/226158658-ae069194-9f4f-4baa-8c83-ab0fe00d7397.png)

![image](https://user-images.githubusercontent.com/90442032/226158662-39ee9e59-e98c-44c7-abd8-c49354d93a11.png)

![image](https://user-images.githubusercontent.com/90442032/226158665-3008abb3-e692-4034-9816-75029220d8b9.png)

![image](https://user-images.githubusercontent.com/90442032/226158669-1dbfd6d2-6e01-4bcb-b20b-27d1dd2c9027.png)

![image](https://user-images.githubusercontent.com/90442032/226158670-b1964791-ec5d-47ac-97f1-f1f1d5bd2e85.png)

![image](https://user-images.githubusercontent.com/90442032/226158673-eee75474-0bf1-4ac9-be00-996aace439a0.png)

![image](https://user-images.githubusercontent.com/90442032/226158675-8221bf54-b6f1-4e8c-aa5d-75544380c1d9.png)

![image](https://user-images.githubusercontent.com/90442032/226158715-b2a4ac95-da92-48f0-b4b4-9760a27e2196.png)

</details>

### 1.2. Allow communication to RDS (security groups)

#### 1.2.1. By connecting an EC2 instance

This automatically creates security groups and add to both RDS and the selected EC2 instance

![image](https://user-images.githubusercontent.com/90442032/226161649-59262056-c015-439e-9df8-bef43345e428.png)

#### 1.2.2. By creating security group manually

This allows other services such as Lambda that are on the VPC subnet to access RDS

##### 1.2.2.1. Create security group

![image](https://user-images.githubusercontent.com/90442032/226178343-bbf25d6e-e5a8-483b-9995-533e3a4d83ab.png)

##### 1.2.2.2. Add security group to RDS

`Modify` the RDS and add the security group created

![image](https://user-images.githubusercontent.com/90442032/226178344-862e5a7d-63b7-4bb5-93b3-1247af0503e8.png)

### 1.3. Create dbuser and setup world database

Download MySQL sample world database:

```console
curl -L -O https://downloads.mysql.com/docs/world-db.tar.gz
tar xvf world-db.tar.gz
```

Login to RDS with master password `mysql -h jtan-rds.cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com -u admin -p<redacted>`

Create database account and grant `admin` permissions to account:

(For production best practice, define permissions only permissions that the account requires)

```console
CREATE USER 'cityapp-2'@'%' IDENTIFIED BY 'Cyberark1';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, PROCESS, REFERENCES, INDEX, ALTER, SHOW DATABASES, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER ON *.* TO 'cityapp'@'%';
SOURCE ~/world-db/world.sql
```
