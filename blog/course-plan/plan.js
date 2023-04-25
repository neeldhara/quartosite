function isDateInRanges(date, ranges) {
    return ranges.some(range => date >= range.start && date <= range.end);
}

function generateDates() {
    const startDate = new Date(2023, 7, 2);
    const endDate = new Date(2023, 10, 24);

    const excludedRanges = [
        {start: new Date(2023, 8, 2), end: new Date(2023, 8, 6)},
        {start: new Date(2023, 9, 11), end: new Date(2023, 9, 15)},
        {start: new Date(2023, 9, 21), end: new Date(2023, 9, 29)}
    ];

    const holidays = [
        {date: new Date(2023, 7, 15), label: 'HOLIDAY: Independence Day'},
        {date: new Date(2023, 8, 7), label: 'HOLIDAY: Janmashtami (Vaishnavi)'},
        {date: new Date(2023, 8, 28), label: 'HOLIDAY: Milad-un-Nabi or Id-e-Milad'},
        {date: new Date(2023, 9, 2), label: 'HOLIDAY: Mahatma Gandhi’s Birthday'},
        {date: new Date(2023, 9, 24), label: 'HOLIDAY: Dussehra (Vijay Dashmi)'}
    ];

    const restrictedHolidays = [
        {date: new Date(2023, 7, 16), label: 'RH: Parsi New Year’s Day/ Nauraj'},
        {date: new Date(2023, 7, 20), label: 'RH: Vinayaka Chaturthi'},
        {date: new Date(2023, 7, 29), label: 'RH: Onam or Thiru Onam Day'},
        {date: new Date(2023, 7, 30), label: 'RH: Raksha Bandhan'},
        {date: new Date(2023, 8, 6), label: 'RH: Janmashtami (Smarta)'},
        {date: new Date(2023, 8, 19), label: 'RH: Ganesh Chaturthi'},
        {date: new Date(2023, 9, 21), label: 'RH: Dussehra (Saptami)'},
        {date: new Date(2023, 9, 22), label: 'RH: Dussehra (Maha Ashtami)'},
        {date: new Date(2023, 9, 23), label: 'RH: Dussehra (Maha Navmi)'},
        {date: new Date(2023, 9, 28), label: 'RH: Maharishi Valmiki’s Birthday'},
        {date: new Date(2023, 10, 1), label: 'RH: Karaka Chaturthi (Karwa Chouth)'},
        {date: new Date(2023, 10, 12), label: 'RH: Naraka Chaturdasi'},
        {date: new Date(2023, 10, 13), label: 'RH: Govardhan Puja'},
        {date: new Date(2023, 10, 15), label: 'RH: Bhai Duj'},
        {date: new Date(2023, 10, 19), label: 'RH: Pratihar Shashthi or Surya Shashthi (Chhat Puja)'},
        {date: new Date(2023, 10, 24), label: 'RH: Guru Tegh Bahadur\'s Martyrdom Day'}
    ];


    const weekdays = {
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5
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
