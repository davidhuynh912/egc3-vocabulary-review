"use strict";

const icons = {
  book: '<path d="M12 7v14m0-14C8 4 4 4 2.5 5v14c3-1 6-.5 9.5 2 3.5-2.5 6.5-3 9.5-2V5C20 4 16 4 12 7Z"/>',
  cards: '<rect x="8" y="7" width="12" height="14" rx="2"/><path d="M5 17H4a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
  pencil: '<path d="m16 3 5 5M4 20l4-1 12-12a2.8 2.8 0 0 0-4-4L4 15l-1 6 6-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  volume: '<path d="M3 9v6h4l5 4V5L7 9H3Zm13 0a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11"/>',
  volumeOff: '<path d="M3 9v6h4l5 4V5L7 9H3Zm0-6 18 18"/>',
};
const sections = { LS: "Listening–Speaking", WR: "Writing–Reading" };
const britishSpellings = { "1-WR-1": "behaviour" };
const unavailableAudio = "Pronunciation audio is unavailable.";
const modes = {
  vocabulary: ["Vocabulary", "Find words, meanings and examples from the Skillful 2 word lists."],
  flashcards: ["Flashcards", "Recall the meaning, then flip the card to check."],
  practice: ["Practice", "Choose the word or phrase that best completes each sentence."],
};
const units = Object.keys(vocabulary.units);
const entries = new Map(vocabulary.entries.map(entry => [entry.id, entry]));
const questionsByAnswer = new Map(questions.map(question => [question.answer, question]));
const $ = selector => document.querySelector(selector);
const content = $("#study-content");
const step = 6;
const limits = new Map();
const quizChoices = new Map();
const text = value => String(value).replace(/[&<>"']/g, letter => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[letter]);
const normalize = value => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/đ/g, "d");
const searchable = new Map(vocabulary.entries.map(entry => [
  entry.id, normalize([entry.word, britishSpellings[entry.id], entry.en, entry.vi].join("\n")),
]));

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem("word-studio-" + key)) ?? fallback; }
  catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem("word-studio-" + key, JSON.stringify(value)); }
  catch { /* Keep the current session working if storage is blocked. */ }
}

function currentMode() {
  const hash = location.hash.slice(1);
  return Object.hasOwn(modes, hash) ? hash : "vocabulary";
}

let mode = currentMode();
let unit = "all";
let practiceUnit = "1";
let section = "all";
let query = "";
let deck = [];
let cardIndex = 0;
let revealed = false;
let autoPronounce = load("auto-pronounce", false) === true;
let feedbackID = null;
let completed = false;
let reviewed = new Set(load("reviewed", []).filter(id => entries.has(id)));
let learned = new Set(load("learned", []).filter(id => entries.has(id)));
let responses = Object.fromEntries(Object.entries(load("responses", {})).filter(([id, choice]) =>
  questionsByAnswer.get(id)?.choices.includes(choice)));

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
}

function pill(code) {
  return code ? `<span class="pill ${code.toLowerCase()}">${code}</span>` : "";
}

function chosenUnit() {
  return mode === "practice" ? practiceUnit : unit;
}

function matches(entry, filterUnit = chosenUnit()) {
  return (filterUnit === "all" || String(entry.unit) === filterUnit)
    && (section === "all" || entry.section === section);
}

