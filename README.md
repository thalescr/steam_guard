# Steam Guard Lambda

This is a simple AWS Lambda function made to retrieve the TOTP code of a Steam account using it's secret.

Secrets are stored within the environment variables with a name like ''AUTH\_**(ACCOUNT ID)**''.

Use a POST request like this to retrieve the access code:

```
{
    "account_id": **ACCOUNT_ID used to store the secret**
}
```
