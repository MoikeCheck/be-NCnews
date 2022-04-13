# ZestNews - API.

Hosted version: https://zestnews.herokuapp.com/

## My goal for this project was to build a back-end API for my news app front-end project

For this project I've created a RESTful API where I make use of tools such as Node.js, Jest, Express, Supertest and PostgeSQL. The client performs GET, POST, PATCH and DELETE requests using the data stored.


## Instructions

1. Clone the repository

2. Install dependencies with npm install (or yarn)

    ` npm install`

3. You will need to create two .env files, .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

    .env.development

    ` PGDATABASE=nc_news`

     .env.test

   ` PGDATABASE=nc_news_test`

4. Seed local database

   `npm run setup-dbs`

5. Run tests with

   `npm test`

6. Start server with

   `npm start`

## Minimum requirements

Node.js: v17.3.0

Postgres: 14.1
