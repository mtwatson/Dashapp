FROM node:18.10-alpine3.15
# FROM node:16.15.0-alpine
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node ./ ./

RUN npm i
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

USER node
CMD ["npm", "run", "serve"]
# CMD ["npm", "run", "start"]

# sudo docker build -f Dockerfile -t client .