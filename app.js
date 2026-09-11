const TYPE_LABELS = {
  lecture: "Лекція",
  practice: "По 2 тижні",
  lab: "Лабораторна",
};

const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const els = {
  theadRow: document.querySelector(".schedule thead tr"),
  tbody: document.querySelector(".schedule tbody"),
};

function init() {
  renderHeader();
  renderBody();
}

function renderHeader() {
  SCHEDULE.days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    els.theadRow.appendChild(th);
  });
}

function renderBody() {
  els.tbody.innerHTML = "";
  const week = SCHEDULE.weeks[1];

  SCHEDULE.pairs.forEach((pair, pairIndex) => {
    const tr = document.createElement("tr");

    const pairTd = document.createElement("td");
    pairTd.className = "pair-cell";
    pairTd.innerHTML = `
      <div class="pair-num">${pair.number}</div>
      <div class="pair-time">${pair.time}</div>
    `;
    tr.appendChild(pairTd);

    DAY_KEYS.forEach((dayKey) => {
      const td = document.createElement("td");
      const lesson = week?.[dayKey]?.[pairIndex] ?? null;
      td.appendChild(renderCell(lesson));
      tr.appendChild(td);
    });

    els.tbody.appendChild(tr);
  });
}

function renderCell(lesson) {
  if (!lesson) {
    const empty = document.createElement("div");
    empty.className = "empty-cell";
    return empty;
  }

  const card = document.createElement("div");
  card.className = `lesson-card lesson-card--${lesson.type}`;

  card.innerHTML = `
    <div class="type">${TYPE_LABELS[lesson.type] ?? lesson.type}</div>
    <div class="subject">${lesson.subject ?? ""}</div>
    ${lesson.teacher ? `<div class="teacher">${lesson.teacher}</div>` : ""}
    ${lesson.room ? `<div class="room">${lesson.room}</div>` : ""}
  `;
  return card;
}

init();
