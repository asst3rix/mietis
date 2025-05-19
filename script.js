const today = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = document.querySelector("#days");
const date = document.querySelector("#date");
const monthsSelector = document.querySelector("#monthsSelector");
const yearsSelector = document.querySelector("#yearsSelector");
const monthDownButton = document.querySelector("#monthDown");
const monthUpButton = document.querySelector("#monthUp");
const todayButton = document.querySelector("#today");

setToday();

/**** EVENT LISTENERS ****/

monthsSelector.addEventListener("change", changeMonth);

monthDownButton.addEventListener("click", () => {
    if (monthsSelector.value !== "0") {
        monthsSelector.value--;
    }
    changeMonth();
});

monthUpButton.addEventListener("click", () => {
    if (monthsSelector.value !== "11") {
        monthsSelector.value++;
    }
    changeMonth();
});

todayButton.addEventListener("click", setToday);

/**** FUNCTIONS ****/

function changeMonth() {
    const month = parseInt(monthsSelector.value);
    const year = parseInt(yearsSelector.textContent);
    createMonth(getMonthInfo(year, month));
}

function getMonthInfo(year, indexMonth) {
    const indexFirstDay = new Date(year, indexMonth, 1).getDay();
    const indexLastDay = new Date(year, indexMonth + 1, 0).getDay();
    const totalDays = new Date(year, indexMonth + 1, 0).getDate();
    const totalDaysPreviousMonth = new Date(year, indexMonth, 0).getDate();

    return { indexFirstDay, indexLastDay, totalDays, totalDaysPreviousMonth, indexMonth, year };
}

// Create a day with his number associated.
function createDay(month, numberAssociated, cssClass, isToday = false) {
    const calendarCell = document.createElement("div");
    calendarCell.classList.add("calendarCell");
    if (isToday) {
        calendarCell.classList.add("isToday");
    } else {
        calendarCell.classList.add(cssClass);
    }

    const day = document.createElement("p");
    day.textContent = numberAssociated.toString();
    day.classList.add("day");

    if (cssClass === "current-month") {
        day.addEventListener("click", () => {
            showDayDetails(month, numberAssociated);
        });

        const total = document.createElement("p");
        total.textContent = "34,22€";
        total.classList.add("total");

        calendarCell.appendChild(day);
        calendarCell.appendChild(total);
    } else {
        calendarCell.appendChild(day);
    }

    days.appendChild(calendarCell);
}

function createMonth(month) {
    // We delete the existing month
    wipe(days);

    /**** PREVIOUS MONTH CREATION ****/
    // If month.indexFirstDay === Sunday, we need to show 6 days.
    // Else we need to show (month.firstDay - 1) days.
    const daysToShow = month.indexFirstDay === 0 ? 6 : month.indexFirstDay - 1;
    // Example here with August 2025:
    // month.totalDaysPreviousMonth = 31
    // daysToShow = 4 (5 (Friday) - 1)
    // startDay = 28.
    const startDay = month.totalDaysPreviousMonth - daysToShow + 1;
    for (let dayNumber = startDay; dayNumber <= month.totalDaysPreviousMonth; dayNumber++) {
        createDay(month, dayNumber, "previous-month");
    }

    /**** CURRENT MONTH CREATION ****/
    // We create the current month from 1 to month.totalDays.
    for (let dayNumber = 1; dayNumber <= month.totalDays; dayNumber++) {
        if (dayNumber === today.getDate() && month.indexMonth === today.getMonth() && month.year === today.getFullYear()) {
            const isToday = true;
            createDay(month, dayNumber, "current-month", isToday);
        } else {
            createDay(month, dayNumber, "current-month");
        }
    }

    /**** NEXT MONTH CREATION ****/
    if (month.indexLastDay !== 0) {
        // We create the next month from 1 to how many days we can fit in the remaining week.
        // We use month.indexLastDay to calculate how many days we need to create.
        // Example on June 2025:
        // month.indexLastDay = 1 (Monday), so we need to create 6 days.
        for (let dayNumber = 1; dayNumber <= 7 - month.indexLastDay; dayNumber++) {
            createDay(month, dayNumber, "next-month");
        }
    }
}

function setToday() {
    const currentMonth = today.getMonth();
    const currentYear = yearsSelector.textContent;
    const currentMonthInfo = getMonthInfo(currentYear, currentMonth);
    const dayOfToday = today.getDate();

    monthsSelector.value = currentMonth;
    changeMonth();
    showDayDetails(currentMonthInfo, dayOfToday);
}

function showDayDetails(month, numberOfTheDay) {
    // We delete previous data
    wipe(date);

    const dayNumber = document.createElement("p");
    const dayLabel = document.createElement("p");

    // We retrieve which day of the week we want to put
    const dayIndex = new Date(month.year, month.indexMonth, numberOfTheDay).getDay();

    dayNumber.textContent = numberOfTheDay;
    dayLabel.textContent = daysOfWeek[dayIndex];

    date.appendChild(dayNumber);
    date.appendChild(dayLabel);
}

function wipe(element) {
    while (element.firstChild) {
        element.firstChild.remove()
    }
}