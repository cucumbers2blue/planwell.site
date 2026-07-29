const decks = [
  {
    id: "basics",
    number: "01",
    title: "Hardware and Software Basics",
    description:
      "Build the foundation: definitions, examples and the essential difference.",
    accent: "cyan",
    cards: [
      {
        question: "What is hardware?",
        choices: ["Physical computer parts", "Programs", "Websites"],
        answer: "Physical computer parts",
        deeper:
          "Hardware includes external devices such as keyboards and monitors, but also internal parts such as the processor, memory and storage drive.",
      },
      {
        question: "What is software?",
        choices: ["Programs and instructions", "Computer parts", "Wires"],
        answer: "Programs and instructions",
        deeper:
          "Software tells the hardware what to do. Operating systems manage the computer, while applications help users perform particular tasks.",
      },
      {
        question: "Which item is hardware?",
        choices: ["Keyboard", "Google Chrome", "PowerPoint"],
        answer: "Keyboard",
        deeper:
          "A keyboard converts each key press into an electronic signal that the computer can understand.",
      },
      {
        question: "Which item is software?",
        choices: ["Monitor", "Mouse", "Microsoft Word"],
        answer: "Microsoft Word",
        deeper:
          "Word is application software designed for creating documents. It relies on the operating system and physical computer to work.",
      },
      {
        question: "Is a printer hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "A printer is a physical output device. It also needs software called a printer driver to communicate with the computer.",
      },
      {
        question: "Is a computer game hardware or software?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The game contains programmed rules, instructions, images and sounds. It needs hardware such as a processor, screen and controller to run.",
      },
      {
        question: "Which can you physically touch?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Some hardware is easy to see, while other components are hidden inside the computer case.",
      },
      {
        question: "Which item is software?",
        choices: ["Laptop", "Windows", "Speaker"],
        answer: "Windows",
        deeper:
          "Windows is an operating system. It manages the computer’s hardware and provides a platform for applications to run.",
      },
      {
        question: "Which item is hardware?",
        choices: ["YouTube", "Keyboard", "Google Docs"],
        answer: "Keyboard",
        deeper:
          "YouTube and Google Docs are software services accessed through a browser. The keyboard is a physical device used to control them.",
      },
      {
        question: "What gives hardware instructions?",
        choices: ["Software", "Electricity", "The desk"],
        answer: "Software",
        deeper:
          "The processor follows software instructions to perform calculations and control other components. Hardware without software has nothing useful to execute.",
      },
    ],
  },
  {
    id: "applying",
    number: "02",
    title: "Applying the Idea",
    description:
      "Use what you know: classify combinations, situations and simple problems.",
    accent: "orange",
    cards: [
      {
        question:
          "A student types in Microsoft Word. Which item is hardware?",
        choices: ["Keyboard", "Microsoft Word", "Document"],
        answer: "Keyboard",
        deeper:
          "Pressing a key closes a small electronic circuit. The keyboard sends a code representing that key to the computer.",
      },
      {
        question:
          "A student types in Microsoft Word. Which item is software?",
        choices: ["Keyboard", "Microsoft Word", "Screen"],
        answer: "Microsoft Word",
        deeper:
          "Word interprets the keyboard signals and displays the corresponding letters. The hardware and software work together.",
      },
      {
        question: "Which pair contains only hardware?",
        choices: [
          "Mouse and monitor",
          "Chrome and Word",
          "Keyboard and PowerPoint",
        ],
        answer: "Mouse and monitor",
        deeper:
          "Both are physical devices, but they perform different jobs. The mouse sends information into the system, while the monitor presents information to the user.",
      },
      {
        question: "Which pair contains only software?",
        choices: [
          "Chrome and PowerPoint",
          "Mouse and printer",
          "Screen and Windows",
        ],
        answer: "Chrome and PowerPoint",
        deeper:
          "Chrome is designed for accessing websites, while PowerPoint is designed for presentations. Different software is created for different purposes.",
      },
      {
        question:
          "Which pair contains one hardware item and one software item?",
        choices: [
          "Keyboard and Chrome",
          "Mouse and printer",
          "Word and PowerPoint",
        ],
        answer: "Keyboard and Chrome",
        deeper:
          "The keyboard provides physical controls, while Chrome interprets the user’s actions and communicates with websites.",
      },
      {
        question: "Which part displays a computer game?",
        choices: ["Monitor", "Game software", "Keyboard"],
        answer: "Monitor",
        deeper:
          "A monitor creates an image using thousands or millions of tiny pixels. The computer sends instructions describing the colour of every pixel.",
      },
      {
        question:
          "Which item contains the instructions for a computer game?",
        choices: ["Game software", "Monitor", "Mouse"],
        answer: "Game software",
        deeper:
          "Game software stores rules such as movement, scoring and what happens when objects interact. The processor executes these instructions.",
      },
      {
        question:
          "The screen is cracked. Is this a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Hardware",
        deeper:
          "Physical damage requires repairing or replacing the affected component. Installing new software cannot repair broken glass.",
      },
      {
        question:
          "An application freezes. Is this probably a hardware or software problem?",
        choices: ["Hardware", "Software"],
        answer: "Software",
        deeper:
          "The program may have encountered an error or become unable to complete an instruction. However, weak or failing hardware can sometimes cause similar symptoms.",
      },
      {
        question: "Why does a computer need hardware and software?",
        choices: [
          "Hardware runs instructions provided by software",
          "They are the same thing",
          "Software can work without a device",
        ],
        answer: "Hardware runs instructions provided by software",
        deeper:
          "A useful computer system requires both. Software provides instructions, while hardware performs calculations, stores information and communicates with the user.",
      },
    ],
  },
];

