# API Documentation

## Endpoints :

List of available employees endpoints:

- `POST /employees`
- `GET /employees`
- `GET /employees/:id`
- `PUT /employees/:id`
- `DELETE /employees/:id`

List of available roles endpoints:

- `POST /roles`
- `GET /roles`
- `PUT /roles/:id`
- `DELETE /roles/:id`

### 1. POST /employees

#### Description

- Create a new employee data

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
    "role_id": Integer,
    "profile_id": Integer,
  }
  ```

_201 - Created_

- Body
  ```json
  {
    "id": INTEGER,
    "email": STRING
  }
  ```

_400 - Bad Request_

- Body
  ```json
    {
      "message": "email is required"
    }
    OR
    {
      "message": "email address already registered"
    }
    OR
    {
      "message": "invalid format email address"
    }
    OR
    {
      "message": "password is required"
    }
    OR
    {
      "message": "password minimum 6 characters"
    }
  ```

### 2. GET /employees

#### Description

- Get all the Employees data column id, email, password, include Roles data column name and include Profiles column firstname, lastname, nik, birth_date, education, img_profile

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": Integer,
        "email": String,
        "password": String,
        "Roles": {
            "name": String
        },
        "Profiles": {
            "firstname": String,
            "lastname": String,
            "nik": String,
            "birth_date": Date,
            "education": String,
            "img_profile": String
        }
    },
      ...
  ]
  ```

### 3. GET /employees/:id

#### Description

- Get Employees data column id, email, password, include Roles data column name and include Profiles column firstname, lastname, nik, birth_date, education, img_profile based on given id

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
   {
        "id": Integer,
        "email": String,
        "password": String,
        "Roles": {
            "name": String
        },
        "Profiles": {
            "firstname": String,
            "lastname": String,
            "nik": String,
            "birth_date": Date,
            "education": String,
            "img_profile": String
        }
    },
  ```

  _404 - Not Found_

- Body
  ```json
  {
    "message": "data not found"
  }
  ```

### 4. PUT /employees

#### Description

- Update a employee data based on given

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String,
    "role_id": Integer,
  }
  ```

_201 - Created_

- Body
  ```json
  {
    "message": "employee with id {id} has been updated"
  }
  ```

_400 - Bad Request_

- Body
  ```json
    {
      "message": "email is required"
    }
    OR
    {
      "message": "email address already registered"
    }
    OR
    {
      "message": "invalid format email address"
    }
    OR
    {
      "message": "password is required"
    }
    OR
    {
      "message": "password minimum 6 characters"
    }
  ```

### 5. DELETE /employees/:id

#### Description

- Remove a employee data based on given id

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "employees success to delete"
  }
  ```
  _404 - Not Found_
- Body

  ```json
  {
    "message": "data Not found"
  }
  ```

### 6. POST /roles

#### Description

- Create a new role data

#### Request

- Body
  ```json
  {
    "name": String,
  }
  ```

_201 - Created_

- Body
  ```json
  {
    "id": INTEGER,
    "name": STRING
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": "role name is required"
  }
  ```

### 7. GET /roles

#### Description

- Update a roles data based on given id

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "id": Integer,
        "name": String
    },
      ...

  ]
  ```

### 8. PUT /roles/:id

#### Description

- Update a products data based on given id

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "name": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "roles has been updated"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "role name is required"
  }
  ```

### 9. DELETE /roles/:id

#### Description

- Remove a role data based on given id

#### Request

- Headers
  ```json
  {
    "access_token": string
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "role success to delete"
  }
  ```
  _404 - Not Found_
- Body

  ```json
  {
    "message": "data Not found"
  }
  ```

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

- `POST /attendances`
- `POST /permits`
- `GET /permits`
- `DELETE /permits`
- `GET /logs`
- `GET /logs/:id`
