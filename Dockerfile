FROM node:18-bullseye-slim

LABEL maintainer="Gaurav Singh <gauravsinghgzp83@gmail.com>"

WORKDIR /vehicle-tracker/

WORKDIR /vehicle-tracker/vehicle_tracker_webui
COPY ./vehicle_tracker_webui/package.json .
RUN npm install --location=project

WORKDIR /vehicle-tracker/vehicle_tracker_api
COPY ./vehicle_tracker_api/package*.json .
RUN npm ci --location=project

WORKDIR /vehicle-tracker/
