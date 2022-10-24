# Dashapp
Modern containerized React dashboard w/ Express.js backend and Mysql2 database


# Steps to build container
## Hard Delete Docker Containers
docker rm $(docker ps -a -f status=exited -q)

## Hard Delete Docker Images
docker rmi -f $(docker images -aq)

## Kill All
docker system prune -f

## Salt the Earth/Delete Volume Data
docker volume prune -f

## Build & Run
docker-compose up --build

# For Docker Desktop & Newer Docker Versions
docker compose up --build