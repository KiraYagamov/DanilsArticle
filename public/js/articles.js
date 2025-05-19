const logout = document.getElementById("logout");
const create_article = document.getElementById("create-article");
const articles = document.getElementById("articles");
const current_email = document.getElementById("current-email");
const user = JSON.parse(localStorage.getItem("user"));

if (user) current_email.innerHTML = user.email;
else location.href = "../html/login.html";

const xhr = new XMLHttpRequest();

logout.onclick = () => {
    localStorage.removeItem("user");
    location.href = "../html/login.html";
}

create_article.onclick = () => {
    location.href = "../html/creating_article.html";
}

sendRequest("GET", "/get_articles", null, () => {
    if (xhr.readyState === XMLHttpRequest.DONE){
        if (xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            const articles = data.articles;
            articles.forEach(article => {
                addArticle(article);
            });
        } 
        else alert("Произошла неизвестная ошибка!");
    }
});

function addArticle(article) {
    const div = document.createElement("div");
    div.setAttribute("class", "article");

    const remove_btn = document.createElement("button");
    remove_btn.setAttribute("class", "remove_btn");
    remove_btn.innerHTML = "Удалить";
    remove_btn.onclick = () => {
        if (article.author === user.email) {
            removeArticle(article.id);
        }
        div.remove();
    }
    div.append(remove_btn);

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "article_name");
    h2.innerHTML = article.title;

    const p = document.createElement("p");
    p.setAttribute("class", "article_data");
    p.innerHTML = article.text;

    const p_author = document.createElement("p");
    p_author.setAttribute("class", "article_author");
    p_author.innerHTML = article.author;

    const date_time = document.createElement("p");
    date_time.setAttribute("class", "date_time");
    date_time.innerHTML = toTime(article.time);

    div.append(h2);
    div.append(p);
    div.append(p_author);
    div.append(date_time);
    articles.prepend(div);
}

function toTime(time) {
    const date = new Date(time*1000);
    let options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    return date.toLocaleString('ru-RU', options);
}

function sendRequest(type, address, data, onready){
    xhr.open(type, "http://192.168.31.17:3000" + address, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = onready;
    xhr.send(data);
}

function removeArticle(id) {
    sendRequest("POST", "/remove_article", JSON.stringify({id, user}), () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 400){
                alert("Произошла ошибка!");
            } 
        }
    });
}
