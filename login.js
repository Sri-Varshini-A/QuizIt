const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevents reload

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store current user in basic session storage
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "./home.html";
    }
    else {
        document.getElementById("login-error").textContent = "Invalid email or password";
    }
});