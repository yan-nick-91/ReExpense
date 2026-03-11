[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/EltonC06/Event-Planner/blob/main/LICENSE)


# ReExpense

## Description

A simple fullstack application that allows the user to track their income and expenses in realtime.

## Tech Stack

### Client

- Typescript
- React
- Vite
- Redux
- Tailwind
- Recharts

### Server

- Node TS
- Express
- TypeORM
- Sqlite3 (for testing)
- JWT
- NodeMailer (To generate an HTML page to send as email message)

## How to use

Clone this project by using `git clone <url of this project>`, to get the latest version of the main branch.

After cloning this project, use the command `npm install` or in shorthand `npm i`, in order to install all the required packages to run the application.

NOTE:

Make sure that you are in the project folder for npm install to work.
Simply use the following commands below:

- client: ```cd client```
- server: ```cd server```

## Env

Both the client and server sides are using env variables according to the examples below.

### client

```env
VITE_SERVER_URL='url to the backend'
```

### server

```env
PORT= 'Port of the server'
CLIENT_PORT= 'Port of the client'
JWT_SECRET= 'any string value will do, as long as this remains a secret to others'

NODE_ENV=development <- when set to development, the password reset URL is printed 
to the terminal instead of being sent via email, simulating the reset flow without 
sending an actual email

FRONTEND_URL=https://localhost:5173 <- since the frontend is using a special Vite tool 'mkcert', the link should start with https

MAIL_MODE=console

SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=no-reply@reexpense.com
SMTP_PASS='any string value will do, as long as this remains a secret to others'
```

### Running application

- client `npm run dev:front`
- server `npm run dev:back`
- both `npm run dev:all`

Note:

If for some reason the application does not run or any other issue has occurred, feel free to let me know.

Besides, as this is a hobby project, I assume that this application still contains some flaws that I might have missed.

In addition, this application was built for a learning experience.
