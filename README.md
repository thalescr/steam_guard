# Steam Guard

This is a simple CLI app made to retrieve the TOTP code of a Steam account using it's secret. It can also be published on AWS Lambda to be used as an REST API.

First install the required version of Node using `nvm install` then the dependencies using `npm i`.

Secrets are stored within the environment variables with a name like ''AUTH\_**(ACCOUNT ID)**''.

Use the ACCOUNT ID **1** to keep the default Steam Account secret and run the command `npm run totp` to retrieve your Steam TOTP code.

To use it as a REST API, send a POST request like this to retrieve the access code:

```
{
    "account_id": **ACCOUNT_ID used to store the secret**
}
```
