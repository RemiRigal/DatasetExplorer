FROM ubuntu:16.04
# Build with
#    docker image build --network host -t dataset-explorer-backend:v1.0 .
# Start with
#    docker run -it --rm dataset-explorer-backend:v1.0 /bin/bash

MAINTAINER Rémi Rigal "remi.rigal@ensta-bretagne.org"

RUN apt-get update -y && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update -y && \
    apt-get install -y \
        python3.7 \
        python3.7-dev \
        python3-pip \
        python3-dev \
        python3-setuptools \
        ffmpeg \
        libav-tools \
        libsm6 \
        libxext6 \
        libxrender-dev \
        cmake \
        build-essential

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN python3.7 -m pip install --upgrade pip && \
    python3.7 -m pip install --upgrade setuptools && \
    python3.7 -m pip install -r requirements.txt

COPY . /app

RUN mkdir /data

RUN mkdir /plugins && \
    touch /plugins/requirements.txt

ENV DATASET_EXPLORER_ROOT /data
ENV DATASET_EXPLORER_PLUGINS /plugins

EXPOSE 5000

CMD [ "python3.7", "-m", "pip", "install", "-r", "/plugins/requirements.txt", "&&", "python3.7", "app.py" ]
