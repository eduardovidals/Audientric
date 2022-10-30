import express from 'express'
import cors from 'cors'
import connectDB from "./config/db"
import users from './routes/api/users';
import classes from './routes/api/classes';
import {Socket} from "socket.io";
import AudentricSocket from './util/socket';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerSchemas from "./config/swagger-schemas";
import serverless from 'serverless-http';
import {Server} from "http";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Audentric',
    version: '1.0.0',
    description:
      'This is a REST API Application for Audentric made with Express.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8082/.netlify/functions/api',
      description: 'Development server',
    },
  ],
  components: {
    schemas: swaggerSchemas
  }
};

const options = {
  failOnErrors: true,
  swaggerDefinition,
  apis: ["./src/routes/api/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

// connect db
connectDB();

// swagger ui
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// cors
app.use(cors({
  origin: ["http://localhost:3000", "https://audientric.netlify.app"],
}));

// init middleware
app.use(express.json());

// use routes
app.use('/api/users', users);  // path must route to lambda
app.use('/api/classes', classes);  // path must route to lambda
app.get('/api', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

const io = AudentricSocket.getInstance(server);

io.on("connection", (socket: Socket) => {
  console.log("Client connected");
});

module.exports.handler = serverless(app);
