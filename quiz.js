
const quizId = localStorage.getItem("selectedQuizId");
const allQuizzes = JSON.parse(localStorage.getItem("allQuizzes"));

const quiz = allQuizzes[quizId];
loadQuiz(quiz);


function loadQuiz(quiz) {

    const questions = quiz.questions;

    document.querySelector("h1").textContent = quiz.title;

    var userAnswers = new Array(questions.length).fill(null);

    const quizdiv = document.querySelector("#quiz");

    questions.forEach((q, qindex) => {

        const quesblock = document.createElement("div");
        quesblock.classList.add("quesblock");

        const quesText = document.createElement("p");
        quesText.textContent = `${qindex + 1}. ${q.q}`;

        quesblock.appendChild(quesText);

        q.options.forEach((opt, optindex) => {

            const optbtn = document.createElement("button");
            optbtn.textContent = opt;
            optbtn.classList.add("option-btn");

            optbtn.addEventListener("click", function () {
                userAnswers[qindex] = optindex;

                const allOptions = quesblock.querySelectorAll(".option-btn");
                allOptions.forEach(b => b.classList.remove("selected"));

                optbtn.classList.add("selected");
            });

            quesblock.appendChild(optbtn);
        });

        quizdiv.appendChild(quesblock);
    });

    //Scoring

    const submitbtn = document.querySelector("#submitquiz");

    submitbtn.addEventListener("click", function () {

        let score = 0;
        const total = questions.length;

        // Disable all buttons and show feedback
        const allQuesBlocks = document.querySelectorAll(".quesblock");

        allQuesBlocks.forEach((block, qIndex) => {
            const options = block.querySelectorAll(".option-btn");
            const correctAnswer = Number(questions[qIndex].correct);
            const userAnswer = userAnswers[qIndex];

            if (userAnswer === correctAnswer) {
                score++;
            }

            options.forEach((btn, optIndex) => {
                btn.disabled = true; // Disable further clicking

                // Highlight correct answer
                if (optIndex === correctAnswer) {
                    btn.classList.add("correct");
                }

                // Highlight wrong user selection
                if (userAnswer === optIndex && userAnswer !== correctAnswer) {
                    btn.classList.add("wrong");
                }
            });
        });

        // Hide submit button
        submitbtn.style.display = "none";

        // Show Result
        const result = document.querySelector("#result");
        result.style.display = "block";

        const percentage = Math.round((score / total) * 100);
        let message = "";
        if (percentage === 100) message = "Perfect Score! 🏆";
        else if (percentage >= 70) message = "Great Job! 👏";
        else if (percentage >= 40) message = "Good Effort! 👍";
        else message = "Keep Practice! 💪";

        result.innerHTML = `
            <h2>${message}</h2>
            <div class="score-percent">${percentage}%</div>
            <p>You scored ${score} out of ${total}</p>
        `;

        const back = document.querySelector("#back");
        back.style.display = "block";
    });
}


