FROM node:current-alpine3.16
WORKDIR /app
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node ./ ./

RUN npm i
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

USER node
CMD ["npm", "run", "serve"]

# sudo docker build -f Dockerfile -t client .