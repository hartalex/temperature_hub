FROM node:9-alpine
ARG COMMIT=local
ARG TAG=local
ENV COMMIT ${COMMIT}
ENV TAG ${TAG}
ENV NODE_ENV production
RUN mkdir -p /root/temperature_hub/build
COPY ./build /root/temperature_hub/build
COPY ./package.json /root/temperature_hub/package.json
WORKDIR /root/temperature_hub
RUN yarn install
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["yarn","run", "prodstart"]
