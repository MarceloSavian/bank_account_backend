# Instalation Tutorial

## Packages

Command to add all packages dependencies

> npm install

## Database Config

For database config you have to go to the following file

> src/main/config/env.ts

There you can config your mongoUrl, to your localhost or any other url to your MongoDB database

You also have to run migrations, you can se how [here](./migrations)

## Port Config

You can change the port the project will run in

> src/main/config/env.ts

There you can config **port** 

## Build

Build project for tests and production, make sure you have all configs set

> npm run build

## Run Project

For run the project you can run the following command

> npm run start

## Debug

You can debug the project with command

> npm run debug