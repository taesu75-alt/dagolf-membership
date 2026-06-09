// ── 데이터 ──────────────────────────────────────────────────────
const TODAY = new Date('2026-06-04');
const ANNUAL_TOTAL = 80;

let executives = ['곽상효','김명산','정용혁','김태수','이해성','이상훈'];

let bookings = [
  {id:1, date:'2026-06-14', executive:'-', type:'event', status:'confirmed', credit:2},
  {id:2, date:'2026-06-21', executive:'김명산', type:'general', status:'pending', credit:2},
  {id:3, date:'2026-06-06', executive:'김태수', type:'general', status:'confirmed', credit:2},
  {id:4, date:'2026-06-03', executive:'곽상효', type:'general', status:'used', credit:1},
  {id:5, date:'2026-05-24', executive:'-', type:'event', status:'used', credit:2},
  {id:6, date:'2026-05-24', executive:'김명산', type:'general', status:'used', credit:2},
  {id:7, date:'2026-05-16', executive:'김명산', type:'general', status:'used', credit:2},
  {id:8, date:'2026-05-09', executive:'곽상효', type:'general', status:'used', credit:2},
  {id:9, date:'2026-05-05', executive:'-', type:'event', status:'used', credit:2},
  {id:10, date:'2026-04-28', executive:'-', type:'event', status:'used', credit:2},
  {id:11, date:'2026-04-25', executive:'-', type:'event', status:'used', credit:2},
  {id:12, date:'2026-04-17', executive:'김명산', type:'general', status:'used', credit:1},
  {id:13, date:'2026-04-11', executive:'정용혁', type:'general', status:'used', credit:2},
  {id:14, date:'2026-04-05', executive:'곽상효', type:'general', status:'used', credit:2},
  {id:15, date:'2026-04-04', executive:'-', type:'event', status:'used', credit:2},
  {id:16, date:'2026-04-04', executive:'-', type:'event', status:'used', credit:2},
  {id:17, date:'2026-03-29', executive:'-', type:'event', status:'used', credit:2},
  {id:18, date:'2026-03-22', executive:'정용혁', type:'general', status:'used', credit:2},
  {id:19, date:'2026-03-21', executive:'곽상효', type:'general', status:'used', credit:2},
  {id:20, date:'2026-03-07', executive:'김명산', type:'general', status:'used', credit:2},
  {id:21, date:'2026-03-02', executive:'김태수', type:'general', status:'used', credit:1},
  {id:22, date:'2026-02-21', executive:'곽상효', type:'general', status:'used', credit:2},
  {id:23, date:'2026-02-14', executive:'정용혁', type:'general', status:'used', credit:2},
];

