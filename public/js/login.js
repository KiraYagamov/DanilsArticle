const login_btn = document.getElementById("login_btn");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");

login_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "") {
        // Тут будем отправлять запрос на сервер
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = {
            email: email_input.value,
            password: password_input.value
        };
        xhr.send(JSON.stringify(data));
    }
    else alert("Поля не могут быть пустыми!");
};
