FROM mhart/alpine-node:8
ENV NODE_ENV production
RUN mkdir -p /root/temperature_hub/build
COPY ./build /root/temperature_hub/build
COPY ./views /root/temperature_hub/views
COPY ./package.json /root/temperature_hub/package.json
WORKDIR /root/temperature_hub
RUN npm install 
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["npm","run", "start", ">>", "/var/log/temp_hub.log", "2>&1"]
