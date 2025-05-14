const today = new Date();
const days = document.querySelector("#days");
const monthsSelector = document.querySelector("#monthsSelector");
const yearsSelector = document.querySelector("#yearsSelector");
const monthDown = document.querySelector("#monthDown");
const monthUp = document.querySelector("#monthUp");

monthsSelector.value = today.getMonth();
changeMonth();

monthsSelector.addEventListener("change", changeMonth);
monthDown.addEventListener("click", () => {
    if (monthsSelector.value !== "0") {
        monthsSelector.value--;
    }
    changeMonth();
});
monthUp.addEventListener("click", () => {
    if (monthsSelector.value !== "11") {
        monthsSelector.value++;
    }
    changeMonth();
});

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
function createDay(numberAssociated) {
    const day = document.createElement("div");
    day.textContent = numberAssociated.toString();
    days.appendChild(day);
}

function createMonth(month) {
    // We delete the existing month
    while (days.firstChild) {
        days.firstChild.remove()
    }

    // For the previous month:
    // If month.firstDay === Sunday, we need to show 6 days.
    // Else we need to show (month.firstDay - 1) days.
    let daysToShow = month.firstDay === 0 ? 6 : month.firstDay - 1;
    // Example here with August 2025:
    // month.totalDaysPreviousMonth = 31
    // daysToShow = 4 (5 (Friday) - 1)
    // startDay = 28.
    let startDay = month.totalDaysPreviousMonth - daysToShow + 1;
    for (let i = startDay; i <= month.totalDaysPreviousMonth; i++) {
        createDay(i);
    }

    // We create the current month from 1 to month.totalDays.
    for (let i = 1; i <= month.totalDays; i++) {
        createDay(i);
    }

    if (month.lastDay !== 0) {
        // We create the next month from 1 to how many days we can fit in the remaining week.
        // We use month.lastDay to calculate how many days we need to create.
        // Example on June 2025:
        // month.lastDay = 1 (Monday), so we need to create 6 days.
        for (let i = 1; i <= 7 - month.lastDay; i++) {
            createDay(i);
        }
    }
}