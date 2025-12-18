let currentMonth = 0; // январь = 0
let currentYear = 2026;

const monthNames = [
  "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];

const holidays = {
  '2026-01-01': true,
  '2026-01-02': true,
  '2026-01-03': true,
  '2026-01-04': true,
  '2026-01-05': true,
  '2026-01-06': true,
  '2026-01-07': true,
  '2026-01-08': true,
  '2026-02-23': true,
  '2026-03-08': true,
  '2026-05-01': true,
  '2026-05-09': true,
  '2026-06-12': true,
  '2026-11-04': true
};

const monthYearElement = document.getElementById('monthYear');
const calendarBody = document.querySelector('#calendarTable tbody');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

function displayCalendar(month, year) {
  calendarBody.innerHTML = '';
  monthYearElement.textContent = `${monthNames[month]} ${year}`;

  // Первый день месяца: 0 = вс, 1 = пн, ..., 6 = сб
  const firstDay = new Date(year, month, 1).getDay();
  // Приводим к понедельничной сетке: пн = 0, ..., вс = 6
  const firstDayIndex = (firstDay === 0) ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let day = 1;

  for (let week = 0; week < 6; week++) {
    const row = document.createElement('tr');
    for (let weekday = 0; weekday < 7; weekday++) {
      const cell = document.createElement('td');

      if (week === 0 && weekday < firstDayIndex) {
        cell.classList.add('empty-cell');
      } else if (day <= daysInMonth) {
        cell.textContent = day;

        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0 = вс, 6 = сб
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Выходные: суббота (6) и воскресенье (0)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          cell.classList.add('weekend');
        }

        // Праздники
        if (holidays[dateStr]) {
          cell.classList.add('holiday');
        }

        day++;
      } else {
        cell.classList.add('empty-cell');
      }

      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (day > daysInMonth) break;
  }
}

// Навигация
prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  displayCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  displayCalendar(currentMonth, currentYear);
});

// Показать январь 2026
displayCalendar(currentMonth, currentYear);
