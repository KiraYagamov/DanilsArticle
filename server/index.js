const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true, origin: true}));

app.get('/', (req, res) => {
    res.send({
        event: "GetRequest"
    });
});

app.post("/login", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
});

app.post("/register", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
