const express = require("express");
const cors = require("cors");
const sqlite = require("sqlite3").verbose();

const app = express();
const port = 3000;

const db = new sqlite.Database("main.sqlite");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true, origin: true}));

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, author TEXT, title TEXT, text TEXT, time INTEGER)");
});

app.post("/login", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    db.get(`SELECT email, password FROM users WHERE email = '${user.email}'`, (err, result) => {
        if (err) console.log(err);
        else {
            if (result) {
                if (result.password !== user.password) 
                    return res.status(400).send(JSON.stringify({"error": "Password is wrong"}));
                else return res.sendStatus(200);
            }
            else return res.status(400).send(JSON.stringify({"error": "User not found"}));
        }
    });
});

app.post("/register", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    db.get(`SELECT COUNT(*) FROM users WHERE email = '${user.email}'`, (err, result) => {
        if (err) console.log(err);
        else {
            if (result["COUNT(*)"] > 0) return res.status(400).send(JSON.stringify({"error": "Email already used"}));
            const statement = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
            statement.run(user.email, user.password);
            statement.finalize();
            console.log("User added: " + user.email);
            res.sendStatus(200);
        }
    });
});

app.post("/create_article", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const article = req.body.article;
    const statement = db.prepare("INSERT INTO articles (author, title, text, time) VALUES (?, ?, ?, ?)");
    statement.run(article.author, article.title, article.text, Math.floor(Date.now() / 1000));
    statement.finalize();
    res.sendStatus(200);
});

app.get("/get_articles", (req, res) => {
    db.all("SELECT * FROM articles", (err, result) => {
        if (err) console.log(err);
        else {
            const data = {
                articles: result
            }
            res.status(200).send(JSON.stringify(data));
        }
    });
});

app.post("/remove_article", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const user = req.body.user;

    db.get(`SELECT 1 FROM users WHERE email = '${user.email}' AND password = '${user.password}'`, (err, result) => {
        if (err) console.log(err);
        else {
            if (result) {
                db.get(`SELECT 1 FROM articles WHERE id = ${id} AND author = '${user.email}'`, (err, result) => {
                    if (err) console.log(err);
                    else {
                        if (result) {
                            db.run(`DELETE FROM articles WHERE id = ${id}`);
                            return res.sendStatus(200);
                        }
                        else return res.sendStatus(400);
                    }
                });
            }
            else return res.sendStatus(400);
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
