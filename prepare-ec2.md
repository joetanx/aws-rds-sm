## 1. EC2 instance connection to Secrets Manager

<details><summary><h3>1.1. Create EC2 instance</h3></summary>

![image](https://user-images.githubusercontent.com/90442032/226159252-c55c852d-4623-4fe9-9ffd-cd255872e6ea.png)

![image](https://user-images.githubusercontent.com/90442032/226159265-c1c184e8-4483-4824-ad9b-19ac13206c22.png)

![image](https://user-images.githubusercontent.com/90442032/226159279-556629f1-935e-414c-8ff6-a47515eb2477.png)

![image](https://user-images.githubusercontent.com/90442032/226159289-243f29ae-3382-4fc0-a636-225ef32d2b99.png)

![image](https://user-images.githubusercontent.com/90442032/226159397-e57e6c67-83a0-441d-97b6-70cabcdec363.png)

![image](https://user-images.githubusercontent.com/90442032/226159412-36f5de4e-c20b-4fee-8b59-f290ec36a130.png)

</details>

### 1.2. Setup EC2 instance profile

#### 1.2.1. Create IAM role

![image](https://user-images.githubusercontent.com/90442032/226161350-cafd392b-a052-4843-ac1d-41586087e35c.png)

![image](https://user-images.githubusercontent.com/90442032/230296929-c48f9720-5a0d-4b9a-8958-d12851112545.png)

![image](https://user-images.githubusercontent.com/90442032/230297070-37a8a3fe-97b2-4fe9-84a7-1e1d5abea10e.png)

#### 1.2.2. Attach IAM role to EC2 instance profile

Right-click instance → Security → Modify IAM Role

![image](https://user-images.githubusercontent.com/90442032/230298681-1fb750cd-aea6-499e-8c8e-d076f581ba5e.png)

### 1.3. Test secrets retrieval

Sample python retrieval:

https://github.com/joetanx/aws-rds-sm/blob/7029ae9e90bd7517acb7c1f11de6be0e84cbc5cc/ec2-print-secret.py#L1-L11

Output:

```console
[root@ip-192-168-94-94 ~]# python print-secret.py
{'username': 'cityapp-2', 'password': 'Cyberark1', 'engine': 'mysql', 'host': 'jtan-rds.cusiivm6n9hm.ap-southeast-1.rds.amazonaws.com', 'port': '3306', 'dbname': 'world'}
```
