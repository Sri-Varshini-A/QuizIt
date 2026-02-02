//Invalid Password Handler
const passwordField = document.getElementById("password");
const pwderror = document.getElementById("pwderror");

passwordField.addEventListener("input", function () {

    const pwd = password.value;

    if (pwd.length < 6) {
        pwderror.textContent = "Password must be at least 6 characters";
    }
    else if (!/\d/.test(pwd)) {
        pwderror.textContent = "Password must contain a number";
    }
    else {
        pwderror.textContent = "";
    }

});


//Userdata handler

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevents reload

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if (password.length < 6 || !/\d/.test(password)) {
        document.getElementById("signup-error").textContent = "Please fix password errors above";
        return;
    }

    const newUser = {
        username: username,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        document.getElementById("signup-error").textContent = "Email is already registered. Please login.";
        return;
    }

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Success! Please Login.");
    window.location.href = "./login.html";

});