## 1. Create secret for RDS account

#### Select `Credentials for other database` for  `Secret type`

![image](https://user-images.githubusercontent.com/90442032/230286935-78b8edd9-4888-4308-9b9c-f0bb91487c8b.png)

#### Enter username and password for the account created earlier

![image](https://user-images.githubusercontent.com/90442032/230286865-a26c72fe-da4d-47c0-b48e-9f0d91e34fbe.png)

#### Select an encryption key for the secret

![image](https://user-images.githubusercontent.com/90442032/230287180-f2999aa6-40a1-4e80-b3b3-89a04a4d9fc8.png)

#### Enter the database details of the RDS

![image](https://user-images.githubusercontent.com/90442032/230287417-7722e594-d639-4fcc-8e97-34d0c7668809.png)

#### Give the secret a name

![image](https://user-images.githubusercontent.com/90442032/230287512-f34c14e5-1479-4abf-a530-40ebb352cdec.png)

#### Other details are not required

![image](https://user-images.githubusercontent.com/90442032/230288100-cbedf0a1-0091-4db8-8938-08efcde4efb0.png)

![image](https://user-images.githubusercontent.com/90442032/230288055-980e1acf-725f-4400-b270-3cb4be6c87e5.png)

## 2. Create VPC endpoint for Secrets Manager

The VPC endpoint for Secrets Manager is required because the Lambda function needs to access the RDS in the VPC

Lambda in VPC does not has access to internet, even if it's in a public subnet; AWS Secrets Manager is on the internet

Ref: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html

One way is to place the Lambda in a private subnet and create a NAT gateway

Another way is to create a VPC endpoint for Secrets Manager

Ref: https://aws.amazon.com/blogs/security/how-to-connect-to-aws-secrets-manager-service-within-a-virtual-private-cloud/

#### Configure the VPC endpoint for Secrets Manager

![image](https://user-images.githubusercontent.com/90442032/230291606-64d65c69-22f5-45b8-b6da-3d6ecc6c14d8.png)

#### Select the VPC

![image](https://user-images.githubusercontent.com/90442032/230292009-660f455e-e708-4fde-9f70-083c65e5eb07.png)

#### Select subnet and security group

![image](https://user-images.githubusercontent.com/90442032/230292147-cadc0de8-10eb-45c5-afaa-b1ba27634bf7.png)

#### Configure access control to the VPC endpoint as necessary

![image](https://user-images.githubusercontent.com/90442032/230292278-e18bdbbe-d2b8-4bd6-aea3-5780698c76ca.png)

## 3. Create IAM policy for Secrets access

The IAM policy is used to grant permission to a principal to access secrets in Secrets Manager

The `secretsmanager:*` example below grants permissions to all secrets, grant only permissions to the exact secret in actual environments

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "secretsmanager:*",
            "Resource": "*"
        }
    ]
}
```

![image](https://user-images.githubusercontent.com/90442032/230293371-cd0ffce2-4e81-4908-8dc3-b40020b2db02.png)

![image](https://user-images.githubusercontent.com/90442032/230293416-f958eefb-e347-4fad-8576-e20098b12a91.png)
