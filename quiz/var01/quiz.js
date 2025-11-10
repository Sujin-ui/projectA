const quizzes = [
  {
    question: "1. 지구에서 가장 큰 대륙은?",
    options: ["아프리카", "유럽", "아시아", "남아메리카"],
    answer: "아시아"
  },
  {
    question: "2. HTML에서 링크를 만들 때 사용하는 태그는?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  }
];

let currentIndex = 0;
const quizArea = document.getElementById("quizArea");
const message = document.getElementById("message");

function showQuiz(index) {
  const quiz = quizzes[index];
  quizArea.innerHTML = `
    <div class="quiz">
      <h2>${quiz.question}</h2>
      <ul>
        ${quiz.options.map(opt => `<li class="option">${opt}</li>`).join("")}
      </ul>
    </div>
  `;
  message.textContent = "";
  quizArea.querySelectorAll(".option").forEach(optEl => {
    optEl.addEventListener("click", () => checkAnswer(optEl.textContent, quiz.answer));
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    message.textContent = "✅ 정답입니다!";
  } else {
    message.textContent = "❌ 오답입니다!";
  }
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizzes.length) {
      showQuiz(currentIndex);
    } else {
      quizArea.innerHTML = "<h2>퀴즈가 끝났습니다 🎉</h2>";
      message.textContent = "";
    }
  }, 1200);
}

showQuiz(currentIndex);