document.addEventListener("DOMContentLoaded", () => {
      const quizzes = [
        { question: "1. 지구에서 가장 큰 대륙은?", 
          options: ["아프리카", "유럽", "아시아", "남아메리카"], 
          answer: "아시아" 
        },
        { question: "대한민국의 수도는 어디인가요?", 
          options: ["서울", "인천", "부산", "대전"], 
          answer: "서울" 
        },
        { question: "지구가 태양 주위를 한 바퀴 도는 데 걸리는 시간은?", 
          options: ["약 24시간", "약 7일", "약 30일", "약 365일"], 
          answer: "약 365일" 
        },
        { question: "한글을 창제한 왕은 누구인가요?", 
          options: ["세종", "태조", "영조", "정조"], 
          answer: "세종" 
        },
        { question: "대한민국 국기의 흰색 바탕은 무엇을 상징하나요?", 
          options: ["평화", "용기", "부유", "전통"], 
          answer: "평화" 
        }
      ];

      let score = 0;
      const quizArea = document.getElementById("quizArea");
      const message = document.getElementById("message");
      const scoreBoard = document.getElementById("scoreBoard");

      // 이미 출제된 문제 인덱스 기록
      let usedIndexes = [];

      // 랜덤 인덱스 뽑기 (중복 방지)
      function getRandomIndex() {
        if (usedIndexes.length === quizzes.length) return null;
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

        quizArea.innerHTML = "";
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
          li.addEventListener("click", () => {
            checkAnswer(option, quiz.answer);
            ul.querySelectorAll(".option").forEach(opt => {
              opt.style.pointerEvents = "none";
              opt.style.opacity = "0.6";
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
          score++;
        } else {
          message.textContent = `❌ 오답입니다! 정답은 "${correct}" 입니다.`;
        }

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "다음 ▶";
        nextBtn.addEventListener("click", () => {
          const nextIndex = getRandomIndex();
          if (nextIndex !== null) {
            showQuiz(nextIndex);
          } else {
            quizArea.innerHTML = "";
            const endMsg = document.createElement("h2");
            endMsg.textContent = `퀴즈가 끝났습니다 🎉 총점: ${score}점 / ${quizzes.length}문제`;
            quizArea.appendChild(endMsg);
            message.textContent = "";
            scoreBoard.textContent = "";
          }
        });
        quizArea.appendChild(nextBtn);

        scoreBoard.textContent = `현재 점수: ${score} / ${usedIndexes.length}`;
      }

      // 시작할 때 첫 문제 랜덤으로 뽑기
      const firstIndex = getRandomIndex();
      showQuiz(firstIndex);
    });
