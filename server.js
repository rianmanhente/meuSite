const express = require("express");
require("./src/config/dotenv");
require("./src/config/sequelize");

const app = express();
const port = process.env.PORT;
const cors = require("cors");

const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];

// Configuração correta do CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Headers adicionais para segurança
app.use((req, res, next) => {
    res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

const routes = require("./src/router/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});