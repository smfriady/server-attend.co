# API Documentation Attend.co

## Endpoints :

List of available Employees endpoints:

- `POST /api/v1/web/employees`
- `GET /api/v1/web/employees`
- `GET /api/v1/web/employees/:id`
- `PUT /api/v1/web/employees/:id`
- `DELETE /api/v1/web/employees/:id`

List of available Departments endpoints:

- `GET /api/v1/web/departments`

List of available Roles endpoints:

- `GET /api/v1/web/roles`

List of available Attendances endpoints:

### 1. POST /api/v1/web/employees

#### Description

- Create a new employee data

#### Request

- Body

```json
{
  "first_name": String,
  "last_name": String,
  "nik": Integer,
  "education": Integer,
  "birth_date": Date,
  "email": String,
  "password": String,
  "base_Salary": Integer,
  "department_id": Integer,
  "role_id": Integer,
  "img_profile": String
}
```

_201 - Created_

- Body

```json
{
  "message": "Employee with email ${employee.email} created successfully"
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "message": "first name is required"
}
OR
{
  "code": 400,
  "message": "last name is required"
}
OR
{
  "code": 400,
  "message": "nik is required"
}
OR
{
  "code": 400,
  "message": "education is required"
}
OR
{
  "code": 400,
  "message": "image profile is required"
}
{
  "code": 400,
  "message": "birth_date is required"
}
OR
{
  "code": 400,
  "message": "email is required"
}
OR
{
  "code": 400,
  "message": "password is required"
}
OR
{
  "code": 400,
  "message": "password min 6 character"
}
OR
```

### 2. GET /api/v1/web/employees

#### Description

- Get all the Employees data include Department data and Role data.

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
   "total": Integer,
   "employees": [
      {
        "id": Integer,
        "first_name": String,
        "last_name": String,
        "nik": String,
        "education": String,
        "img_profile": String,
        "birth_date": String,
        "email": String,
        "base_salary": Integer,
        "Department": {
            "name": String
              },
        "Role": {
            "name": String
              }
     },
      ...
    ]
},
```

### 3. GET /api/v1/web/employees/:id

#### Description

- Get all the Employees data include Department data and Role data based on given id

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
    "first_name": String,
    "last_name": String,
    "nik": String,
    "education": String,
    "img_profile": String,
    "birth_date": String,
    "email": String,
    "base_salary": Integer,
    "Department": {
       "name": String
     },
    "Role": {
        "name": String
    }
},
```

_404 - Not Found_

- Body

```json
{
  "code": 404,
  "message": "no data found"
}
```

### 4. PUT /api/v1/web/employees/:id

#### Description

- Update a employee data based on given id

#### Request

- Body

```json
{
  "first_name": String,
  "last_name": String,
  "nik": Integer,
  "education": Integer,
  "birth_date": Date,
  "email": String,
  "password": String,
  "base_Salary": Integer,
  "department_id": Integer,
  "role_id": Integer,
  "img_profile": String
}
```

_201 - Created_

- Body

```json
{
  "message": "employee with email {employee.email} has been updated"
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "message": "first name is required"
}
OR
{
  "code": 400,
  "message": "last name is required"
}
OR
{
  "code": 400,
  "message": "nik is required"
}
OR
{
  "code": 400,
  "message": "education is required"
}
OR
{
  "code": 400,
  "message": "image profile is required"
}
{
  "code": 400,
  "message": "birth_date is required"
}
OR
{
  "code": 400,
  "message": "email is required"
}
OR
{
  "code": 400,
  "message": "password is required"
}
OR
{
  "code": 400,
  "message": "password min 6 character"
}
OR
```

_404 - Not Found_

- Body

```json
{
  "code": 404,
  "message": "no data found"
}
```

### 5. DELETE /api/v1/web/employees/:id

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
  "message": "employee with email ${employee.email} deleted successfully"
}
```

_404 - Not Found_

- Body

```json
{
  "code": 404,
  "message": "no data found"
}
```

### 6. GET /api/v1/web/departments

#### Description

- Get all the Departmens data

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

### 7. GET /api/v1/web/roles

#### Description

- Get all the Role data

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

## Global Error

_Response (403 - Internal Server Error)_

```json
{
  "code": 403,
  "message": "Not authorized as an admin"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "code": 500,
  "message": "Internal server error"
}
```
