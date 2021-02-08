# Backend API - Sejutacita . id
Rest Api Service Backend dibangun menggunakan NodeJS(ExpressJS) , MySql dan Redis sebaga data storage

# Running On Minikube
## Requirement
- Minikube installed
- kubectl installed

## How to running
- deploy to minkube
>  $ kubectl apply -f kube-deploy.yaml

- running migration and seeding on your backend pod with :
> $ sequelize db:migrate 
  
> $ sequelize db:seed:all
* if error "sequelize command not found" install sequelize cli with this command :
> $ npm install -g sequelize-cli

- run the backend service on minikube with
> $ minikube service backend

you will get a port to access the API 
    

# Local Running

## Requirement
- local redis on port 6379
- NPM version 6.90

## Instalasi
- install package
>  $ npm install
- copy environment
> $ cp .example.env .env

config .env with your data

## migrate db
> $ sequelize db:migrate

## seeding
>$ sequelize db:seed:all

## Running
>$ npm run start



# Credential to Login
- username : admin_sejutacita or admin@sejutacita.id
- password : admin

# Postman Collection :
Download Postman Collection [here](https://raw.githubusercontent.com/prasetiyo28/sejutacita-backend/main/SEJUTACITA.postman_collection.json)

# Diagram Flow
![diagram flow](https://raw.githubusercontent.com/prasetiyo28/sejutacita-backend/main/flowchart.jpg)
