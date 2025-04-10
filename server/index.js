const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true, origin: true}));

const users = [];

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
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1){
        return res.status(400).send(JSON.stringify({"error": "Email already used"}));
    }
    users.push(user);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
