FROM mhart/alpine-node:8.1.3
RUN npm install --global yarn
RUN mkdir /root/temperature_hub
COPY . /root/temperature_hub/
WORKDIR /root/temperature_hub
RUN yarn
RUN yarn build
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["yarn", "start", ">>", "/var/log/temp_hub.log", "2>&1"]
