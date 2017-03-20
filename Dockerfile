FROM mhart/alpine-node:7.5
RUN npm install --global yarn
RUN mkdir /root/temperature_hub
COPY . /root/temperature_hub/
WORKDIR /root/temperature_hub
RUN yarn
EXPOSE 80
ENTRYPOINT ["yarn", "start"]
