# Node-RED with uibuilder and Three.js Project

This project sets up a Node-RED server with the uibuilder dependency to create customizable web interfaces. The example web application includes a rotating cube using Three.js and OrbitControls, along with functionality to send messages to Node-RED and listen for backend messages.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://www.npmjs.com/)
- [Node-RED](https://nodered.org/) (version 3.x or higher)

**Note**: To utilize uibuilder for Node-RED, you must have Node-RED version 3.0 or higher installed.

## Installation

1. Clone the repository:
    
    ```
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```
    
2. Install dependencies:
    
    ```
    npm start
    ```
    
3. Set up environment variables by creating a `.env` file in the root of your project directory and add the following:
    
    ```
    PORT=8000
    CREDENTIAL_SECRET=rerer
    ADMIN_PASSWORD=admin
    USER1_PASSWORD=your-user1-password
    USER2_PASSWORD=your-user2-password
    ```
    

## Running the Application

1. Start the Node-RED server:
    
    ```
    node serve.js
    ```
    
2. Open your web browser and navigate to `http://localhost:8000`. You will be prompted to log in using the credentials set in the `.env` file.
3. To access the custom web application developed with uibuilder, go to `http://localhost:8000/api/testing`.

## Features

- **Rotating Cube**: The example web application includes a rotating cube using Three.js and OrbitControls.
- **Message Communication**: A button to send messages to the Node-RED server and a listener to receive messages from the backend.

## Configuration Details

### Node-RED Settings

The `serve.js` file initializes and configures Node-RED with the following settings:

- `httpAdminRoot`: Path for the Node-RED admin UI.
- `httpNodeRoot`: Path for the Node-RED API.
- `userDir`: Directory for Node-RED user data.
- `flowFile`: File where Node-RED flows are stored.
- `credentialSecret`: Secret key for securing credentials.
- `adminAuth`: User authentication setup with bcrypt hashing.

### Environment Variables

- `PORT`: Port on which the Node-RED server runs.
- `CREDENTIAL_SECRET`: Secret for encrypting credentials.
- `ADMIN_PASSWORD`: Password for the admin user.
- `USER1_PASSWORD`: Password for user1.
- `USER2_PASSWORD`: Password for user2.

## Example Code

Here is the complete `serve.js` code:

```jsx
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
```

## Contributing

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.