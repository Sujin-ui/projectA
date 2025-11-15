document.addEventListener("DOMContentLoaded", () => {
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
    if (!quiz) return;

    // 기존 내용 제거
    quizArea.innerHTML = "";

    // 문제 영역 생성
    const quizDiv = document.createElement("div");
    quizDiv.className = "quiz";

    const questionEl = document.createElement("h2");
    questionEl.textContent = quiz.question;
    quizDiv.appendChild(questionEl);

    const ul = document.createElement("ul");

    quiz.options.forEach(option => {
      const li = document.createElement("li");
      li.className = "option";
      li.textContent = option;
      li.addEventListener("click", () => checkAnswer(option, quiz.answer));
      ul.appendChild(li);
    });

    quizDiv.appendChild(ul);
    quizArea.appendChild(quizDiv);

    message.textContent = "";
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
        quizArea.innerHTML = "";
        const endMsg = document.createElement("h2");
        endMsg.textContent = "퀴즈가 끝났습니다 🎉";
        quizArea.appendChild(endMsg);
        message.textContent = "";
      }
    }, 1200);
  }

  showQuiz(currentIndex);
});