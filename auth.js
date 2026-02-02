function checkAuth() {
    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "./login.html";
    }
    return JSON.parse(currentUser);
}

function logout() {
    sessionStorage.removeItem("currentUser");
    // Clear selected quiz if any
    localStorage.removeItem("selectedQuizId");
    window.location.href = "./login.html";
}
