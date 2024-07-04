
# Task Managment System

## Description
The Task Management System is a web application designed to help users manage their task data efficiently. It provides functionalities for creating and deleting tasks, as well as pagination to navigate through multiple tasks.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MySQL, Sequelize ORM
- **Testing:** Jest

## Installation

Clone the repository

git clone https://github.com/Mery521/task_managment.git

cd task-management-system

## Backend side
Create a .env file from the .env.example
### .ENV Example:

PORT=3000

SECRET_KEY=my_secret_key

DB_USERNAME=root

DB_PASSWORD=

DB_DATABASE=task-management

DB_HOST=127.0.0.1

DB_DIALECT=mysql

### Installation
$ npm install

$ npm start

### Run migrations
npx sequelize-cli db:migrate
### Run seeder
npx sequelize-cli db:seed:all
### Run Tests
- **Run All Tests:** npx jest
- **Run Specific Test Files:** npx jest auth/auth.login.test.js    

