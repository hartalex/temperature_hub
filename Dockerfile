FROM mhart/alpine-node:7.5
RUN mkdir /root/temperature_hub
COPY . /root/temperature_hub/
WORKDIR /root/temperature_hub
RUN npm install
EXPOSE 80
ENTRYPOINT ["npm", "start"]
