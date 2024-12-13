FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ARG REACT_APP_BACKEND_ENDPOINT
ENV REACT_APP_BACKEND_ENDPOINT=$REACT_APP_BACKEND_ENDPOINT

RUN yarn run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 