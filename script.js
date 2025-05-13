const date = new Date(2025, 4);
console.log(date);

const firstDay = new Date(2025, 4, 1).getDay();
console.log(firstDay);

const daysInMonth = new Date(2025, 5, 0).getDate();
console.log(daysInMonth);

function getMonthData(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return { firstDay, totalDays };
}