FROM node:10.6-alpine

RUN apk update

# Create app directory
WORKDIR /var/www/bachelor/

RUN ls -al

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY ../package*.json ./

# muss manuell geschehen
# RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
# bauche ich nicht, da ich volume habe
# COPY . .

# EXPOSE 8080

CMD [ "npm", "start" ]
