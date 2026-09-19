// Čeština na úrovni - Web & JavaScript Engine
console.log("Initializing Čeština na úrovni Web App...");

// State
let currentTab = 'table';
let currentCase = 1;
let speechRate = 1.0;
let score = parseInt(localStorage.getItem('czech_score') || '0', 10);
let exercisesAnswered = parseInt(localStorage.getItem('czech_exercises') || '0', 10);

// Grammar Data for Table
const CASES_DATA = {
  1: {
    name: "1. Pád (Nominativ)",
    question: "Kdo? Co?",
    usage: "Podmět věty, základní tvar ve slovníku.",
    example: "Nový student studuje češtinu.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ý / modern-í", noun: "student / muži", note: "předseda, soudce" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ý / modern-í", noun: "hrad / pokoj", note: "stroj, čaj" },
      { gender: "Ženský (F)", adj: "nov-á / modern-í", noun: "žen-a / růž-e", note: "píseň, kost" },
      { gender: "Střední (N)", adj: "nov-é / modern-í", noun: "měst-o / moř-e", note: "kuře, náměstí" }
    ]
  },
  2: {
    name: "2. Pád (Genitiv)",
    question: "Koho? Čeho?",
    usage: "Množství, absence, předložky: do, od, z, bez, u, vedle, během.",
    example: "Jdu do nového obchodu bez bratra.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ého / modern-ího", noun: "student-a / muž-e", note: "-ovi (panu Novákovi)" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ého / modern-ího", noun: "hrad-u / pokoj-e", note: "lesa, sýra (-a)" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-y / růž-e", note: "písně, kosti" },
      { gender: "Střední (N)", adj: "nov-ého / modern-ího", noun: "měst-a / moř-e", note: "kuřete, náměstí" }
    ]
  },
  3: {
    name: "3. Pád (Dativ)",
    question: "Komu? Čemu?",
    usage: "Příjemce, předložky: k/ke, díky, proti, naproti, kvůli.",
    example: "Děkuji novému kolegovi za pomoc.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ému / modern-ímu", noun: "student-ovi / muž-i", note: "-ovi je nejčastější" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ému / modern-ímu", noun: "hrad-u / pokoj-i", note: "lesu, stolu" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-ě / růž-i", note: "pozor na alternace (k->c)" },
      { gender: "Střední (N)", adj: "nov-ému / modern-ímu", noun: "měst-u / moř-i", note: "kuřeti, náměstí" }
    ]
  },
  4: {
    name: "4. Pád (Akuzativ)",
    question: "Koho? Co?",
    usage: "Přímý předmět věty! Předložky: na, pro, za, o, v (směr/cíl).",
    example: "Mám rád nového kolegu a moderní byt.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ého / modern-ího", noun: "student-a / muž-e", note: "Ma = Genitiv tvar!" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ý / modern-í", noun: "hrad / pokoj", note: "Mi = Nominativ tvar!" },
      { gender: "Ženský (F)", adj: "nov-ou / modern-í", noun: "žen-u / růž-i", note: "-ou je klíčová koncovka" },
      { gender: "Střední (N)", adj: "nov-é / modern-í", noun: "měst-o / moř-e", note: "N = Nominativ tvar!" }
    ]
  },
  5: {
    name: "5. Pád (Vokativ)",
    question: "Oslovujeme, voláme!",
    usage: "Při oslovení osob, psaní e-mailů a dopisů.",
    example: "Dobrý den, pane profesore a milá Petro!",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ý / mil-ý", noun: "pane! / doktore! / Petře!", note: "koncovky -e / -u / -i" },
      { gender: "Ženský (F)", adj: "mil-á / drah-á", noun: "Petr-o! / pan-í!", note: "Eva -> Evo!, Marie -> Marie!" },
      { gender: "Střední / Neživ.", adj: "—", noun: "používá se zřídka", note: "většinou jen osoby a zvířata" }
    ]
  },
  6: {
    name: "6. Pád (Lokál)",
    question: "(O) kom? (O) čem?",
    usage: "VŽDY JEN S PŘEDLOŽKOU! v/ve, na, o, po, při.",
    example: "Bydlím v Praze a mluvím o nové práci.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ém / modern-ím", noun: "student-ovi / muž-i", note: "vždy předložka: o Petrovi" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ém / modern-ím", noun: "hrad-ě / pokoj-i", note: "v domě, na stole (-ě/-e/-u)" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-ě / růž-i", note: "v Praze, na poště (-ě/-e)" },
      { gender: "Střední (N)", adj: "nov-ém / modern-ím", noun: "měst-ě / moř-i", note: "v autě, v kině" }
    ]
  },
  7: {
    name: "7. Pád (Instrumentál)",
    question: "Kým? Čím?",
    usage: "Nástroj, prostředek, doprovod s předložkou: s/se, pod, nad, před, za, mezi.",
    example: "Jedu do práce novým autem s kamarádem.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ým / modern-ím", noun: "student-em / muž-em", note: "vždy koncovka -em" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ým / modern-ím", noun: "hrad-em / pokoj-em", note: "vlakem, autobusem (-em)" },
      { gender: "Ženský (F)", adj: "nov-ou / modern-í", noun: "žen-ou / růž-í", note: "s maminkou, s kávou (-ou)" },
      { gender: "Střední (N)", adj: "nov-ým / modern-ím", noun: "měst-em / moř-em", note: "s autem, s pivem (-em)" }
    ]
  }
};

