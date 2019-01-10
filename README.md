**eynos-app-node-v11**

## Topics

1. NODEJS -V 11.5.0
2. NPM -V 6.4.1
3. MongoDB -V 4.0.3
4. JWT - jsonwebtoken
5. Express

*project structure*

```
backend-challenge-nodejs-mongodb
.
|
├── client /*files*/
|
└── controllers
│       ├── balanced.js
│       └── users.js          
|
├── lib
│     └── helpers.js
|
├── middleware
|     |
│     └── auth.js
|
├── models
│     └── user.js
|
|── app.js
|
├── README.md
|
└── package.json

```
---

## Start Server

 NODE_ENV=development npm start || NODE_ENV=development node app.js



---

## APIs
## Use headers: { 'Authorization':  Bearer +token }

  * http://localhost:8080/api/user/signup -- Register a New User

  * http://localhost:8080/api/user/login -- login

  * http://localhost:8080/api/user/listusers -- get all Users

  * http://localhost:8080/api/user/:id --  delete Users

  **validate give input**

  * http://localhost:8080/balanced

  * http://localhost:8080/balanced2
