const article_name = document.getElementById("article-name");
const article_text = document.getElementById("article-text");
const create_article_btn = document.getElementById("create-article-btn");
const back_btn = document.getElementById("back-btn");

const user = JSON.parse(localStorage.getItem("user"));


create_article_btn.onclick = () => {
    if (article_name.value === "" || article_text.value === "") {
        alert("Поля не могут быть пустыми!");
        return;
    }
    const article = {
        title: article_name.value,
        text: article_text.value,
        author: user.email
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/create_article", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    const data = {
        article
    };
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200) alert("Статья создана!");
            else alert("Произошла неизвестная ошибка!");
        }
    }
    xhr.send(JSON.stringify(data));
}

back_btn.onclick = () => {
    location.href = "../html/articles.html";
}
