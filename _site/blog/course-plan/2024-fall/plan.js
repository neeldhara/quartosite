function isDateInRanges(date, ranges) {
    return ranges.some(range => date >= range.start && date <= range.end);
}

function generateDates() {
    const startDate = new Date(2024, 7, 2);
    const endDate = new Date(2024, 10, 22);

    const excludedRanges = [
        {start: new Date(2024, 8, 27), end: new Date(2024, 9, 4)},
        {start: new Date(2024, 9, 5), end: new Date(2024, 9, 13)}
    ];

    

    const holidays = [
        {date: new Date(2024, 7, 15), label: 'HOLIDAY: Independence Day'},
        {date: new Date(2024, 7, 26), label: 'HOLIDAY: Janmashtami (Vaishnavi)'},
        {date: new Date(2024, 8, 16), label: 'HOLIDAY: Milad-un-Nabi or Id-e-Milad'},
        {date: new Date(2024, 9, 2), label: 'HOLIDAY: Mahatma Gandhi Birthday'},
        {date: new Date(2024, 9, 12), label: 'HOLIDAY: Dussehra (Vijay Dashmi)'},
        {date: new Date(2024, 9, 31), label: 'HOLIDAY: Diwali (Deepavali)'},
        {date: new Date(2024, 10, 15), label: 'HOLIDAY: Guru Nanaks Birthday'}
    ];

    const restrictedHolidays = [
        { date: new Date(2024,0,1), label: 'RH: New Years Day'},
        { date: new Date(2024,0,13), label: 'RH: Lohri'},
        { date: new Date(2024,0,14), label: 'RH: Makar Sankranti'},
        { date: new Date(2024,0,15), label: 'RH: Pongal'},
        { date: new Date(2024,0,17), label: 'RH: Guru Gobind Singh Birthday'},
        { date: new Date(2024,0,25), label: 'RH: Hazarat Ali Birthday'},
        { date: new Date(2024,1,14), label: 'RH: Basant Panchami'},
        { date: new Date(2024,1,19), label: 'RH: Shivaji Jayanti'},
        { date: new Date(2024,1,24), label: 'RH: Guru Ravi Das Birthday'},
        { date: new Date(2024,2,6), label: 'RH: Birthday of Swami Dayananda Saraswati'},
        { date: new Date(2024,2,24), label: 'RH: Holika Dahan'},
        { date: new Date(2024,2,25), label: 'RH: Dolyatra'},
        { date: new Date(2024,2,31), label: 'RH: Easter Sunday'},
        { date: new Date(2024,3,5), label: 'RH: Jamat-Ul-Vida'},
        { date: new Date(2024,3,9), label: 'RH: Ugadi'},
        { date: new Date(2024,3,13), label: 'RH: Vishu'},
        { date: new Date(2024,3,14), label: 'RH: Meshadi'},
        { date: new Date(2024,3,17), label: 'RH: Ram Navami'}
    ];


    const weekdays = {
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
    };

    const selectedDays = Object.entries(weekdays)
        .filter(([day, _]) => document.getElementById(day).checked)
        .map(([_, dayNumber]) => dayNumber);

    const includeHolidays = document.getElementById("includeHolidays").checked;
    const indicateRestrictedHolidays = document.getElementById("indicateRestrictedHolidays").checked;


    let currentDate = new Date(startDate);
    const datesList = document.getElementById("datesList");
    datesList.innerHTML = '';

    while (currentDate <= endDate) {
        let listItem = null;
        let holiday = holidays.find(h => h.date.toDateString() === currentDate.toDateString());
        let restrictedHoliday = restrictedHolidays.find(rh => rh.date.toDateString() === currentDate.toDateString());

        if (selectedDays.includes(currentDate.getDay()) && !isDateInRanges(currentDate, excludedRanges)) {
            listItem = document.createElement("li");
            listItem.textContent = currentDate.toDateString();

            if (holiday && includeHolidays) {
                listItem.textContent += " " + holiday.label;
                datesList.appendChild(listItem);
            }
            else if (!holiday){
                datesList.appendChild(listItem);
                if (restrictedHoliday && indicateRestrictedHolidays) {
                listItem.textContent += " " + restrictedHoliday.label;
                datesList.appendChild(listItem);
                }
            }


        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
}
