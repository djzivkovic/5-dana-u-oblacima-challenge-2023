# Player Stats Service
This project is a simple Node.js application that provides player statistics using an Express.js server and a Redis database. The application reads player stats from a CSV file, performs data parsing and manipulation, and exposes an API endpoint to retrieve player statistics.

## Environment Setup

### Prerequisites

- Docker

### Building and Running
Navigate to the directory containing the Docker Compose file.

Run the following command to build and start the containers:

```
docker compose up --build
```

This command will build the Node.js application image and the Redis image, then start the containers.

Access the Player Stats Service at http://localhost:4000/.

### Example Usage

```
GET /stats/player/:name
```
## Used Technologies

### Environment

Node.js: A JavaScript runtime for server-side development.

Docker: A platform that enables the deployment of applications within lightweight, portable containers.

Redis: An in-memory data structure store used for caching player statistics.

### Libraries

Express.js: A web application framework for Node.js.

ioredis: A Redis client library for Node.js.

CSV Parse: CSV parser for Node.js.

## Configuration

`PORT`: Port on which the Express.js server will run.

`REDIS_HOST`: Hostname of the Redis database.

`REDIS_PORT`: Port on which the Redis database is running.

## Author

Djordje Zivkovic

