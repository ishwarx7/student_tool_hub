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