let hist25 = [
  {date:'2025-12-21', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-12-06', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-11-29', executive:'-', type:'event', status:'used', credit:2},
  {date:'2025-11-23', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-11-01', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-10-19', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-10-11', executive:'이해성', type:'general', status:'used', credit:2},
  {date:'2025-10-10', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-10-02', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-09-27', executive:'이해성', type:'general', status:'used', credit:2},
  {date:'2025-09-14', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-09-07', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-08-31', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-08-09', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-08-02', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-07-19', executive:'-', type:'event', status:'used', credit:2},
  {date:'2025-07-19', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-07-13', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-07-12', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-06-21', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-06-14', executive:'곽상효', type:'general', status:'used', credit:2},
  {date:'2025-06-13', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-06-05', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-05-25', executive:'이상훈', type:'general', status:'used', credit:2},
  {date:'2025-05-23', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-05-17', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-05-10', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-04-20', executive:'김태수', type:'general', status:'used', credit:2},
  {date:'2025-04-13', executive:'이해성', type:'general', status:'used', credit:2},
  {date:'2025-04-12', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-03-23', executive:'정용혁', type:'general', status:'used', credit:2},
  {date:'2025-03-15', executive:'이해성', type:'general', status:'used', credit:2},
  {date:'2025-03-01', executive:'정용혁', type:'general', status:'used', credit:2},
];

let nextId = 100;
let histExpanded = false;
let calYear = 2026, calMonth = 5; // 0-indexed

// ── 유틸 ────────────────────────────────────────────────────────
function getDow(dateStr) {
  const d = new Date(dateStr);
  return d.getDay(); // 0=일,6=토
}
function isWeekend(dateStr) {
  const d = getDow(dateStr);
  return d === 0 || d === 6;
}
function isSat(dateStr) { return getDow(dateStr) === 6; }
function isSun(dateStr) { return getDow(dateStr) === 0; }
function getDowName(dateStr) {
  return ['일','월','화','수','목','금','토'][getDow(dateStr)];
}
function formatDate(dateStr) {
  const [y,m,d] = dateStr.split('-');
  return `${m}/${d}(${getDowName(dateStr)})`;
}
function autoStatus(dateStr, chosenStatus) {
  const d = new Date(dateStr);
  const diff = Math.floor((d - TODAY) / 86400000);
  if (chosenStatus === 'hope') return 'hope';
  if (diff < 0) return 'used';
  if (diff <= 21) return 'confirmed';
  return 'confirmed';
}
function computeCredit(dateStr, type) {
  if (type === 'event') return 2;
  return isWeekend(dateStr) ? 2 : 1;
}

// ── KPI 계산 ────────────────────────────────────────────────────
function computeKPI() {
  const confirmed = bookings.filter(b => ['used','confirmed'].includes(b.status));
  const annualUsed = confirmed.reduce((s,b) => s + b.credit, 0);
  const annualPct = annualUsed / ANNUAL_TOTAL * 100;

  const todayStr = '2026-06-04';
  const curM = 6; const nxtM = 7;

  function monthStats(m) {
    const mb = bookings.filter(b => {
      const bm = parseInt(b.date.split('-')[1]);
      return bm === m;
    });
    const conf = mb.filter(b => ['used','confirmed'].includes(b.status));
    const pend = mb.filter(b => ['pending','hope'].includes(b.status));

    const wd = conf.filter(b => b.type === 'general' && !isWeekend(b.date)).length;
    const we = conf.filter(b => b.type === 'general' && isWeekend(b.date));
    const ev = conf.filter(b => b.type === 'event').length;
    const sat = we.filter(b => isSat(b.date)).length;
    const sun = we.filter(b => isSun(b.date)).length;
    const wePend = pend.filter(b => b.type === 'general' && isWeekend(b.date)).length;
    return { wd, we: we.length, sat, sun, ev, wePend };
  }

  const cur = monthStats(curM);
  const nxt = monthStats(nxtM);

  // Update DOM
  document.getElementById('kpi-used').innerHTML = `${annualUsed} <span style="font-size:15px;color:#6b7280;font-weight:400">/ ${ANNUAL_TOTAL} cr</span>`;
  const bar = document.getElementById('kpi-bar');
  bar.style.width = annualPct + '%';
  bar.className = 'progress-fill' + (annualPct >= 90 ? ' danger' : annualPct >= 70 ? ' warn' : '');
  document.getElementById('kpi-remain').innerHTML = `잔여 <strong>${ANNUAL_TOTAL - annualUsed} cr</strong>`;

  // cur month
  document.getElementById('cur-wd').innerHTML = `${cur.wd} <span style="font-size:13px;color:#6b7280;font-weight:400">건</span>`;
  const weBadgeCur = cur.we >= 3 ? '<span class="badge badge-red">한도</span>' : cur.we >= 2 ? '<span class="badge badge-yellow">주의</span>' : '<span class="badge badge-blue">여유</span>';
  document.getElementById('cur-we-main').innerHTML = `${cur.we} <span style="font-size:13px;color:#6b7280;font-weight:400">/ 3</span> ${weBadgeCur}${cur.wePend ? `<span class="muted">(+${cur.wePend} 미확정)</span>` : ''}`;
  const satBadgeCur = cur.sat >= 2 ? '<span class="badge badge-red">한도</span>' : cur.sat >= 1 ? '<span class="badge badge-yellow">주의</span>' : '<span class="badge badge-blue">여유</span>';
  document.getElementById('cur-we-sub').innerHTML = `<span>토 <strong>${cur.sat}</strong>/2 ${satBadgeCur}</span><span>일 <strong>${cur.sun}</strong></span>`;
  document.getElementById('cur-ev').innerHTML = `${cur.ev} <span style="font-size:13px;color:#6b7280;font-weight:400">건</span>`;

  // nxt month
  document.getElementById('nxt-wd').innerHTML = `${nxt.wd} <span style="font-size:13px;color:#6b7280;font-weight:400">건</span>`;
  const weBadgeNxt = nxt.we >= 3 ? '<span class="badge badge-red">한도</span>' : nxt.we >= 2 ? '<span class="badge badge-yellow">주의</span>' : '<span class="badge badge-blue">여유</span>';
  document.getElementById('nxt-we-main').innerHTML = `${nxt.we} <span style="font-size:13px;color:#6b7280;font-weight:400">/ 3</span> ${weBadgeNxt}${nxt.wePend ? `<span class="muted">(+${nxt.wePend} 미확정)</span>` : ''}`;
  const satBadgeNxt = nxt.sat >= 2 ? '<span class="badge badge-red">한도</span>' : nxt.sat >= 1 ? '<span class="badge badge-yellow">주의</span>' : '<span class="badge badge-blue">여유</span>';
  document.getElementById('nxt-we-sub').innerHTML = `<span>토 <strong>${nxt.sat}</strong>/2 ${satBadgeNxt}</span><span>일 <strong>${nxt.sun}</strong></span>`;
  document.getElementById('nxt-ev').innerHTML = `${nxt.ev} <span style="font-size:13px;color:#6b7280;font-weight:400">건</span>`;
}

// ── 달력 ────────────────────────────────────────────────────────
function renderCalendar() {
  const mNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  document.getElementById('cal-title').textContent = `${calYear}년 ${mNames[calMonth]}`;
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';
  ['일','월','화','수','목','금','토'].forEach(d => {
    const div = document.createElement('div');
    div.className = 'cal-dow';
    div.textContent = d;
    grid.appendChild(div);
  });
  const first = new Date(calYear, calMonth, 1).getDay();
  const days = new Date(calYear, calMonth + 1, 0).getDate();
  const prevDays = new Date(calYear, calMonth, 0).getDate();
  let cells = [];
  for (let i = first - 1; i >= 0; i--) cells.push({d: prevDays - i, cur: false});
  for (let i = 1; i <= days; i++) cells.push({d: i, cur: true});
  while (cells.length % 7 !== 0) cells.push({d: cells.length - days - first + 1, cur: false});

  cells.forEach(cell => {
    const div = document.createElement('div');
    const dateStr = cell.cur ? `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(cell.d).padStart(2,'0')}` : null;
    const dow = dateStr ? getDow(dateStr) : null;
    div.className = 'cal-day' + (!cell.cur ? ' other-month' : '') + (dow === 6 ? ' sat' : '') + (dow === 0 ? ' sun' : '') + (dateStr === '2026-06-04' ? ' today' : '');
    div.innerHTML = `<div class="cal-dnum">${cell.d}</div><div class="cal-dots" id="dots-${dateStr || 'x'+cell.d}"></div>`;
    if (cell.cur) {
      div.onclick = () => { document.getElementById('f-date').value = dateStr; onDateChange(); };
    }
    grid.appendChild(div);
  });

  bookings.forEach(b => {
    const el = document.getElementById('dots-' + b.date);
    if (!el) return;
    const dot = document.createElement('div');
    dot.className = 'cal-dot ' + (b.type === 'event' ? 'dot-event' : b.status === 'used' ? 'dot-used' : b.status === 'confirmed' ? 'dot-confirmed' : b.status === 'pending' ? 'dot-pending' : 'dot-hope');
    el.appendChild(dot);
  });
}
function calPrev() { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); }
function calNext() { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); }

// ── 예약 목록 ────────────────────────────────────────────────────
function renderList() {
  const todayStr = '2026-06-04';
  const future = bookings.filter(b => b.date >= todayStr).sort((a,b) => a.date.localeCompare(b.date));
  const past = bookings.filter(b => b.date < todayStr).sort((a,b) => b.date.localeCompare(a.date));

  document.getElementById('hist-toggle').textContent = histExpanded
    ? `▲ 접기`
    : `▼ 과거 이용 내역 펼치기 (${past.length}건)`;
  document.getElementById('past-table').style.display = histExpanded ? '' : 'none';

  function rowHTML(b, showActions) {
    const typeLabel = b.type === 'event' ? '<span class="type-badge t-event">이벤트</span>' : '<span class="type-badge t-general">일반</span>';
    const statusMap = {used:'<span class="status-badge s-used">사용</span>', confirmed:'<span class="status-badge s-confirmed">예약</span>', pending:'<span class="status-badge s-pending">미확정</span>', hope:'<span class="status-badge s-hope">희망</span>'};
    const actions = showActions ? `
      ${b.status === 'pending' || b.status === 'hope' ? `<button class="action-btn btn-confirm" onclick="confirmBooking(${b.id})">확정</button> ` : ''}
      <button class="action-btn btn-delete" onclick="deleteBooking(${b.id})">삭제</button>
    ` : '';
    return `<tr>
      <td>${formatDate(b.date)}</td>
      <td>${b.executive === '-' ? '<span style="color:#9ca3af">-</span>' : b.executive}</td>
      <td>${typeLabel}</td>
      <td>${statusMap[b.status] || b.status}</td>
      <td class="num">${b.credit}</td>
      <td>${actions}</td>
    </tr>`;
  }

  document.getElementById('future-list').innerHTML = future.map(b => rowHTML(b, true)).join('') || '<tr><td colspan="6" style="text-align:center;color:#9ca3af;padding:16px">예정된 예약이 없습니다</td></tr>';
  document.getElementById('past-list').innerHTML = past.map(b => rowHTML(b, false)).join('');
}

function toggleHistory() {
  histExpanded = !histExpanded;
  renderList();
}

function confirmBooking(id) {
  const b = bookings.find(x => x.id === id);
  if (!b) return;
  const diff = Math.floor((new Date(b.date) - TODAY) / 86400000);
  b.status = diff <= 21 ? 'confirmed' : 'confirmed';
  refresh();
}

function deleteBooking(id) {
  bookings = bookings.filter(x => x.id !== id);
  refresh();
}

// ── 폼 ──────────────────────────────────────────────────────────
function onDateChange() {
  const dateStr = document.getElementById('f-date').value;
  const type = document.getElementById('f-type').value;
  if (!dateStr) return;
  updateCrDisplay(dateStr, type);
}
function onTypeChange() {
  const dateStr = document.getElementById('f-date').value;
  const type = document.getElementById('f-type').value;
  const execGroup = document.getElementById('fg-exec');
  const execSel = document.getElementById('f-exec');
  if (type === 'event') {
    execGroup.style.opacity = '0.5';
    execSel.disabled = true;
    execSel.value = '';
  } else {
    execGroup.style.opacity = '1';
    execSel.disabled = false;
  }
  if (dateStr) updateCrDisplay(dateStr, type);
}
function updateCrDisplay(dateStr, type) {
  const cr = computeCredit(dateStr, type);
  const dowName = getDowName(dateStr);
  const isWE = isWeekend(dateStr);
  const typeLabel = type === 'event' ? '이벤트' : (isWE ? '주말' : '평일');
  document.getElementById('cr-display').innerHTML = `<div class="cr-info">${dowName}요일 · ${typeLabel} → 자동 계산: <strong>${cr} cr</strong></div>`;

  // 한도 체크
  if (type === 'general' && isWE) {
    const m = parseInt(dateStr.split('-')[1]);
    const weCount = bookings.filter(b => {
      const bm = parseInt(b.date.split('-')[1]);
      return bm === m && b.type === 'general' && isWeekend(b.date) && ['used','confirmed','pending'].includes(b.status);
    }).length;
    const satCount = bookings.filter(b => {
      const bm = parseInt(b.date.split('-')[1]);
      return bm === m && b.type === 'general' && isSat(b.date) && ['used','confirmed','pending'].includes(b.status);
    }).length;
    let warn = '';
    if (weCount >= 3) warn = '⚠ 해당 월 주말 사용 한도(3회)에 도달했습니다.';
    else if (isSat(dateStr) && satCount >= 2) warn = '⚠ 해당 월 토요일 사용 한도(2회)에 도달했습니다.';
    document.getElementById('cr-limit-warn').innerHTML = warn ? `<div class="cr-warn">${warn}</div>` : '';
  } else {
    document.getElementById('cr-limit-warn').innerHTML = '';
  }
}
function resetForm() {
  document.getElementById('f-date').value = '';
  document.getElementById('f-type').value = 'general';
  document.getElementById('f-exec').value = '';
  document.getElementById('f-status').value = 'hope';
  document.getElementById('cr-display').innerHTML = '';
  document.getElementById('cr-limit-warn').innerHTML = '';
  document.getElementById('fg-exec').style.opacity = '1';
  document.getElementById('f-exec').disabled = false;
}
function addBooking() {
  const dateStr = document.getElementById('f-date').value;
  const type = document.getElementById('f-type').value;
  const exec = document.getElementById('f-exec').value;
  const chosenStatus = document.getElementById('f-status').value;
  if (!dateStr) { alert('날짜를 선택하세요.'); return; }
  if (type === 'general' && !exec) { alert('임원을 선택하세요.'); return; }

  // 한도 체크
  if (type === 'general' && isWeekend(dateStr) && chosenStatus !== 'hope') {
    const m = parseInt(dateStr.split('-')[1]);
    const weCount = bookings.filter(b => {
      const bm = parseInt(b.date.split('-')[1]);
      return bm === m && b.type === 'general' && isWeekend(b.date) && ['used','confirmed','pending'].includes(b.status);
    }).length;
    const satCount = bookings.filter(b => {
      const bm = parseInt(b.date.split('-')[1]);
      return bm === m && b.type === 'general' && isSat(b.date) && ['used','confirmed','pending'].includes(b.status);
    }).length;
    if (weCount >= 3) { alert('주말 사용 한도(월 3회)를 초과합니다.'); return; }
    if (isSat(dateStr) && satCount >= 2) { alert('토요일 사용 한도(월 2회)를 초과합니다.'); return; }
  }

  const finalStatus = autoStatus(dateStr, chosenStatus);
  const cr = computeCredit(dateStr, type);
  bookings.push({ id: nextId++, date: dateStr, executive: exec || '-', type, status: finalStatus, credit: cr });
  resetForm();
  refresh();
}

// ── 통계 탭 ──────────────────────────────────────────────────────
function renderStats() {
  const confirmed = bookings.filter(b => ['used','confirmed'].includes(b.status));

  // 임원별
  const tbody = document.getElementById('exec-stat-body');
  const maxCr = Math.max(...executives.map(ex => confirmed.filter(b => b.executive === ex).reduce((s,b) => s+b.credit, 0)), 1);
  tbody.innerHTML = executives.map(ex => {
    const exB = confirmed.filter(b => b.executive === ex);
    const wd = exB.filter(b => b.type === 'general' && !isWeekend(b.date)).length;
    const we = exB.filter(b => b.type === 'general' && isWeekend(b.date)).length;
    const ev = exB.filter(b => b.type === 'event').length;
    const cr = exB.reduce((s,b) => s+b.credit, 0);
    const pct = Math.round(cr / maxCr * 100);
    return `<tr>
      <td>${ex}</td>
      <td class="r">${wd}</td>
      <td class="r">${we}</td>
      <td class="r">${ev}</td>
      <td class="r">${cr} <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%"></div></div></td>
    </tr>`;
  }).join('');

  // 이벤트 행
  const evB = confirmed.filter(b => b.type === 'event');
  const evCr = evB.reduce((s,b) => s+b.credit, 0);
  const evPct = Math.round(evCr / maxCr * 100);
  tbody.innerHTML += `<tr style="background:#fff7ed">
    <td><span style="color:#c2410c;font-weight:600">이벤트 계</span></td>
    <td class="r">-</td><td class="r">-</td>
    <td class="r">${evB.length}</td>
    <td class="r">${evCr} <div class="bar-wrap"><div class="bar-fill" style="width:${evPct}%;background:#d97706"></div></div></td>
  </tr>`;

  // 월별 크레딧 매트릭스
  const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  let tbl = `<thead><tr><th>임원</th>${months.map(m=>`<th class="r">${m}</th>`).join('')}<th class="r">합계</th></tr></thead><tbody>`;
  executives.forEach(ex => {
    const row = Array.from({length:12}, (_,i) => {
      const m = i+1;
      return confirmed.filter(b => b.executive === ex && parseInt(b.date.split('-')[1]) === m).reduce((s,b) => s+b.credit, 0);
    });
    const total = row.reduce((s,v) => s+v, 0);
    tbl += `<tr><td>${ex}</td>${row.map(v => `<td class="r">${v > 0 ? v : '-'}</td>`).join('')}<td class="r"><strong>${total}</strong></td></tr>`;
  });
  tbl += '</tbody>';
  document.getElementById('monthly-table').innerHTML = tbl;

  // 월별 한도 현황
  let ltbl = `<thead><tr><th>월</th><th class="r">주말</th><th class="r">토</th><th class="r">일</th><th>주말 상태</th></tr></thead><tbody>`;
  for (let m = 1; m <= 6; m++) {
    const mb = bookings.filter(b => parseInt(b.date.split('-')[1]) === m && ['used','confirmed','pending'].includes(b.status));
    const we = mb.filter(b => b.type === 'general' && isWeekend(b.date)).length;
    const sat = mb.filter(b => b.type === 'general' && isSat(b.date)).length;
    const sun = mb.filter(b => b.type === 'general' && isSun(b.date)).length;
    const badge = we > 3 ? '<span class="badge badge-red">초과</span>' : we === 3 ? '<span class="badge badge-red">한도</span>' : we >= 2 ? '<span class="badge badge-yellow">주의</span>' : '<span class="badge badge-blue">여유</span>';
    ltbl += `<tr><td>${m}월</td><td class="r">${we}/3</td><td class="r">${sat}/2</td><td class="r">${sun}</td><td>${badge}</td></tr>`;
  }
  ltbl += '</tbody>';
  document.getElementById('monthly-limit-table').innerHTML = ltbl;
}

// ── 2025 이력 ────────────────────────────────────────────────────
function renderHist25() {
  const tbody = document.getElementById('hist25-body');
  tbody.innerHTML = hist25.map(b => {
    const typeLabel = b.type === 'event' ? '<span class="type-badge t-event">이벤트</span>' : '<span class="type-badge t-general">일반</span>';
    return `<tr>
      <td>${formatDate(b.date)}</td>
      <td>${b.executive === '-' ? '<span style="color:#9ca3af">-</span>' : b.executive}</td>
      <td>${typeLabel}</td>
      <td><span class="status-badge s-used">사용</span></td>
      <td class="num">${b.credit}</td>
    </tr>`;
  }).join('');
}

// ── 관리자 ───────────────────────────────────────────────────────
function toggleAdmin() {
  const p = document.getElementById('admin-panel');
  const btn = event.currentTarget;
  if (p.style.display === 'none' || !p.style.display) {
    p.style.display = 'block';
    btn.textContent = '▲ 관리자 모드 — 임원 관리';
  } else {
    p.style.display = 'none';
    btn.textContent = '▼ 관리자 모드 — 임원 관리';
  }
}
function renderExecList() {
  const list = document.getElementById('exec-list');
  list.innerHTML = executives.map((ex, i) => `
    <div class="exec-chip">
      <input type="text" value="${ex}" id="exec-inp-${i}" onchange="updateExec(${i}, this.value)">
      <button onclick="removeExec(${i})" title="삭제">✕</button>
    </div>
  `).join('');

  // 폼 드롭다운 업데이트
  const sel = document.getElementById('f-exec');
  const cur = sel.value;
  sel.innerHTML = '<option value="">선택</option>' + executives.map(ex => `<option${ex===cur?' selected':''}>${ex}</option>`).join('');
}
function updateExec(i, val) { executives[i] = val; renderExecList(); renderStats(); }
function removeExec(i) {
  if (!confirm(`'${executives[i]}'을 삭제하시겠습니까? 예약 기록은 유지됩니다.`)) return;
  executives.splice(i, 1);
  renderExecList();
  renderStats();
}
function addExec() {
  const inp = document.getElementById('new-exec-name');
  const name = inp.value.trim();
  if (!name) return;
  if (executives.includes(name)) { alert('이미 존재하는 임원입니다.'); return; }
  executives.push(name);
  inp.value = '';
  renderExecList();
  renderStats();
}

// ── 탭 전환 ─────────────────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'stats') renderStats();
  if (id === 'hist25') renderHist25();
}

// ── 전체 새로고침 ─────────────────────────────────────────────────
function refresh() {
  computeKPI();
  renderCalendar();
  renderList();
  renderExecList();
