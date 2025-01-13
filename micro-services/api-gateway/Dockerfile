# use an official node.js image as the base
from node:16

# copy package.json and package-lock.json (if available) into the container
copy package*.json ./

# install application dependencies
run npm install

# copy all source code into the container
copy . .

expose 8080

# start the app with node.js
cmd ["npm", "start"]
