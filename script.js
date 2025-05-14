const today = new Date();
const days = document.querySelector("#days");
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
    createMonth(getMonthData(year, month));
}

function getMonthData(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const totalDaysPreviousMonth = new Date(year, month, 0).getDate();

    return { firstDay, lastDay, totalDays, totalDaysPreviousMonth };
}

// Create a day with his number associated.
function createDay(numberAssociated, cssClass) {
    const day = document.createElement("div");
    day.textContent = numberAssociated.toString();
    day.classList.add(cssClass);
    days.appendChild(day);
}

function createMonth(month) {
    // We delete the existing month
    while (days.firstChild) {
        days.firstChild.remove()
    }

    /**** PREVIOUS MONTH CREATION ****/
    // If month.firstDay === Sunday, we need to show 6 days.
    // Else we need to show (month.firstDay - 1) days.
    const daysToShow = month.firstDay === 0 ? 6 : month.firstDay - 1;
    // Example here with August 2025:
    // month.totalDaysPreviousMonth = 31
    // daysToShow = 4 (5 (Friday) - 1)
    // startDay = 28.
    const startDay = month.totalDaysPreviousMonth - daysToShow + 1;
    for (let dayNumber = startDay; dayNumber <= month.totalDaysPreviousMonth; dayNumber++) {
        createDay(dayNumber, "previous-month");
    }

    /**** CURRENT MONTH CREATION ****/
    // We create the current month from 1 to month.totalDays.
    for (let dayNumber = 1; dayNumber <= month.totalDays; dayNumber++) {
        createDay(dayNumber, "current-month");
    }

    /**** NEXT MONTH CREATION ****/
    if (month.lastDay !== 0) {
        // We create the next month from 1 to how many days we can fit in the remaining week.
        // We use month.lastDay to calculate how many days we need to create.
        // Example on June 2025:
        // month.lastDay = 1 (Monday), so we need to create 6 days.
        for (let dayNumber = 1; dayNumber <= 7 - month.lastDay; dayNumber++) {
            createDay(dayNumber, "next-month");
        }
    }
}

function setToday() {
    monthsSelector.value = today.getMonth();
    changeMonth();
}