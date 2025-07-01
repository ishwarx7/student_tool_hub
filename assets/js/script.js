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
    const gradeMap = {'A+':10,'A':9,'B+':8,'B':7,'C+':6,'C':5,'D':4,'F':0};
function calcGPA(){
  const g = document.getElementById('grades').value.toUpperCase().split(',');
  const v = g.filter(x => gradeMap[x.trim()]!=undefined);
  if(!v.length) return document.getElementById('gpa-result').textContent = "❌ Enter valid grades!";
  const gpa = v.reduce((a,x)=>a+gradeMap[x.trim()],0)/v.length;
  let msg = gpa>=9 ? "🌟 Excellent!" : gpa>=7 ? "👍 Good Job!" : gpa>=5 ? "🙂 Keep Improving" : "⚠️ Needs Work";
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