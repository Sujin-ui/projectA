
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
    },
    {
        question: "대한민국의 수도는 어디인가요?",
        options: ["서울", "인천", "부산", "대전"],
        answer: "서울"
    },
    {
        questions: "지구가 태양 주위를 한 바퀴 도는 데 걸리는 시간은?",
        options: ["약 24시간", "약 7일", "약 30일", "약 365일"],
        answer: "약 365일"
      },
      {
        questions: "한글을 창제한 왕은 누구인가요?",
        options: ["세종", "태조", "영조", "정조"],
        answer: "세종"
      }
  ];

  let currentIndex = 0;
  let score = 0; // ✅ 점수 변수
  const quizArea = document.getElementById("quizArea");
  const message = document.getElementById("message");
  const scoreBoard = document.getElementById("scoreBoard"); // 점수 표시 영역

  // 이미 출제된 문제 인덱스를 기록
  let usedIndexes = [];

  // 랜덤 인덱스 뽑기 (중복 방지)
  function getRandomIndex() {
    if (usedIndexes.length === quizzes.length) return null; // 모든 문제 소진
    let idx;
    do {
      idx = Math.floor(Math.random() * quizzes.length);
    } while (usedIndexes.includes(idx));
    usedIndexes.push(idx);
    return idx;
  }

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

  // 시작할 때 첫 문제 랜덤으로 뽑기
  const firstIndex = getRandomIndex();
  showQuiz(currentIndex);
});