function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateChrome() {
  document.querySelectorAll("[data-view]").forEach(link => {
    if (link.dataset.view === mode) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  $("#mode-title").textContent = modes[mode][0];
  $("#mode-description").textContent = modes[mode][1];
  $("#search-wrap").hidden = mode !== "vocabulary";
  const allOption = mode === "practice" ? [] : [["all", "All units"]];
  const options = [...allOption, ...Object.entries(vocabulary.units)];
  const selected = chosenUnit();
  $("#unit-options").innerHTML = options.map(([id, name]) => `
    <button type="button" data-unit="${id}" aria-pressed="${id === selected}"
      aria-label="${id === "all" ? name : `Unit ${id} · ${text(name)}`}">
      <span class="unit-index" aria-hidden="true">${id === "all" ? icon("layers") : id}</span>${text(name)}
    </button>`).join("");
  $("#unit-select").innerHTML = options.map(([id, name]) =>
    `<option value="${id}">${id === "all" ? name : `Unit ${id} · ${text(name)}`}</option>`).join("");
  $("#unit-select").value = selected;
  document.querySelectorAll("[data-section]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.section === section);
  });
}

function speaker(entry) {
  if (!clips[entry.id]) {
    return `<div class="audio-control">
      <button type="button" class="speaker speaker-unavailable" data-action="no-audio"
        aria-label="Pronunciation unavailable for ${text(entry.word)}" title="${unavailableAudio}">${icon("volumeOff")}</button>
      <span class="speaker-note">N/A</span>
    </div>`;
  }
  const label = `Hear ${entry.word} in British English`;
  return `<div class="audio-control">
    <button type="button" class="speaker" data-action="speak" data-id="${text(entry.id)}"
      aria-label="${text(label)}" title="${text(label)}">${icon("volume")}</button>
  </div>`;
}

function metadata(entry) {
  const spelling = britishSpellings[entry.id];
  return `<span class="word-meta"><span class="pos">${text(entry.pos || "POS unavailable")}</span>
    <span class="ipa">${text(entry.ipa || "IPA unavailable")}</span>
    ${spelling ? `<span class="alternate-spelling">UK spelling <strong>${text(spelling)}</strong></span>` : ""}</span>`;
}

function definitions(entry) {
  return `<div class="definitions">
    <p><span class="field">EN</span>${text(entry.en || "Unavailable")}</p>
    <p lang="vi"><span class="field" lang="en">VI</span>${text(entry.vi || "Không có")}</p>
    <p class="example"><span class="field">EXAMPLE</span><span>${text(entry.example || "Unavailable")}</span></p>
  </div>`;
}

function wordCard(entry) {
  return `<article class="word-card">
    <header class="word-head"><div><h5>${text(entry.word || "Word unavailable")}</h5>${metadata(entry)}</div>${speaker(entry)}</header>
    ${definitions(entry)}
    ${entry.family && entry.family !== "—" ? `<details class="word-family"><summary>Word family</summary><p>${text(entry.family)}</p></details>` : ""}
  </article>`;
}

function empty(title, description) {
  return `<div class="panel empty"><h3>${title}</h3><p>${description}</p></div>`;
}

function groupMarkup(unitID, entriesInUnit) {
  const heading = unitID
    ? `<span>Unit ${unitID}</span> · ${text(vocabulary.units[unitID])}`
    : "Classification needs review";
  const groups = (unitID ? Object.keys(sections) : ["unclassified"]).map(code => {
    const group = entriesInUnit.filter(entry => (entry.section || "unclassified") === code);
    if (!group.length) return "";
    const key = `${unitID || "unknown"}-${code}`;
    const limit = limits.get(key) ?? step;
    return `<section class="skill-group" aria-labelledby="skill-${key}">
      <h4 id="skill-${key}" class="skill-title">${pill(sections[code] ? code : null)} ${sections[code] || "Unclassified"}</h4>
      <div class="grid">${group.slice(0, limit).map(wordCard).join("")}</div>
      ${group.length > limit ? `<div class="controls"><button type="button" class="button" data-action="more" data-key="${key}">Show more ${sections[code] ? code + " " : ""}words (${group.length - limit} more)</button></div>` : ""}
    </section>`;
  });
  return `<section class="unit-group"><h3>${heading}</h3>${groups.join("")}</section>`;
}

function vocabularyView() {
  const words = vocabulary.entries.filter(entry => matches(entry) && searchable.get(entry.id).includes(query));
  const grouped = new Map();
  for (const entry of words) {
    if (!grouped.has(entry.unit)) grouped.set(entry.unit, []);
    grouped.get(entry.unit).push(entry);
  }
  $("#scope-count").textContent = `${words.length} ${words.length === 1 ? "entry" : "entries"}`;
  content.innerHTML = words.length ? [...grouped].map(([id, list]) => groupMarkup(id, list)).join("")
    : empty("No matching words", "Try another search term, unit or skill.");
}

function flashView() {
  $("#scope-count").textContent = `${deck.length} ${deck.length === 1 ? "card" : "cards"}`;
  if (!deck.length) {
    content.innerHTML = empty("No cards in this selection", "Try a different unit or skill.");
    return;
  }
  const card = deck[cardIndex];
  content.innerHTML = `<div class="panel">
    <div class="meter-label"><span>Card ${cardIndex + 1} of ${deck.length}</span><span data-card-progress></span></div>
    <progress value="0" max="${deck.length}" aria-label="Cards reviewed"></progress>
    <div class="flash-shell">
      <div class="flash-tools"><span> ${card.unit ? `Unit ${card.unit} · ${text(vocabulary.units[card.unit])}` : "Classification needs review"} ${pill(card.section)}</span>${speaker(card)}</div>
      <div class="flash-card ${revealed ? "revealed" : ""}">
        <button type="button" class="flip-trigger" data-action="flip" aria-expanded="${revealed}" aria-controls="card-details"
          aria-label="${text(card.word)}. ${revealed ? "Hide" : "Reveal"} details"></button>
        <div class="flash-rotor">
          <div class="flash-face flash-front" aria-hidden="${revealed}">
            <span class="flash-word">${text(card.word)}</span>
            <span class="flash-hint">Tap to reveal</span>
          </div>
          <div id="card-details" class="flash-face flash-back" aria-hidden="${!revealed}">
            <span class="flash-back-word">${text(card.word)}</span>
            ${metadata(card)}${definitions(card)}
            <span class="flash-hint">Tap to hide</span>
          </div>
        </div>
      </div>
    </div>
    <div class="controls">
      <button class="button" data-action="previous" ${cardIndex === 0 ? "disabled" : ""}>Previous</button>
      <button class="button" data-action="next-card" ${cardIndex === deck.length - 1 ? "disabled" : ""}>Next</button>
      <button class="button" data-action="shuffle" ${deck.length < 2 ? "disabled" : ""}>Shuffle</button>
      <label class="auto-pronounce">
        <input type="checkbox" id="auto-pronounce" ${autoPronounce ? "checked" : ""}>
        Auto-pronounce
      </label>
    </div>
  </div>`;
  updateCardProgress();
}

function updateCardProgress() {
  const seen = deck.filter(entry => reviewed.has(entry.id)).length;
  const known = deck.filter(entry => learned.has(entry.id)).length;
  content.querySelector("[data-card-progress]").textContent = `${seen} reviewed · ${known} learned`;
  content.querySelector("progress").value = seen;
}

function flipCard(button) {
  const card = deck[cardIndex];
  revealed = !revealed;
  const shell = button.closest(".flash-card");
  shell.classList.toggle("revealed", revealed);
  shell.querySelector(".flash-front").setAttribute("aria-hidden", String(revealed));
  shell.querySelector(".flash-back").setAttribute("aria-hidden", String(!revealed));
  button.setAttribute("aria-expanded", String(revealed));
  button.setAttribute("aria-label", `${card.word}. ${revealed ? "Hide" : "Reveal"} details`);
  if (revealed && !learned.has(card.id)) {
    learned.add(card.id);
    save("learned", [...learned]);
    updateCardProgress();
  }
}

function questionList() {
  return questions.filter(question => matches(entries.get(question.answer), practiceUnit));
}

function tally(list) {
  return {
    answered: list.filter(question => Object.hasOwn(responses, question.answer)).length,
    correct: list.filter(question => responses[question.answer] === question.answer).length,
  };
}

function practiceView() {
  const list = questionList();
  $("#scope-count").textContent = `${list.length} questions`;
  if (!list.length) {
    content.innerHTML = empty("No questions in this selection", "Try a different unit or skill.");
    return;
  }
  const { answered, correct } = tally(list);
  const current = list.find(q => q.answer === feedbackID) || list.find(q => !Object.hasOwn(responses, q.answer));
  const totals = Object.keys(sections).map(code => {
    const subset = questions.filter(q => {
      const answer = entries.get(q.answer);
      return String(answer.unit) === practiceUnit && answer.section === code;
    });
    const skill = tally(subset);
    return `<li>${pill(code)} ${skill.correct} correct · ${skill.answered}/${subset.length} answered</li>`;
  }).join("");
  const meter = `<div class="meter-label"><span>Unit ${practiceUnit} · ${text(vocabulary.units[practiceUnit])}</span>
    <span>Score ${correct}/${answered} · ${answered}/${list.length} answered</span></div>
    <progress max="${list.length}" value="${answered}" aria-label="Questions answered"></progress>`;
  const breakdown = `<ul class="quiz-breakdown" aria-label="Unit progress by skill">${totals}</ul>`;
  const retry = `<button class="button ${current ? "" : "primary"}" data-action="retry">Retry ${section === "all" ? "unit" : section}</button>`;
  if (completed || !current) {
    content.innerHTML = `<div class="panel">${meter}
      <div class="quiz-complete"><h3 data-focus tabindex="-1">Practice complete</h3><p>You answered ${correct} of ${list.length} questions correctly.</p></div>
      ${breakdown}<div class="controls">${retry}</div></div>`;
    return;
  }
  const answer = entries.get(current.answer);
  const chosen = responses[current.answer];
  const right = chosen === current.answer;
  if (!quizChoices.has(current.answer)) quizChoices.set(current.answer, shuffle(current.choices));
  const buttons = quizChoices.get(current.answer).map((id, index) => {
    const state = chosen && (id === current.answer ? "right" : id === chosen ? "wrong" : "");
    return `<button type="button" class="answer ${state || ""}" data-action="answer" data-question="${text(current.answer)}"
      data-id="${text(id)}" ${chosen ? 'aria-disabled="true"' : ""}>
      <b aria-hidden="true">${"ABCD"[index]}</b><span>${text(entries.get(id).word)}</span>
      ${state ? `<span aria-label="${state === "right" ? "Correct answer" : "Your answer is incorrect"}">${state === "right" ? "✓" : "✕"}</span>` : ""}
    </button>`;
  }).join("");
  const sentence = text(current.prompt).replace("_____", '<span class="blank" aria-label="blank">_____</span>');
  content.innerHTML = `<div class="panel">${meter}
    <div class="quiz-meta"><span>Question ${list.indexOf(current) + 1} of ${list.length}</span>${pill(answer.section)}</div>
    <h3 class="question" data-focus tabindex="-1">${sentence}</h3>
    <div class="answers" role="group" aria-label="Answer choices">${buttons}</div>
    ${chosen ? `<div class="feedback ${right ? "right" : "wrong"}" tabindex="-1" data-feedback>
      <p><strong>${right ? "Correct!" : `Incorrect. The correct answer is ${text(answer.word)}.`}</strong></p>
      <p><strong>${text(answer.word)}</strong> <span class="pos">${text(answer.pos)}</span> means ${text(answer.en)}${/[.!?]$/.test(answer.en) ? "" : "."}</p>
    </div>` : ""}
    <div class="controls">
      ${chosen ? `<button class="button primary" data-action="next-question">${answered === list.length ? "View results" : "Next question"}</button>` : ""}
      ${answered > 0 ? retry : ""}
    </div>${breakdown}</div>`;
}

function render() {
  if (mode === "vocabulary") vocabularyView();
  else if (mode === "flashcards") flashView();
  else practiceView();
}

function resetView() {
  limits.clear();
  cardIndex = 0;
  revealed = false;
  feedbackID = null;
  completed = false;
  deck = vocabulary.entries.filter(entry => matches(entry, unit));
  updateChrome();
  render();
}

function selectUnit(value, restoreFocus) {
  if (mode === "practice") practiceUnit = value;
  else unit = value;
  resetView();
  if (restoreFocus) document.querySelector(`[data-unit="${value}"]`)?.focus({ preventScroll: true });
}

const audio = $("#pronunciation-player");
let audioTimer;
let audioRequest = 0;

function audioStatus(message = "") {
  const status = $("#audio-status");
  clearTimeout(audioTimer);
  status.textContent = message;
  status.hidden = !message;
  if (message) audioTimer = setTimeout(() => { status.hidden = true; }, 6500);
}

async function speak(id) {
  const clip = clips[id];
  if (!clip) return;
  const request = ++audioRequest;
  audioStatus();
  audio.pause();
  audio.src = "audio/" + clip;
  try {
    await audio.play();
  } catch {
    if (request === audioRequest) audioStatus("Pronunciation could not play. Try the speaker again.");
  }
}

function handleAction(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id, question, key } = button.dataset;
  if (action === "speak") {
    speak(id);
    return;
  }
  if (action === "no-audio") {
    audioRequest++;
    audio.pause();
    audioStatus(unavailableAudio);
    return;
  }
  if (action === "more") {
    const previousLimit = limits.get(key) ?? step;
    limits.set(key, previousLimit + 18);
    render();
    const firstNew = document.querySelector(`#skill-${key} + .grid`)?.children[previousLimit];
    if (firstNew) {
      const focus = firstNew.querySelector(".speaker:not(:disabled)") || firstNew.querySelector("h5");
      if (focus.matches("h5")) focus.tabIndex = -1;
      focus.focus();
    }
    return;
  }
  if (mode === "flashcards") {
    if (action === "flip") {
      flipCard(button);
      return;
    }
    if (action === "next-card" || action === "shuffle") {
      const id = deck[cardIndex].id;
      if (!reviewed.has(id)) {
        reviewed.add(id);
        save("reviewed", [...reviewed]);
      }
    }
    if (action === "previous" || action === "next-card") {
      cardIndex += action === "previous" ? -1 : 1;
      revealed = false;
    } else if (action === "shuffle") {
      const first = deck[cardIndex];
      deck = shuffle(deck);
      if (deck[0] === first) [deck[0], deck[1]] = [deck[1], deck[0]];
      cardIndex = 0;
      revealed = false;
    }
    render();
    const nextFocus = content.querySelector(`[data-action="${action}"]:not(:disabled)`) || content.querySelector("[data-action=flip]");
    nextFocus?.focus({ preventScroll: true });
    if (action === "next-card" && autoPronounce) speak(deck[cardIndex].id);
  } else if (mode === "practice") {
    if (action === "answer" && !Object.hasOwn(responses, question)) {
      responses[question] = id;
      save("responses", responses);
      feedbackID = question;
      render();
      content.querySelector("[data-feedback]")?.focus();
    } else if (action === "next-question" || action === "retry") {
      if (action === "retry") {
        for (const { answer } of questionList()) {
          delete responses[answer];
          quizChoices.delete(answer);
        }
        save("responses", responses);
      }
      feedbackID = null;
      completed = action !== "retry" && questionList().every(q => Object.hasOwn(responses, q.answer));
      render();
      content.querySelector("[data-focus]")?.focus({ preventScroll: true });
    }
  }
}

document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon); });
if (vocabulary.issues.length) $("#source-notice").innerHTML = `<details class="panel"><summary>Word lists that need review</summary>
  <ul>${vocabulary.issues.map(issue => `<li>${text(issue)}</li>`).join("")}</ul></details>`;
$("#unit-options").addEventListener("click", event => {
  const button = event.target.closest("[data-unit]");
  if (button) selectUnit(button.dataset.unit, true);
});
$("#unit-select").addEventListener("change", event => selectUnit(event.target.value, false));
$(".section-options").addEventListener("click", event => {
  const button = event.target.closest("[data-section]");
  if (!button || button.dataset.section === section) return;
  section = button.dataset.section;
  resetView();
});
$("#search").addEventListener("input", event => {
  query = normalize(event.target.value.trim());
  limits.clear();
  vocabularyView();
});
window.addEventListener("hashchange", () => {
  const next = currentMode();
  if (mode === next) return;
  if (next === "practice" && unit !== "all") practiceUnit = unit;
  mode = next;
  resetView();
});
content.addEventListener("click", handleAction);
content.addEventListener("change", event => {
  if (event.target.id === "auto-pronounce") {
    autoPronounce = event.target.checked;
    save("auto-pronounce", autoPronounce);
  }
});
resetView();
