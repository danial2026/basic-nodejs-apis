# Basic NodeJS APIs


Basic implementation of NodeJS Express and Websocket with Clients for testing

|       Service         |         Url                |   Port    |
|:---------------------:|:--------------------------:|:---------:|
| express APIs (list)   |        /api/v1/list        |   3001    |
| websocket             |        /ws                 |   8077    |


## Express
### run Express server
```bash
node src/server.js 
```

### run Express client tests
> tests are written using curl
```bash
bash clients/express/curl 
```

---

## Websocket
### run Websocket server
```bash
node src/server.js 
```

### run Websocket client tests
```bash
bash clients/express/curl 
```


## Generate a token in the jwt.io by using the following inputs:
### HEADER: ALGORITHM & TOKEN TYPE
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
### PAYLOAD: DATA
```json
{
  "sub": "1",
  "username": "danial",
  "iat": 1516239022
}
```
### VERIFY SIGNATURE
```
HMACSHA256(
  base64UrlEncode(header) + "." + 
  base64UrlEncode(payload),
  s3cu73-c0$3
)
```