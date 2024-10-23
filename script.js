let currentDate = new Date(2024, 8);
let startDate = null;
let endDate = null;

function toggleCalendar() {
  const modal = document.getElementById("calendarModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function renderCalendar() {
  const months = [
    currentDate.getMonth(),
    currentDate.getMonth() + 1,
    currentDate.getMonth() + 2,
  ];
  const year = currentDate.getFullYear();

  months.forEach((month, index) => {
    const monthYearElement = document.querySelectorAll(".month-year")[index];
    monthYearElement.textContent = `${new Date(year, month).toLocaleString(
      "default",
      { month: "long" }
    )} ${year}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const midCalendarDays =
      document.querySelectorAll(".mid_calendar-days")[index];
    midCalendarDays.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("p");
      midCalendarDays.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("p");

      if (month === currentDate.getMonth() + 1 && day === 1) {
        dayCell.style.backgroundColor = "#0076F5";
        dayCell.style.color = "white";
        dayCell.style.border = "3px solid #0076F5";
        dayCell.style.borderRadius = "1px";
        dayCell.style.textAlign = "center";
      } else if (month === currentDate.getMonth() + 2 && day === 1) {
        dayCell.style.backgroundColor = "#0076F5";
        dayCell.style.color = "white";
        dayCell.style.border = "3px solid #0076F5";
        dayCell.style.borderRadius = "2px";
        dayCell.style.textAlign = "center";
      } else if (month === currentDate.getMonth() + 1) {
        dayCell.style.backgroundColor = "#F2F8FE";
        dayCell.style.color = "#0076F5";
      }

      dayCell.textContent = day;
      midCalendarDays.appendChild(dayCell);

      dayCell.addEventListener("click", () => {
        const selectedDate = new Date(year, month, day);

        if (!startDate || endDate) {
          startDate = selectedDate;
          endDate = null;
          highlightDate(dayCell, true);
        } else {
          endDate = selectedDate;

          highlightRange(startDate, endDate);
          console.log(
            `Период с ${startDate.getDate()} по ${endDate.getDate()}`
          );

          startDate = null;
          endDate = null;
        }
      });
    }
  });
}

function highlightDate(cell, isSelected) {
  if (isSelected) {
    cell.style.border = "3px solid blue";
  } else {
    cell.style.border = "";
  }
}

function highlightRange(start, end) {
  const startMonthIndex = start.getMonth();
  const endMonthIndex = end.getMonth();
  const startDay = start.getDate();
  const endDay = end.getDate();

  const midCalendarDaysElements =
    document.querySelectorAll(".mid_calendar-days");

  for (
    let monthIndex = startMonthIndex;
    monthIndex <= endMonthIndex;
    monthIndex++
  ) {
    if (midCalendarDaysElements[monthIndex]) {
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        monthIndex + 1,
        0
      ).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const cellIndex =
          day + (monthIndex === startMonthIndex ? start.getDay() : 0) - 1;
        const cell = midCalendarDaysElements[monthIndex].children[cellIndex];

        if (cell) {
          if (
            (monthIndex === startMonthIndex && day >= startDay) ||
            (monthIndex === endMonthIndex && day <= endDay) ||
            (monthIndex > startMonthIndex && monthIndex < endMonthIndex)
          ) {
            highlightDate(cell, true);
          }
        }
      }
    }
  }
}

renderCalendar();
