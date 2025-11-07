const url = "https://ophtalmology.vercel.app/send-data";
let point = 0;
let history = [];
const urlParams = new URLSearchParams(window.location.search);
const requestData = new URLSearchParams();
requestData.append("start", urlParams.get("start"));
requestData.append("end", urlParams.get("end"));
requestData.append("shuffle", urlParams.get("shuffle"))
requestData.append("quantity", urlParams.get("quantity"))

document.addEventListener("DOMContentLoaded", function () {
  fetch(url, {
    method: "POST",
    body: requestData,
  })
    .then((response) => response.json())
    .then((data) => {
      let currentQuestionIndex = 0;

      function loadQuestion() {
        const currentQuestion = data[currentQuestionIndex];
        if (!currentQuestion) {
          console.error("No more questions available.");
          return;
        }

        const questionElement = document.getElementById("question");
        const optionsContainer = document.getElementById("options-container");
        const nextButton = document.getElementById("next-button");

        questionElement.textContent = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.answer.forEach((option, index) => {
          const optionElement = document.createElement("div");
          optionElement.className = "option";
          optionElement.textContent = option;
          optionElement.setAttribute("data-index", index);
          optionElement.onclick = checkAnswer;
          optionsContainer.appendChild(optionElement);
        });

        nextButton.style.display = "none";
      }

      function checkAnswer() {
        const selectedOptionIndex = parseInt(this.getAttribute("data-index"));
        const currentQuestion = data[currentQuestionIndex];
        const nextButton = document.getElementById("next-button");
        const selectedAnswer = currentQuestion.answer[selectedOptionIndex];
        const correctAnswer = currentQuestion.correct;

        if (selectedAnswer == correctAnswer) {
          this.classList.add("correct");
          point++;
        } else {
          this.classList.add("incorrect");
          currentQuestion.choosen = currentQuestion.answer[selectedOptionIndex];
          history.push(currentQuestion);
        }

        nextButton.style.display = "block";

        document.querySelectorAll(".option").forEach((option) => {
          option.onclick = null;
        });
      }

      function nextQuestion() {
        const selectedOption = document.querySelector(".option.correct, .option.incorrect");
        if (!selectedOption) {
          // User hasn't selected an answer
          alert("აირჩიე პასუხი");
          return;
        }

        document.querySelectorAll(".option").forEach((option) => {
          option.classList.remove("correct", "incorrect");
          option.onclick = checkAnswer;
        });

        document.getElementById("next-button").style.display = "none";

        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
          loadQuestion();
        } else {
          if (history.length > 0) {
            document.getElementById("quiz-container").innerHTML = `<h2 class='result'>ჯამური ქულა: ${point}</h2><br><form action="/result" method="post"><input type="hidden" name="data" value="${encodeURIComponent(
              JSON.stringify(history)
            )}"><button>შეცდომების ნახვა</button></form>`;
          } else {
            document.getElementById("quiz-container").innerHTML = `<h2 class='result'>ჯამური ქულა: ${point}</h2><br>`;
          }
        }
      }

      function handleKeyPress(e) {
        if (e.key === "Enter") {
          nextQuestion();
        }
      }

      loadQuestion();
      document.getElementById("next-button").addEventListener("click", nextQuestion);
      document.addEventListener("keypress", handleKeyPress);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
