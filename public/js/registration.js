const reg_btn = document.getElementById("reg_btn");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const confirm_input = document.getElementById("confirm");

reg_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "" && confirm_input.value !== "") {
        if (password_input.value === confirm_input.value) {
            // Тут будем отправлять запрос на сервер
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/register", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            const data = {
                email: email_input.value,
                password: password_input.value
            };
            xhr.send(JSON.stringify(data));
        }
        else alert("Пароли не совпадают!");
    }
    else alert("Поля не могут быть пустыми!");
};
