require('dotenv').config();
const app = require('express')()

const {
  SERVER_PORT,
} = process.env;

const server = require('http').Server(app);
const io = require('socket.io')(server);