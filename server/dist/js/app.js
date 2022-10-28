"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const users_1 = __importDefault(require("./routes/api/users"));
const classes_1 = __importDefault(require("./routes/api/classes"));
const socket_1 = __importDefault(require("./util/socket"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_schemas_1 = __importDefault(require("./config/swagger-schemas"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Audentric',
        version: '1.0.0',
        description: 'This is a REST API Application for Audentric made with Express.',
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
            url: 'http://localhost:8082/api',
            description: 'Development server',
        },
    ],
    components: {
        schemas: swagger_schemas_1.default
    }
};
const options = {
    failOnErrors: true,
    swaggerDefinition,
    apis: ["./src/routes/api/*.ts"]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const app = (0, express_1.default)();
// connect db
(0, db_1.default)();
// swagger ui
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// cors
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// init middleware
app.use(express_1.default.json());
// use routes
app.use('/api/users', users_1.default);
app.use('/api/classes', classes_1.default);
app.use('/.netlify/functions/server', users_1.default); // path must route to lambda
app.use('/.netlify/functions/server', classes_1.default); // path must route to lambda
app.get('/api/test', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 8082;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
const io = socket_1.default.getInstance(server);
io.on("connection", (socket) => {
    console.log("Client connected");
});
module.exports.handler = (0, serverless_http_1.default)(app);
