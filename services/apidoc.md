# API Documentation

## Endpoints :

List of available endpoints:

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `POST /attendances`
- `POST /permits`
- `GET /permits`
- `DELETE /permits`
- `GET /logs`
- `GET /logs/:id`

## Global Error

````
_Response (403 - Internal Server Error)_

```json
{
  "message": "Not authorized as an admin"
}
````

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
