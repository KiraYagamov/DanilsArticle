const logout = document.getElementById("logout");
const create_article = document.getElementById("create-article");
const articles = document.getElementById("articles");

const user = JSON.parse(localStorage.getItem("user"));

logout.onclick = () => {
    localStorage.removeItem("user");
    location.href = "../html/login.html";
}

create_article.onclick = () => {
    location.href = "../html/creating_article.html";
}

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/get_articles", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = () => {
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
}
xhr.send();

function addArticle(article) {
    const div = document.createElement("div");
    div.setAttribute("class", "article");

    if (article.author === user.email) {
        const remove_btn = document.createElement("button");
        remove_btn.setAttribute("class", "remove_btn");
        remove_btn.innerHTML = "Удалить";
        div.append(remove_btn);
    }

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "article_name");
    h2.innerHTML = article.title;

    const p = document.createElement("p");
    p.setAttribute("class", "article_data");
    p.innerHTML = article.text;

    const p_author = document.createElement("p");
    p_author.setAttribute("class", "article_author");
    p_author.innerHTML = article.author;

    div.append(h2);
    div.append(p);
    div.append(p_author);
    articles.prepend(div);
}