// Practice Questions
const QUESTIONS = [
  {
    id: 1,
    prompt: "V ordinaci ordinuje ___ lékař.",
    options: ["nový", "nového", "novém", "novým"],
    correct: 0,
    caseName: "1. Nominativ",
    explanation: "Podmět věty (kdo ordinuje?) v mužském životném rodě: nový lékař."
  },
  {
    id: 2,
    prompt: "Zítra jdeme do ___ divadla.",
    options: ["národní", "národního", "národním", "národnímu"],
    correct: 1,
    caseName: "2. Genitiv",
    explanation: "Předložka DO se pojí s 2. pádem (Genitiv): do národního divadla."
  },
  {
    id: 3,
    prompt: "Děkuji panu ___ za rychlou pomoc.",
    options: ["Novák", "Nováka", "Novákovi", "Novákem"],
    correct: 2,
    caseName: "3. Dativ",
    explanation: "Sloveso děkovat se pojí s 3. pádem (komu?): panu Novákovi."
  },
  {
    id: 4,
    prompt: "Včera jsem viděl tvého ___ bratra.",
    options: ["starý", "starého", "starém", "starým"],
    correct: 1,
    caseName: "4. Akuzativ (Ma)",
    explanation: "Mužský životný rod v Akuzativu má tvar Genitivu: viděl jsem starého bratra."
  },
  {
    id: 5,
    prompt: "Mluvili jsme o ___ dovolené v Itálii.",
    options: ["naše", "naší", "našim", "našemu"],
    correct: 1,
    caseName: "6. Lokál",
    explanation: "Předložka O se pojí s 6. pádem (o kom? o čem?): o naší dovolené."
  },
  {
    id: 6,
    prompt: "Cestuji do Prahy rychlým ___ .",
    options: ["vlak", "vlaku", "vlakem", "vlaka"],
    correct: 2,
    caseName: "7. Instrumentál",
    explanation: "Prostředek dopravy (čím?): vlakem."
  }
];

let currentQuestionIndex = 0;
let hasAnsweredCurrent = false;

// Audio synthesis
function speakCzech(text) {
  // Check if Native Android Bridge is available
  if (window.AndroidBridge && typeof window.AndroidBridge.speakText === 'function') {
    window.AndroidBridge.speakText(text, speechRate);
    return;
  }
  
  // Fallback to Web Speech API
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ';
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported on this device.");
  }
}

function toggleSpeed() {
  speechRate = speechRate === 1.0 ? 0.75 : 1.0;
  const btn = document.getElementById('speedBtn');
  if (btn) {
    btn.innerHTML = speechRate === 0.75 ? "🐢 0.75x" : "⚡ 1.0x";
    btn.classList.toggle('active', speechRate === 0.75);
  }
  speakCzech("Rychlost řeči změněna.");
}

// Navigation
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const content = document.getElementById('tab-' + tabId);
  const navItem = document.getElementById('nav-' + tabId);
  if (content) content.classList.add('active');
  if (navItem) navItem.classList.add('active');

  if (tabId === 'stats') {
    updateStatsDisplay();
  }
}

// Render Table
function selectCase(caseNum) {
  currentCase = caseNum;
  document.querySelectorAll('.case-pill').forEach((pill, idx) => {
    pill.classList.toggle('active', (idx + 1) === caseNum);
  });
  renderCaseDetail();
}

