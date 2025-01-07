# Gophir API
This repository stores the source code of the Gophir API. Here you can find out how the authentication and the client/server communication works.

## Auth
The auth was made using JWT as a passport token and those are the api routes:

### /api/auth/authenticate
The authenticate route requires the following request body:
```json
{
    "username": "the username of the user",
    "password": "the password"
}
```

If the authenticate request gets authorized, you will receive this response:
```json
{//status = accepted
    "code": "accepted",
    "passport": "your passport"
}
```
Otherwise, if an error occur and you gets refused, you may receive those errors:
- In case of your username being invalid:
```json
{//status = unauthorized
    "code": "invalid_username",
    "message": "a more detailed explanation"
}
```
- In case of your password is wrong:
```json
{//status = unauthorized
    "code": "invalid_password",
    "message": "a more detailed explanation"
}
```

### /api/auth/register
The register route requires the following request body:
```json
{
    "username": "the username of the user",
    "password": "the password"
}
```

If the register request gets authorized, you will receive this response:
```json
{//status = created
    "code": "created",
    "passport": "your passport"
}
```
Otherwise, if an error occur and you gets refused, you may receive those errors:
- In case of your username is occupied by another user:
```json
{//status = unauthorized
    "code": "invalid_username",
    "message": "a more detailed explanation"
}
```
