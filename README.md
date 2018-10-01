# Budge It
(Still in development)

_Budge It_ is a website  that can help you stay on top of your monthly bills.

When the devlopment is complete, this site will tell you the amount of money to set aside each day to have enough for your bills.

## Installation:

- Clone this  directory.
- Navigate to the Budge-it Folder
- Go to the config folder and edit the config.json with your SQL password.
{
  "development": {
    "username": "root",
    "password": "**your_password**",
    "database": "expenses_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
- In Sequel, Create a DB with the following command:
**create expenses_db;**

- In your terminal, Navigate to the Budge-it Folder and type the following to initiate the site:
**npm i**
**npm run dev**

- Run the site on your local server in your browser on: localhost:3000

## Contributers

[Geoff Dotson](https://github.com/dcryptOG/) --- [Chris Milan](https://github.com/chris-milan) ---  [Paul Rydberg](https://github.com/paulrydberg)