function renderCaseDetail() {
  const data = CASES_DATA[currentCase];
  const container = document.getElementById('case-detail-container');
  if (!container || !data) return;

  let tableHtml = `
    <div style="margin-bottom: 12px;">
      <h3 style="color: var(--primary); font-size: 18px; margin-bottom: 4px;">${data.name}</h3>
      <div style="font-size: 14px; font-weight: 700; color: #37474F;">Otázka: <span style="color: var(--secondary);">${data.question}</span></div>
      <p style="font-size: 13px; color: #555; margin-top: 4px;">${data.usage}</p>
      
      <div style="background: #F3E5F5; border-left: 4px solid var(--primary); padding: 8px 12px; margin: 10px 0; border-radius: 4px; font-size: 13px; font-weight: 600;">
        Příklad: "${data.example}"
        <button class="speak-btn" onclick="speakCzech('${data.example.replace(/'/g, "\\'")}')">🔊 Přehrát</button>
      </div>
    </div>

    <div class="grammar-table-wrap">
      <table class="grammar-table">
        <thead>
          <tr>
            <th>Rod</th>
            <th>Přídavné jméno</th>
            <th>Podstatné jméno</th>
            <th>Poznámka</th>
          </tr>
        </thead>
        <tbody>
  `;

  data.table.forEach(row => {
    tableHtml += `
      <tr>
        <td><strong>${row.gender}</strong></td>
        <td><span class="highlight-ending">${row.adj}</span></td>
        <td>${row.noun}</td>
        <td style="color: #666; font-size: 12px;">${row.note}</td>
      </tr>
    `;
  });

  tableHtml += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHtml;
}

// Practice Logic
function renderQuestion() {
  const q = QUESTIONS[currentQuestionIndex];
  hasAnsweredCurrent = false;

  const card = document.getElementById('practice-card');
  if (!card) return;

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="btn-option" id="opt-${idx}" onclick="handleOptionClick(${idx})">
        ${opt}
      </button>
    `;
  });

  card.innerHTML = `
    <div class="question-header">
      <span class="badge">${q.caseName}</span>
      <span style="font-size: 12px; font-weight: 700; color: var(--gray);">Otázka ${currentQuestionIndex + 1} z ${QUESTIONS.length}</span>
    </div>
    <div class="sentence-prompt">${q.prompt}</div>
    <div class="options-grid">
      ${optionsHtml}
    </div>
    <div id="feedback-box" style="display: none; margin-top: 10px;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px;">
      <button class="speak-btn" onclick="speakCzech('${q.prompt.replace('___', '...').replace(/'/g, "\\'")}')">🔊 Poslech otázky</button>
      <button id="next-btn" style="display: none; background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer;" onclick="nextQuestion()">Další ➔</button>
    </div>
  `;
}

function handleOptionClick(index) {
  if (hasAnsweredCurrent) return;
  hasAnsweredCurrent = true;

  const q = QUESTIONS[currentQuestionIndex];
  const isCorrect = index === q.correct;
  const chosenBtn = document.getElementById('opt-' + index);
  const correctBtn = document.getElementById('opt-' + q.correct);
  const feedbackBox = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');

  exercisesAnswered++;
  localStorage.setItem('czech_exercises', exercisesAnswered);

  if (isCorrect) {
    score += 10;
    localStorage.setItem('czech_score', score);
    if (chosenBtn) chosenBtn.classList.add('correct');
    speakCzech("Výborně! Správná odpověď.");
    feedbackBox.innerHTML = `
      <div style="background: var(--success-bg); color: var(--success); padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✓ Správně! ${q.explanation}
      </div>
    `;
  } else {
    if (chosenBtn) chosenBtn.classList.add('incorrect');
    if (correctBtn) correctBtn.classList.add('correct');
    speakCzech("Pozor, tady je chyba.");
    feedbackBox.innerHTML = `
      <div style="background: var(--error-bg); color: var(--error); padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✗ Chyba. Správně je: <strong>${q.options[q.correct]}</strong>.<br>${q.explanation}
      </div>
    `;
  }

  feedbackBox.style.display = 'block';
  if (nextBtn) nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % QUESTIONS.length;
  renderQuestion();
}

function updateStatsDisplay() {
  const scoreEl = document.getElementById('stat-score');
  const countEl = document.getElementById('stat-count');
  if (scoreEl) scoreEl.innerText = score;
  if (countEl) countEl.innerText = exercisesAnswered;
}

// Initialization on load
document.addEventListener('DOMContentLoaded', () => {
  renderCaseDetail();
  renderQuestion();
  updateStatsDisplay();
});
