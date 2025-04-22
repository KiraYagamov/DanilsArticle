const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true, origin: true}));

const users = [];
const articles = [];
let articleID = 0;

app.get('/', (req, res) => {
    res.send({
        event: "GetRequest"
    });
});

app.post("/login", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex === -1){
        return res.status(400).send(JSON.stringify({"error": "User not found"}));
    }
    else {
        const savedUser = users[userIndex];
        if (savedUser.password !== user.password) {
            return res.status(400).send(JSON.stringify({"error": "Password is wrong"}));
        }
        else {
            return res.sendStatus(200);
        }
    }
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

app.post("/create_article", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const article = req.body.article;
    article.id = articleID;
    articles.push(article);

    articleID++;
    res.sendStatus(200);

    console.log("New article created!");
    console.log(article);
});

app.get("/get_articles", (req, res) => {
    const data = {
        articles: articles
    }
    res.status(200).send(JSON.stringify(data));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
