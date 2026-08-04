const decks = [
  {
    id: "footprint", label: "Trail", title: "Digital Footprint", intro: "Notice the trail you create whenever you use the internet.", symbol: "◌",
    cards: [
      ["What is a digital footprint?", ["The trail you leave online", "A computer password", "A broken screen"], "The trail you leave online", "Posts, comments, photos, likes and searches can all add to your digital footprint."],
      ["Who might see something you share online?", ["Only your closest friend", "People you have never met", "Nobody after one day"], "People you have never met", "Online information can travel beyond the people you first shared it with."],
      ["What can happen to a photo shared online?", ["It can be copied and reshared", "It becomes completely private", "It cannot leave the app"], "It can be copied and reshared", "Someone can save or share a copy without asking you first."],
      ["Does deleting a post guarantee it is gone forever?", ["Yes, always", "No, copies may still exist", "Only on weekends"], "No, copies may still exist", "Screenshots, backups and shared copies can remain after the original is deleted."],
      ["Why should you pause before posting?", ["It may affect how people see you", "It makes the internet faster", "It charges your device"], "It may affect how people see you", "Your digital footprint can shape how others see you now and in the future."],
      ["Which information might a music app remember?", ["Music you listen to", "Your shoe size automatically", "Your classroom wall colour"], "Music you listen to", "Apps and sites can store information about how you use them, such as listening or search history."],
    ],
  },
  {
    id: "passwords", label: "Shield", title: "Password Power", intro: "Build strong passwords and keep private information protected.", symbol: "✦",
    cards: [
      ["Which password is strongest?", ["Blue!Tiger47", "password", "123456"], "Blue!Tiger47", "A strong password mixes upper- and lowercase letters, numbers and symbols."],
      ["Should you use the same password for every account?", ["Yes, it is easier", "No, use a different one", "Only for games"], "No, use a different one", "Different passwords stop one stolen password from unlocking all your accounts."],
      ["Who should know your password?", ["Everyone in your class", "Your online friends", "Only you and a trusted adult when needed"], "Only you and a trusted adult when needed", "Passwords should stay private—even from friends. Ask a trusted adult for help when necessary."],
      ["Why is your birthday a weak password?", ["It may be easy to discover", "It has too many symbols", "It changes every day"], "It may be easy to discover", "Personal facts such as birthdays and pet names may be known or found by other people."],
      ["What should you do if a friend asks for your password?", ["Share it once", "Keep it private", "Post it in the group chat"], "Keep it private", "A good friend will respect your privacy and will not need your password."],
      ["Why should your home address stay private online?", ["It reveals where you live", "It uses too many letters", "It makes photos blurry"], "It reveals where you live", "Private information can put your safety at risk. Tell a trusted adult if someone asks for it."],
    ],
  },
  {
    id: "netiquette", label: "Signal", title: "Netiquette", intro: "Communicate clearly, kindly and respectfully with other people.", symbol: "≈",
    cards: [
      ["What should you do before sending a message?", ["Think before you type", "Send it as fast as possible", "Add more capital letters"], "Think before you type", "A short pause helps you check whether your message is clear, necessary and kind."],
      ["What can WRITING IN ALL CAPS suggest?", ["Shouting", "Whispering", "Singing"], "Shouting", "Use normal capitalisation so your message does not sound angry or aggressive."],
      ["How should you respond to a different opinion?", ["Respectfully", "With an insult", "By sharing private details"], "Respectfully", "You can disagree with an idea while still treating the person with respect."],
      ["What should you do with an unkind message you are about to send?", ["Do not send it", "Add an emoji and send it", "Send it to more people"], "Do not send it", "If it is unkind, stop. Rewrite it respectfully or speak with a trusted adult."],
      ["Why can written messages be misunderstood?", ["They lack tone and facial expressions", "They are always too long", "Screens change every word"], "They lack tone and facial expressions", "Readers cannot always hear your tone or see your expression, so choose words carefully."],
      ["A message makes you feel unsafe. What is the best next step?", ["Tell a trusted adult", "Reply with something mean", "Share your address"], "Tell a trusted adult", "You do not have to manage an unsafe situation alone. Save the message and ask for help."],
    ],
  },
].map((deck) => ({ ...deck, cards: deck.cards.map(([question, choices, answer, note]) => ({ question, choices, answer, note })) }));

