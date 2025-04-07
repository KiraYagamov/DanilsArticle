const login_btn = document.getElementById("login_btn");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");

login_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "") {
        // Тут будем отправлять запрос на сервер
    }
    else alert("Поля не могут быть пустыми!");
};
