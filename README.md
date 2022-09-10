# Introduction
LearningPath is a platform where users can find and share learning curricula.

[View Live](http://34.234.173.82/)

## Index

- [About](#about)
- [Usage](#usage)
  - [Installation](#installation)
  - [Commands](#commands)
  - [File Structure](#file-structure) 
- [Technology Used](#technology-used)
- [Credit/Acknowledgment](#creditacknowledgment)

## About
A labor of love, thanks for stopping by. The learning experience Akmal and I had building this was second to none. This started as a conversation the two of us had about a problem we were going through in terms of learning. There was just so much content and not enough focused paths, and just like that, Learning Path was born. The difficulties of learning are vast; the abundance of information complicates matters. Through Learning Path, you're offered an opportunity to learn in a structured way. Your journey through Learning Path starts with signing up. From there you'll be brought to a users profile page where you'll have the opportunity to create your first path toward learning or viewing recent paths that other users have created. You'll have the opportunity to edit, delete, and update all data from any level. Forgot password? Not a problem, we've used Nodemailer to ensure all information can be handled in an effective and efficient manner.
With peer programming sessions and none-stop communication, we were able to go from Entity Relationship Diagrams and Wireframes -> MVP -> Live!

### Installation
1. Create `.env` file and include following:
```
MYSQL_PASSWORD=DATABASE_PASSWORD
jwtSecurity=RANDOM_WORD
EMAIL_LOGIN=GMAIL
EMAIL_PASSWORD=GMAIL_APP_PASSWORD
```
This project at its current state utilizes Nodemail to send emails through Gmail. You will need to generate an App password in the Google account settings.
2. Edit `/config/dbConfig.js` file to configure a database connection.
3. Run `npm run dev` to run both the backend server and the client side.

### Commands
`npm run lint` - Run the linter and fix issues.


### File Structure
`/server.js` - Server initialization.

`/models/` - Database models.

`/controllers/` - API route controllers.

`/config/dbConfig.js` - Database configuration.

`/client/src/App.js` - Frontend entry point.

`/client/src/utils/api.js` - Axios connections configuration.

`/client/src/store.js` - Redux store.

`/client/src/slices/` - Redux slices.

##  Technology Used

#### Server-side

Express, Express Validator, JsonWebToken, Bcryptjs, Nodemailer, Mysql2, Sequelize, Dotenv

#### Client-side

Redux Toolkit, Axios, React Hook Form, React Router Dom, Sass

## Credit/Acknowledgment
This full stack web application was built by [Brandon Grant](https://github.com/Grantb2134/) & [Akmal Urunboev](https://github.com/dandavisjs)
