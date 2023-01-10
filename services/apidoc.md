# API Documentation Attend.co

## Endpoints :

List of available Auth endpoints:

- `POST /api/v1/web/auth/login`

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

- `POST /api/v1/mobile/attendances`
- `GET /api/v1/mobile/attendances`
- `GET /api/v1/mobile/attendances/:id`
- `PATCH /api/v1/mobile/attendances/:id`

### 1. POST /api/v1/web/auth/login

#### Description

- Process to access web app and mobile app

#### Request

- Body

```json
{
  "email": String,
  "password": String,
}
```

#### Response

_200 - OK_

- Body

```json
{
  "access_token": String,
  "email": String,
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "message": "email is required"
}
OR
{
  "code": 400,
  "message": "password is required"
}
```

_401 - invalid_credentials_

- Body

```json
{
  "code": 401,
  "message": "invalid email or password"
}
```

### 2. POST /api/v1/web/employees

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

### 3. GET /api/v1/web/employees

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

### 4. GET /api/v1/web/employees/:id

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

### 5. PUT /api/v1/web/employees/:id

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

_200 - Created_

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

### 6. DELETE /api/v1/web/employees/:id

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

### 7. GET /api/v1/web/departments

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

### 8. GET /api/v1/web/roles

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

### 9. POST /api/v1/mobile/attendances

#### Description

- Create a new Attendance data for employee check in

#### Request

- Body

```json
{
  "check_in_time": Date,
  "attendance_type": String,
  "latitude": Float,
  "longitude": Float,
  "attachment": String,
}
```

_201 - Created_

- Body

```json
{
  "message": "${employee.first_name} has been check in"
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "message": "wrong attendance type"
}
OR
{
  "code": 400,
  "message": "latitude is required"
}
OR
{
  "code": 400,
  "message": "longitude is required"
}
OR
{
  "code": 400,
  "message": "attachment is required"
}
```

### 10. PATCH /api/v1/mobile/attendances

#### Description

- Update attendance data for employee check out.

#### Request

- Body

```json
{
  "check_out_time": Date,
  "attendance_type": String,
}
```

_201 - Created_

- Body

```json
{
  "message": "${employee.first_name} has been check out with status ${attendance_type}"
}
```

_400 - Bad Request_

- Body

```json
{
  "code": 400,
  "message": "wrong attendance type"
}
```

### 11. GET /api/v1/mobile/attendances

#### Description

- Get all the Attendance data based employees login.

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
    "check_in_time": Date,
    "check_out_time": Date,
    "attendance_type": ENUM ( ["absent", "attendance", "sick", "permit"],),
    "attachment":String,
    "employee_id": Integer,
    "Employee": {
      "id": Integer,
      "first_name": String,
      "last_name": String,
      "nik": String,
      "education": String,
      "img_profile": String,
      "birth_date": Date,
      "email": String,
      "password": String,
      "base_salary": Integer,
      "department_id": Integer,
      "role_id": Integer
    }
  }
    ...
]
```

### 12. GET /api/v1/mobile/attendances/:id

#### Description

- Get Attendance data employees login based on given attendance id.

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
  "check_in_time": Date,
  "check_out_time": Date,
  "attendance_type": ENUM ( ["absent", "attendance", "sick", "permit"],),
  "attachment":String,
  "employee_id": Integer,
  "Employee": {
    "id": Integer,
    "first_name": String,
    "last_name": String,
    "nik": String,
    "education": String,
    "img_profile": String,
    "birth_date": Date,
    "email": String,
    "password": String,
    "base_salary": Integer,
    "department_id": Integer,
    "role_id": Integer
  }
}
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