const app = document.querySelector("#app");
let activeDeck = null;
let queue = [];
let selected = null;
let mastered = 0;
let attempts = 0;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function renderHome() {
  activeDeck = null; queue = []; selected = null; mastered = 0;
  app.className = "page";
  app.innerHTML = `
    <header class="topbar"><div class="logo">DC</div><div><strong>Digital Citizenship</strong><span class="meta">Grade 6 · Design</span></div><span class="count">18 cards</span></header>
    <section class="hero"><p class="eyebrow">Your digital passport</p><h1>Be smart. Be safe. Be kind.</h1><p class="hero-copy">Choose a topic. Missed cards return until you have mastered the whole deck.</p><div class="rules" aria-label="Three digital citizenship habits"><span>PAUSE</span><i>→</i><span>PROTECT</span><i>→</i><span>RESPECT</span></div></section>
    <section class="deck-grid" aria-label="Choose a topic">${decks.map((deck, index) => `
      <button class="deck" data-deck="${deck.id}"><span class="deck-index">0${index + 1}</span><span class="symbol" aria-hidden="true">${deck.symbol}</span><span class="deck-label">${deck.label}</span><strong>${deck.title}</strong><span class="deck-intro">${deck.intro}</span><span class="deck-start">Start ${deck.cards.length} cards <b>→</b></span></button>`).join("")}</section>`;
  document.querySelectorAll("[data-deck]").forEach((button) => button.addEventListener("click", () => startDeck(button.dataset.deck)));
}

function startDeck(id) {
  activeDeck = decks.find((deck) => deck.id === id);
  queue = [...activeDeck.cards].sort(() => Math.random() - 0.5);
  selected = null; mastered = 0; attempts = 0;
  renderPractice(); window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPractice() {
  if (!queue.length) { renderComplete(); return; }
  const current = queue[0];
  const correct = selected === current.answer;
  const visibleMastered = mastered + (correct ? 1 : 0);
  app.className = "practice";
  app.innerHTML = `
    <header class="practice-header"><button class="link-button" id="topics">← Topics</button><strong>${activeDeck.title}</strong><span>${visibleMastered}/${activeDeck.cards.length} mastered</span></header>
    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${activeDeck.cards.length}" aria-valuenow="${visibleMastered}"><span style="width:${(visibleMastered / activeDeck.cards.length) * 100}%"></span></div>
    <section class="question-area"><div class="question-meta"><span>Choose the best answer</span><span>${queue.length} in play</span></div><article class="card"><span class="card-symbol" aria-hidden="true">${activeDeck.symbol}</span><h1>${escapeHtml(current.question)}</h1>
      <div class="answers">${current.choices.map((choice, index) => { const state = selected === choice ? (choice === current.answer ? "correct" : "wrong") : ""; return `<button class="answer ${state}" data-choice="${escapeHtml(choice)}" ${selected ? "disabled" : ""}><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(choice)}</button>`; }).join("")}</div>
      <div aria-live="polite">${selected ? (correct ? `<div class="success"><strong>Correct — card mastered</strong><p>${escapeHtml(current.note)}</p><button class="primary" id="continue">${queue.length === 1 ? "Finish topic" : "Next card"} →</button></div>` : `<div class="retry"><strong>Not yet</strong><p>This card will return later so you can try again.</p><button class="secondary" id="continue">Continue</button></div>`) : ""}</div>
    </article></section>`;
  document.querySelector("#topics").addEventListener("click", renderHome);
  document.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => { if (selected) return; selected = button.dataset.choice; attempts += 1; renderPractice(); }));
  document.querySelector("#continue")?.addEventListener("click", continuePractice);
}

function continuePractice() {
  const current = queue[0];
  if (selected === current.answer) { mastered += 1; queue = queue.slice(1); }
  else { queue = [...queue.slice(1), current]; }
  selected = null; renderPractice(); window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderComplete() {
  app.className = "page centered";
  app.innerHTML = `<section class="complete"><span class="complete-mark">✓</span><p class="eyebrow">Passport stamped</p><h1>Topic mastered.</h1><p class="complete-copy">You completed <strong>${activeDeck.title}</strong> in ${attempts} attempt${attempts === 1 ? "" : "s"}.</p><div class="actions"><button class="primary" id="again">Practise again</button><button class="link-button" id="topics">Choose another topic</button></div></section>`;
  document.querySelector("#again").addEventListener("click", () => startDeck(activeDeck.id));
  document.querySelector("#topics").addEventListener("click", renderHome);
}

renderHome();
