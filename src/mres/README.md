# explorer

> vChain Explorer

## Build Setup

``` bash
# install nvm
brew install nvm

# install node.js using nvm
nvm install v7.7.1

# use a specific version node
nvm use v7.7.1

# install yarn
brew install yarn

# install dependencies
yarn install

#install production server
npm install -g pm2

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# server side hot reload for development
pm2 start ./bin/www --watch

# run production service at localhost:3000
pm2 start ./bin/www

# reload all serivce
pm2 reload all

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
