# Drawing App Server

---

## Prerequisite

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [make](https://www.gnu.org/software/make/)

- [drawing-app-client](https://github.com/dennzimm/drawing-app-client)

## Preparations

- **run** `make sh setup.sh`
- **fill** the `.env`-files (**in project root & /prisma**) with your configuration or leave it as it is (_default configurations_)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**~~ OR ~~**

- **copy** `example.env` to `.env` (**project root**)
- **copy** `example.env` to `.env` (**/prisma**)
- **fill** the `.env`-files (**in project root & /prisma**) with your configuration or leave it as it is (_default configurations_)

## How to run this project (in production mode)

- **run** `make start` **or** `docker-compose up -d --build`
- **open** the browser and go to `http://localhost:5000` to see the **app**
- **open** the browser and go to `http://localhost:5000/graphql` to see the **GraphQL-Playground**

## How to stop this project

- **run** `make stop` **or** `docker-compose stop`
