FROM node:9-alpine
ARG COMMIT=local
ARG TAG=local
ENV COMMIT ${COMMIT}
ENV TAG ${TAG}
ENV CERT_NAME=${CERT_NAME}
ENV NODE_ENV production
RUN mkdir -p /root/temperature_hub/build
COPY ./build /root/temperature_hub/build
COPY ./src /root/temperature_hub/src
COPY ./package.json /root/temperature_hub/package.json
WORKDIR /root/temperature_hub
RUN npm install --prefix /root/temperature_hub
EXPOSE 3000
ENTRYPOINT ["npm","run", "serve"]
