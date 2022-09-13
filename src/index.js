require('@babel/register')();
require('dotenv-flow').config({
  silent: true,
});
require('./server.js');
