// Turns the home page into a PlanWell week: live dates, recurring classes,
// sideways scrolling. Everything readable is in the HTML; this only decorates.
(function () {
  const grid = document.getElementById("grid");
  const scroller = document.getElementById("scroller");
  if (!grid || !scroller) return;

  const COLS = 112;
  const FIRST_PERIOD_ROW = 3;
  const PERIOD_STARTS = ["08:00", "08:40", "09:20", "10:20", "10:55", "11:30", "12:05", "12:40", "13:15", "13:55"];
  const LUNCH = 7;
  const CLASSES = ["7A", "7B", "8", "9", "10", "6A", "6B", "6BD", "11B"];
  const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const wide = window.matchMedia("(min-width: 821px) and (min-height: 641px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  grid.style.setProperty("--cols", COLS);

  // Column 1 is the Monday of the current week, so "today" is always in view.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const dateFor = (col) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + col - 1);
    return d;
  };

  const days = document.getElementById("days");
  const frag = document.createDocumentFragment();
  for (let c = 1; c <= COLS; c++) {
    const d = dateFor(c);
    const el = document.createElement("div");
    el.className = "day";
    if (d.getDay() === 0 || d.getDay() === 6) el.classList.add("we");
    if (d.getTime() === today.getTime()) el.classList.add("today");
    el.style.gridColumn = c;
    el.innerHTML = DAY_NAMES[d.getDay()] + "<b>" + d.getDate() + "</b>";
    frag.appendChild(el);
  }
  days.appendChild(frag);

  // Recurring classes fill the empty periods, the same every week, like a real timetable.
  function occupied() {
    const taken = new Set();
    grid.querySelectorAll(".block").forEach((el) => {
      const cs = getComputedStyle(el);
      const c0 = parseInt(cs.gridColumnStart, 10), c1 = parseInt(cs.gridColumnEnd, 10);
      const r0 = parseInt(cs.gridRowStart, 10), r1 = parseInt(cs.gridRowEnd, 10);
      if ([c0, c1, r0, r1].some(isNaN)) return;
      for (let c = c0 - 1; c <= c1; c++) for (let r = r0; r < r1; r++) taken.add(c + ":" + r);
    });
    return taken;
  }

  function currentPeriod() {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    let found = -1;
    PERIOD_STARTS.forEach((t, i) => {
      const [h, m] = t.split(":").map(Number);
      if (mins >= h * 60 + m) found = i;
    });
    return mins < 14 * 60 + 35 ? found : -1;
  }

  let classesDrawn = false;
  function drawClasses() {
    if (classesDrawn || !wide.matches) return;
    classesDrawn = true;
    const taken = occupied();
    const nowPeriod = currentPeriod();
    const out = document.createDocumentFragment();
    let i = 0;
    for (let c = 1; c <= COLS; c++) {
      const d = dateFor(c);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      for (let p = 0; p < PERIOD_STARTS.length; p++) {
        if (p === LUNCH) continue;
        const seed = (dow * 31 + p * 17) % 23; // same pattern every week
        if (seed % 3 === 0) continue;
        const row = FIRST_PERIOD_ROW + p;
        if (taken.has(c + ":" + row)) continue;
        const chip = document.createElement("span");
        chip.className = "chip klass";
        chip.setAttribute("aria-hidden", "true");
        if (d.getTime() === today.getTime() && p === nowPeriod) chip.classList.add("now");
        chip.style.gridColumn = c;
        chip.style.gridRow = row;
        chip.style.setProperty("--i", i++ % 60);
        chip.textContent = CLASSES[(seed + p) % CLASSES.length];
        out.appendChild(chip);
      }
    }
    grid.appendChild(out);
  }

  function clearClasses() {
    grid.querySelectorAll(".chip.klass").forEach((el) => el.remove());
    classesDrawn = false;
  }

  // Big month title in the bar follows the scroll, like the app's header.
  const month = document.getElementById("month");
  const colWidth = () => {
    const first = days.firstElementChild;
    return first ? first.getBoundingClientRect().width : 56;
  };
  function updateMonth() {
    const col = Math.max(1, Math.min(COLS, Math.round(scroller.scrollLeft / colWidth()) + 1));
    const d = dateFor(col + 3);
    month.innerHTML = MONTHS[d.getMonth()] + " <span>" + d.getFullYear() + "</span>";
  }

  // Vertical wheel scrolls the week sideways.
  scroller.addEventListener("wheel", (e) => {
    if (!wide.matches || e.ctrlKey) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? scroller.clientWidth : 1;
    scroller.scrollLeft += e.deltaY * unit;
  }, { passive: false });

  // Section links scroll the week to that column.
  function goTo(id, smooth) {
    const sec = document.getElementById(id);
    if (!sec) return false;
    if (!wide.matches) {
      sec.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "auto" });
      return true;
    }
    const col = parseInt(sec.dataset.col || "1", 10);
    scroller.scrollTo({ left: (col - 1) * colWidth(), behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    return true;
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (goTo(id, true)) {
        e.preventDefault();
        history.replaceState(null, "", "#" + id);
      }
    });
  });

  // Keyboard: arrow keys and Page Up/Down move a week at a time when the page itself has focus.
  document.addEventListener("keydown", (e) => {
    if (!wide.matches || e.target !== document.body) return;
    const week = colWidth() * 7;
    const map = { ArrowRight: week / 2, ArrowLeft: -week / 2, PageDown: week, PageUp: -week, End: 1e6, Home: -1e6 };
    if (!(e.key in map)) return;
    e.preventDefault();
    scroller.scrollBy({ left: map[e.key], behavior: reduceMotion ? "auto" : "smooth" });
  });

  function layout() {
    if (wide.matches) drawClasses();
    else clearClasses();
    updateMonth();
  }
  wide.addEventListener("change", layout);
  scroller.addEventListener("scroll", () => requestAnimationFrame(updateMonth), { passive: true });
  layout();
  if (location.hash) goTo(location.hash.slice(1), false);
})();
