const ROWS = 2;
const COLS = 4;
const board = document.getElementById('puzzle-board');

// Solid default background color in case the internet image is slow
let currentImage = 'https://picsum.photos/800/400';

const quizData = [
  {
    question: "In which decade were hawker centres relocated and refurbished?",
    answers: ["1980s", "1980", "80s", "the 1980s", "1980's"]
  },
  {
    question: "What was the Orchard Road Carpark Hawker centre commonly known as?",
    answers: ["glutton's square", "gluttons square", "glutton square", "glutton’s square"]
  },
  {
    question: "How did hawkers get to choose their permanent food stalls?",
    answers: ["balloting", "ballot", "by balloting"]
  },
  {
    question: "What is the percentage of Singaporeans who visit hawker centre at least once a week?",
    answers: ["83%", "83 percent", "83"]
  },
  {
    question: "How are our modern new hawker centres different?",
    answers: [
      "air con or clean plates", 
      "aircon or clean plates", 
      "air-con or clean plates", 
      "air con", 
      "clean plates"
    ]
  },
  {
    question: "In what year was our hawker culture recognised for being part of UNESCO heritage?",
    answers: ["2020", "in 2020"]
  },
  {
    question: "How are we using technology in hawker centres now?",
    answers: [
      "robots, self ordering kiosk and digital menu",
      "robots, self-ordering kiosk and digital menu",
      "robots, self ordering kiosks and digital menus",
      "robots, self ordering kiosk & digital menu",
      "robots self ordering kiosk and digital menu"
    ]
  },
  {
    question: "Who said this? 'Hawker food makes Singapore unique. It is part of our national identity.'",
    answers: ["tommy koh", "prof tommy koh", "professor tommy koh"]
  }
];

let currentQuestionIndex = 0;
let unlockedCount = 0;

function initBoard() {
  if (!board) return;
  board.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = `tile-${r * COLS + c}`;
      tile.style.backgroundImage = `url('${currentImage}')`;
      
      const posX = -(c * 200);
      const posY = -(r * 200);
      tile.style.backgroundPosition = `${posX}px ${posY}px`;

      scatterSingleTile(tile);
      board.appendChild(tile);
    }
  }
  loadQuestion();
}

function scatterSingleTile(tile) {
  const randomX = (Math.random() > 0.5 ? 1 : -1) * (800 + Math.random() * 500);
  const randomY = (Math.random() > 0.5 ? 1 : -1) * (500 + Math.random() * 400);
  const randomRotate = (Math.random() - 0.5) * 720;

  tile.style.opacity = '0';
  tile.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
}

function loadQuestion() {
  const feedback = document.getElementById('feedback');
  if (feedback) feedback.textContent = '';
  
  if (currentQuestionIndex < quizData.length) {
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1} of 8`;
    document.getElementById('question-text').textContent = quizData[currentQuestionIndex].question;
    
    const inputEl = document.getElementById('answer-input');
    const btnEl = document.getElementById('submit-btn');
    
    if (inputEl) {
      inputEl.value = '';
      inputEl.disabled = false;
      inputEl.focus();
    }
    if (btnEl) btnEl.disabled = false;
  } else {
    document.getElementById('question-number').textContent = "Complete!";
    document.getElementById('question-text').textContent = "🎉 Congratulations! You unlocked the entire puzzle!";
    document.getElementById('answer-input').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
  }
}

function checkAnswer(event) {
  event.preventDefault();
  const inputEl = document.getElementById('answer-input');
  const feedbackEl = document.getElementById('feedback');
  
  const userAnswer = inputEl.value.trim().toLowerCase();
  const validAnswers = quizData[currentQuestionIndex].answers;

  if (validAnswers.includes(userAnswer)) {
    feedbackEl.textContent = "✨ Correct! Piece unlocked!";
    feedbackEl.className = "correct";
    
    flyInPiece(currentQuestionIndex);
    
    unlockedCount++;
    document.getElementById('score').textContent = unlockedCount;
    
    currentQuestionIndex++;
    inputEl.disabled = true;
    document.getElementById('submit-btn').disabled = true;

    setTimeout(loadQuestion, 1000);
  } else {
    feedbackEl.textContent = "❌ Incorrect, try again!";
    feedbackEl.className = "incorrect";
    inputEl.select();
  }
}

function flyInPiece(index) {
  const tile = document.getElementById(`tile-${index}`);
  if (tile) {
    tile.style.opacity = '1';
    tile.style.transform = 'translate(0px, 0px) rotate(0deg)';
  }
}

function loadCustomImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentImage = e.target.result;
      
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((tile) => {
        tile.style.backgroundImage = `url('${currentImage}')`;
      });
    };
    reader.readAsDataURL(file);
  }
}

// Loads as soon as the HTML elements exist (no waiting for images)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBoard);
} else {
  initBoard();
}