const elements = {
  home: document.querySelector("#home-view"),
  practice: document.querySelector("#practice-view"),
  completion: document.querySelector("#completion-view"),
  deckGrid: document.querySelector("#deck-grid"),
  deckNumber: document.querySelector("#deck-number"),
  deckTitle: document.querySelector("#deck-title"),
  masteryCount: document.querySelector("#mastery-count"),
  progressTrack: document.querySelector("#progress-track"),
  progressFill: document.querySelector("#progress-fill"),
  cardsInPlay: document.querySelector("#cards-in-play"),
  question: document.querySelector("#question"),
  answerList: document.querySelector("#answer-list"),
  feedback: document.querySelector("#feedback"),
  backButton: document.querySelector("#back-button"),
  completionHeading: document.querySelector("#completion-heading"),
  completionCopy: document.querySelector("#completion-copy"),
  replayButton: document.querySelector("#replay-button"),
  otherDeckButton: document.querySelector("#other-deck-button"),
};

let currentDeck = null;
let queue = [];
let mastered = 0;
let attempts = 0;
let answerState = "idle";

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapWith]] = [copy[swapWith], copy[index]];
  }
  return copy;
}

function showView(view) {
  elements.home.hidden = view !== "home";
  elements.practice.hidden = view !== "practice";
  elements.completion.hidden = view !== "completion";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDeckChoices() {
  elements.deckGrid.replaceChildren();
  decks.forEach((deck) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `deck-card ${deck.accent}`;
    button.innerHTML = `
      <span class="deck-number">${deck.number}</span>
      <span class="deck-kicker">${deck.cards.length} cards</span>
      <strong>${deck.title}</strong>
      <span class="deck-description">${deck.description}</span>
      <span class="deck-action">Start deck <b aria-hidden="true">→</b></span>
    `;
    button.addEventListener("click", () => startDeck(deck));
    elements.deckGrid.append(button);
  });
}

function startDeck(deck) {
  currentDeck = deck;
  queue = shuffle(deck.cards);
  mastered = 0;
  attempts = 0;
  answerState = "idle";
  elements.deckNumber.textContent = deck.number;
  elements.deckTitle.textContent = deck.title;
  showView("practice");
  renderQuestion();
}

function renderProgress(includeCurrentCorrect = false) {
  const visibleMastered = mastered + (includeCurrentCorrect ? 1 : 0);
  const total = currentDeck.cards.length;
  elements.masteryCount.textContent = `${visibleMastered}/${total} mastered`;
  elements.progressTrack.setAttribute("aria-valuemax", String(total));
  elements.progressTrack.setAttribute("aria-valuenow", String(visibleMastered));
  elements.progressTrack.setAttribute(
    "aria-label",
    `${visibleMastered} of ${total} cards mastered`,
  );
  elements.progressFill.style.width = `${(visibleMastered / total) * 100}%`;
}

function renderQuestion() {
  if (!queue.length) {
    showCompletion();
    return;
  }

  const card = queue[0];
  answerState = "idle";
  elements.question.textContent = card.question;
  elements.cardsInPlay.textContent = `${queue.length} ${
    queue.length === 1 ? "card" : "cards"
  } in play`;
  elements.answerList.replaceChildren();
  elements.feedback.replaceChildren();
  renderProgress();

  card.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `
      <span>${String.fromCharCode(65 + index)}</span>
      <b>${choice}</b>
    `;
    button.addEventListener("click", () => selectAnswer(button, choice));
    elements.answerList.append(button);
  });
}

function selectAnswer(button, choice) {
  if (answerState !== "idle") return;

  attempts += 1;
  const card = queue[0];
  const correct = choice === card.answer;
  answerState = correct ? "correct" : "wrong";

  elements.answerList
    .querySelectorAll("button")
    .forEach((answer) => (answer.disabled = true));

  if (correct) {
    button.classList.add("is-correct");
    renderProgress(true);
    elements.feedback.innerHTML = `
      <div class="correct-panel">
        <p class="feedback-label">Correct — card mastered</p>
        <h2>Go deeper</h2>
        <p>${card.deeper}</p>
        <button class="primary-button" type="button">
          ${queue.length === 1 ? "Finish deck" : "Next card"} →
        </button>
      </div>
    `;
  } else {
    button.classList.add("is-wrong");
    elements.feedback.innerHTML = `
      <div class="wrong-panel">
        <p class="feedback-label">Not yet</p>
        <p>No problem. This card will return later so you can try it again.</p>
        <button class="secondary-button" type="button">Continue</button>
      </div>
    `;
  }

  elements.feedback
    .querySelector("button")
    .addEventListener("click", continueDeck);
}

function continueDeck() {
  if (answerState === "correct") {
    mastered += 1;
    queue = queue.slice(1);
  } else {
    queue = [...queue.slice(1), queue[0]];
  }
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCompletion() {
  const total = currentDeck.cards.length;
  elements.completionHeading.textContent = `You mastered all ${total} cards.`;
  elements.completionCopy.innerHTML = `You answered ${attempts} ${
    attempts === 1 ? "question" : "questions"
  } to complete <strong>${currentDeck.title}</strong>.`;
  showView("completion");
}

function returnHome() {
  currentDeck = null;
  queue = [];
  mastered = 0;
  attempts = 0;
  answerState = "idle";
  showView("home");
}

elements.backButton.addEventListener("click", returnHome);
elements.otherDeckButton.addEventListener("click", returnHome);
elements.replayButton.addEventListener("click", () => startDeck(currentDeck));

renderDeckChoices();
