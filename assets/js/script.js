// header sidebar
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-btn")) {
      navLinks.classList.remove("active");
    }
  });
});

// GPA calculator
const gradeMap = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 };
function calcGPA() {
  const g = document.getElementById('grades').value.toUpperCase().split(',');
  const v = g.filter(x => gradeMap[x.trim()] != undefined);
  if (!v.length) return document.getElementById('gpa-result').textContent = "❌ Enter valid grades!";
  const gpa = v.reduce((a, x) => a + gradeMap[x.trim()], 0) / v.length;
  let msg = gpa >= 9 ? "🌟 Excellent!" : gpa >= 7 ? "👍 Good Job!" : gpa >= 5 ? "🙂 Keep Improving" : "⚠️ Needs Work";
  document.getElementById('gpa-result').textContent = `Your GPA: ${gpa.toFixed(2)} | ${msg}`;
}
// promodor timer
let duration = 0, timerId, running = false;

function updateDisplay() {
  const min = String(Math.floor(duration / 60)).padStart(2, '0');
  const sec = String(duration % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${min}:${sec}`;

  const percent = duration / originalDuration;
  const msg = percent > 0.7 ? "🔥 You're doing great!" :
    percent > 0.4 ? "⏳ Halfway there, keep pushing!" :
      percent > 0.1 ? "🚀 Almost done, stay strong!" :
        duration > 0 ? "⚡ Final minute!" : "✅ Well done!";
  document.getElementById('motivation').textContent = msg;
}

let originalDuration = 0;
function startTimer() {
  if (running) return;
  const input = parseInt(document.getElementById('set-minutes').value);
  if (!input || input < 1) return alert("⛔ Enter a valid number of minutes");

  duration = input * 60;
  originalDuration = duration;
  updateDisplay();
  running = true;
  timerId = setInterval(() => {
    if (duration > 0) {
      duration--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      running = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  running = false;
  duration = 0;
  document.getElementById('timer').textContent = "00:00";
  document.getElementById('motivation').textContent = "Stay focused and start strong 💪";
}
// unit converter
const units = {
  length: { km: 1000, m: 1, cm: 0.01, in: 0.0254, ft: 0.3048 },
  weight: { kg: 1, g: 0.001, lb: 0.4536 },
  temperature: { C: "C", F: "F", K: "K" }
};


function populateUnits() {
  const type = document.getElementById('unit-type').value;
  const from = document.getElementById('from-unit');
  const to = document.getElementById('to-unit');
  from.innerHTML = to.innerHTML = '';
  Object.keys(units[type]).forEach(u => {
    from.innerHTML += `<option value="${u}">${u}</option>`;
    to.innerHTML += `<option value="${u}">${u}</option>`;
  });
}
populateUnits();

function convertUnit() {
  const type = document.getElementById('unit-type').value;
  const val = parseFloat(document.getElementById('input-value').value);
  const from = document.getElementById('from-unit').value;
  const to = document.getElementById('to-unit').value;
  if (isNaN(val)) return alert("⛔ Enter a number to convert");

  let result = 0;
  if (type === 'temperature') {
    if (from === to) result = val;
    else if (from === 'C' && to === 'F') result = val * 9 / 5 + 32;
    else if (from === 'C' && to === 'K') result = val + 273.15;
    else if (from === 'F' && to === 'C') result = (val - 32) * 5 / 9;
    else if (from === 'F' && to === 'K') result = (val - 32) * 5 / 9 + 273.15;
    else if (from === 'K' && to === 'C') result = val - 273.15;
    else if (from === 'K' && to === 'F') result = (val - 273.15) * 9 / 5 + 32;
  } else {
    result = val * (units[type][from] / units[type][to]);

  }

  document.getElementById('conversion-result').textContent =
    `${val} ${from} = ${result.toFixed(4)} ${to}`;
}
