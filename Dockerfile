FROM mhart/alpine-node:7.5 
RUN mkdir /root/temperature_hub
COPY . /root/temperature_hub/
WORKDIR /root/temperature_hub
RUN echo "* * * * *  node /root/temperature_hub/pollingService.js >> /var/log/tp.log 2>&1 " >> /etc/crontabs/root
RUN npm install
EXPOSE 80 8811
ENTRYPOINT ["npm", "start", "&&", "crond", "-f"]

