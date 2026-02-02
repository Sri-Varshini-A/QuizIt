// Set user name
const userNameDisplay = document.getElementById("username-display");
if (user && userNameDisplay) {
  userNameDisplay.textContent = user.username;
}

const allQ = JSON.parse(localStorage.getItem("allQuizzes"));

if (!allQ) {
  //Default quizzes
  const GKquestions = [
    {
      q: "Sun rises in which direction?",
      options: ["North", "South", "East", "West"],
      correct: 2
    },
    {
      q: "Capital of India?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      correct: 0
    }
  ];

  const allQuizzes = {
    gk: {
      title: "General Knowledge",
      questions: GKquestions
    }
  };

  localStorage.setItem("allQuizzes", JSON.stringify(allQuizzes));
}

// To display all quizzes in home page
const storedQuizzes = JSON.parse(localStorage.getItem("allQuizzes"));

const optionsDiv = document.querySelector(".quiz-grid");

if (storedQuizzes) {
  for (let quizId in storedQuizzes) {

    const quizdiv = document.createElement("div");
    quizdiv.classList.add("quiz-card");

    const isCreator = storedQuizzes[quizId].creator === user.email;
    const deleteBtnHTML = isCreator ? `<button class="delete-btn" title="Delete Quiz"><i class="material-icons">delete</i></button>` : '';

    quizdiv.innerHTML = `
        <h3>${storedQuizzes[quizId].title}</h3>
        <p>${storedQuizzes[quizId].questions.length} Questions</p>
        <button class="start-btn">Start Quiz</button>
        ${deleteBtnHTML}
        `;

    quizdiv.querySelector(".start-btn").addEventListener("click", function () {
      localStorage.setItem("selectedQuizId", quizId);
      window.location.href = "./quiz.html";
    });

    if (isCreator) {
      quizdiv.querySelector(".delete-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this quiz?")) {
          delete storedQuizzes[quizId];
          localStorage.setItem("allQuizzes", JSON.stringify(storedQuizzes));
          window.location.reload();
        }
      });
    }

    optionsDiv.appendChild(quizdiv);
  }
}
