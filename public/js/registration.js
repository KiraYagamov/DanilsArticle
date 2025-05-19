const reg_btn = document.getElementById("reg_btn");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const confirm_input = document.getElementById("confirm");

reg_btn.onclick = () => {
    if (email_input.value !== "" && password_input.value !== "" && confirm_input.value !== "") {
        if (password_input.value === confirm_input.value) {
            // Тут будем отправлять запрос на сервер
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://192.168.31.17:3000/register", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            const data = {
                email: email_input.value,
                password: password_input.value
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE){
                    if (xhr.status === 200){
                        localStorage.setItem("user", JSON.stringify(data));
                        location.href = "../html/articles.html";
                    }
                    else{
                        const message = JSON.parse(xhr.responseText);
                        if (message.error === "Email already used") {
                            alert("Почта уже используется!");
                        }
                        else {
                            alert("Произошла неизвестная ошибка!");
                        }
                    }
                }
            }
            xhr.send(JSON.stringify(data));
        }
        else alert("Пароли не совпадают!");
    }
    else alert("Поля не могут быть пустыми!");
};
