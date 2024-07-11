require('dotenv').config();
const bcrypt = require('bcryptjs');
const http = require('http');
const express = require('express');
const RED = require('node-red');

const app = express();
const server = http.createServer(app);

const users = [
  { username: "admin", password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin', 8), permissions: "*" },
  { username: "user1", password: bcrypt.hashSync(process.env.USER1_PASSWORD || 'user1password', 8), permissions: "read" },
  { username: "user2", password: bcrypt.hashSync(process.env.USER2_PASSWORD || 'user2password', 8), permissions: "read" }
];

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: "./",
  flowFile: 'flows.json',
  credentialSecret: process.env.CREDENTIAL_SECRET || 'rerer',
  adminAuth: {
    type: "credentials",
    users: users
  },
  functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

const PORT = process.env.PORT || 8000;

server.listen(PORT, function() {
  console.log(`Node-RED running on port ${PORT}`);
});

RED.start();
