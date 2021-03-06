FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# USED_PORT variable is port number that will be used by this container
ARG USED_PORT=35771

# change DB_URI and AUTH_URI value to "host.docker.internal" if you want to deploy and test in development environment
# change DB_URI value to "db" if you want to deploy to production environment
# change AUTH_URI value to "auth" if you want to deploy to production environment
ENV DB_URI=host.docker.internal \
    DB_NAME=lybshelf_db \
    DB_PORT=27017 \
    AUTH_URI=host.docker.internal \
    AUTH_PORT=35771 \
    API_PORT=${USED_PORT}

EXPOSE ${USED_PORT}

CMD ["npm", "start"]