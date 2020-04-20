FROM node:12.16.1
# Build with
#    docker image build --network host -t dataset-explorer-frontend:v1.0 .
# Start with
#    docker run -it --rm dataset-explorer-frontend:v1.0 /bin/bash

MAINTAINER Rémi Rigal "remi.rigal@ensta-bretagne.org"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install && \
    npm install -g @angular/cli@9.1.0

COPY . /app

RUN npm run build

CMD [ "ng", "serve" , "--host", "0.0.0.0" ]
