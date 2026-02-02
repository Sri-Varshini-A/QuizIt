const quizdiv = document.querySelector("#quiz-container");

document.querySelector("#add-ques").addEventListener("click", function () {

    const quesblock = document.createElement("div");
    quesblock.classList.add("quesblock");

    quesblock.innerHTML =
        `<input class="q" placeholder="Enter question" type="text">
     <input class="opt" placeholder="Enter Option 1" type="text">
     <input class="opt" placeholder="Enter Option 2" type="text">
     <input class="opt" placeholder="Enter Option 3" type="text">
     <input class="opt" placeholder="Enter Option 4" type="text">
     <label>Correct Answer:</label>
     <select class="correct">
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
        <option value="2">Option 3</option>
        <option value="3">Option 4</option>    
     </select>
    `;

    quizdiv.appendChild(quesblock);
});

document.querySelector("#save-quiz").addEventListener("click", function () {

    const quesblocks = document.querySelectorAll(".quesblock");
    const quizTitle = document.querySelector("#title").value;

    if (!quizTitle.trim()) {
        alert("Please enter a quiz title");
        return;
    }

    if (quesblocks.length === 0) {
        alert("Please add at least one question");
        return;
    }

    let questions = [];

    quesblocks.forEach(block => {

        const q_text = block.querySelector(".q").value;
        const options = [];
        block.querySelectorAll(".opt").forEach(option => {
            options.push(option.value);
        });

        const correct = Number(block.querySelector(".correct").value);

        if (q_text) { // simplistic validation
            questions.push({
                q: q_text,
                options: options,
                correct: correct
            });
        }
    });

    const allQuizzes = JSON.parse(localStorage.getItem("allQuizzes")) || {};

    const quizId = "custom_" + Date.now(); // unique id

    // Get current user
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    allQuizzes[quizId] = {
        title: quizTitle,
        questions: questions,
        creator: currentUser ? currentUser.email : "anonymous"
    };

    localStorage.setItem("allQuizzes", JSON.stringify(allQuizzes));
    alert("Quiz Saved!");
    window.location.href = "./home.html";

});