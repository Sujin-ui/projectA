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
  let score = 0; // ✅ 점수 변수
  const quizArea = document.getElementById("quizArea");
  const message = document.getElementById("message");
  const scoreBoard = document.getElementById("scoreBoard"); // 점수 표시 영역

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
      // 클릭 후 중복 선택 방지: once + 선택 후 전체 비활성화
      li.addEventListener("click", () => {
        checkAnswer(option, quiz.answer);
        // 모든 보기 클릭 비활성화
        ul.querySelectorAll(".option").forEach(opt => {
          opt.style.pointerEvents = "none"; // 더 이상 클릭 불가
          opt.style.opacity = "0.7";        // 시각적 비활성화
        });
      }, { once: true });

      ul.appendChild(li);

    });

    quizDiv.appendChild(ul);
    quizArea.appendChild(quizDiv);

    

    message.textContent = "";
  }

  function checkAnswer(selected, correct) {
    if (selected === correct) {
      message.textContent = "✅ 정답입니다!";
      score++; // ✅ 정답일 때만 점수 증가
    } else {
      message.textContent = `❌ 오답입니다! 정답은 "${correct}" 입니다.`;
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "다음 ▶";
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex < quizzes.length) {
        showQuiz(currentIndex);
      } else {
        quizArea.innerHTML = "";
        const endMsg = document.createElement("h2");
        endMsg.textContent = `퀴즈가 끝났습니다 🎉 총점: ${score}점 / ${quizzes.length}문제`;
        quizArea.appendChild(endMsg);
        message.textContent = "";
        nextBtn.style.display = "none";
      }
    });

    quizArea.appendChild(nextBtn);
  }

  showQuiz(currentIndex);
});