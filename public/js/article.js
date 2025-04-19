const logout = document.getElementById("logout");
const create_article = document.getElementById("create-article");

logout.onclick = () => {
    localStorage.removeItem("user");
    location.href = "../html/login.html";
}

create_article.onclick = () => {
    location.href = "../html/creating_article.html";
}
