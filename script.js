// Media Query JS: https://css-tricks.com/working-with-javascript-media-queries/

// HTML ELEMENTS

const DAY_ERROR = document.getElementById("day-error")
const MONTH_ERROR = document.getElementById("month-error");
const YEAR_ERROR = document.getElementById("year-error")

const FORM_ELEM = document.querySelector("form");
const DAY_ELEM = document.getElementById("day");
const MONTH_ELEM = document.getElementById("month");
const YEAR_ELEM = document.getElementById("year")
const SUBMIT_BTN = document.querySelector("button")

const YEARS_DIFF = document.querySelector(".years-diff").children[0]
const MONTHS_DIFF = document.querySelector(".months-diff").children[0];
const DAYS_DIFF = document.querySelector(".days-diff").children[0];


const NEWLINE_REF = document.querySelector(".newline")
let new_break

const CURRENT_DATE = new Date();
const USER_DATE = new Date(1,1,1);









//const FORM_DATE = new Date(YEAR_ELEM.textContent,MONTH_ELEM.textContent,DAY_ELEM.textContent);


// Function code source

//https://www.tutorialstonight.com/age-calculator-in-javascript/



const getDateDiff = (userDate,today) => {
    let years
    if (today.getMonth() > userDate.getMonth() || (today.getMonth() == userDate.getMonth() && today.getDate() >= userDate.getDate())) {
        years = today.getFullYear() - userDate.getFullYear()
    } else {
        years = today.getFullYear() - userDate.getFullYear() - 1;
    }

    let months;
    if (today.getDate() >= userDate.getDate()) {
        months = today.getMonth() - userDate.getMonth();
    } else if (today.getDate() < userDate.getDate()) {
        months = today.getMonth() - userDate.getMonth() - 1;
    }

    months = months < 0 ? months + 12 : months;

    let days;

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (today.getDate() >= userDate.getDate()) {
        days = today.getDate() - userDate.getDate()
    } else {
        days = today.getDate() - userDate.getDate() + monthDays[userDate.getMonth()]
    }

    return {years,months,days}
}

console.log(getDateDiff(USER_DATE,CURRENT_DATE))


// Sets the max days of the day depending on the value of the month and potentially year input
const setMaxDays = () => {
    const days_30 = [4,6,9,11];
    const days_31 = [1,3,5,7,8,10,12];
    if (days_30.includes(+MONTH_ELEM.value)) {
        DAY_ELEM.setAttribute("max", 30)
    } else if (days_31.includes(+MONTH_ELEM.value)) {
        DAY_ELEM.setAttribute("max", 31)
    } else if (+MONTH_ELEM.value === 2 && isLeapYear(+YEAR_ELEM.value)) {
        DAY_ELEM.setAttribute("max", 29)
    } else if (+MONTH_ELEM.value === 2 && !isLeapYear(YEAR_ELEM.value)) {
        DAY_ELEM.setAttribute("max", 28)
    }
}

const validate_year = () => {
    if (YEAR_ELEM.validity.valueMissing) {
        YEAR_ERROR.textContent = "This field is required"
        return false
    } else if (+YEAR_ELEM.value > +CURRENT_DATE.getFullYear()) {
        YEAR_ERROR.textContent = "Must be in the past"
        return false
    }
    YEAR_ERROR.textContent = ""
    return true
}

const validtate_month = () => {
    if (MONTH_ELEM.validity.valueMissing) {
        MONTH_ERROR.textContent = "This field is required";
        return false
    } else if (MONTH_ELEM.validity.rangeOverflow || MONTH_ELEM.validity.rangeUnderflow) {
        MONTH_ERROR.textContent = "Must be a valid month";
        return false
    }
    MONTH_ERROR.textContent = ""
    return true
}

const validate_day = () => {
    if (DAY_ELEM.validity.valueMissing) {
    DAY_ERROR.textContent = "This field is required";
    return false
    } else if (DAY_ELEM.validity.rangeOverflow || DAY_ELEM.validity.rangeUnderflow) {
        DAY_ERROR.textContent = "Must be a valid day";
        return false
    }
    DAY_ERROR.textContent = ""
    return true
}





const handleClick = (e) => {
    e.preventDefault();
    if (!validate_year()) {
        validate_year()
    }
    if (!validtate_month()) {
        validtate_month()
    }
    if (!validate_day()) {
        validate_day()
    }

    if (!validate_year() || !validtate_month() || validate_day() ) {
        return
    }
    if (YEAR_ELEM && MONTH_ELEM && DAY_ELEM) {
        let user_date = new Date(+YEAR_ELEM.value,+MONTH_ELEM.value-1,+DAY_ELEM.value)
        date_diff = getDateDiff(user_date,CURRENT_DATE);
        YEARS_DIFF.textContent = date_diff.years;
        MONTHS_DIFF.textContent = date_diff.months;
        DAYS_DIFF.textContent = date_diff.days
    }
}


// Initializing the new breakpoint element if the size is for mobile



// Inserting the element at the end of the newline class div.
const insert_breakpoint = (parentRef, new_elem) => {
    new_break = document.createElement("hr");
    new_break.className = "breakpoint";
    parentRef.insertAdjacentElement("beforeend", new_break)
}



// Changing the button position based on the screensize using the insert_breakpoint
const change_btn = (condition) => {
    if (condition.matches) {
        insert_breakpoint(NEWLINE_REF, new_break)
    } else {
        newlines_ref = document.querySelectorAll(".breakpoint");
        if (newlines_ref.length > 1) {
            newlines_ref[1].remove();
        }
    }
}

const isLeapYear = (year) => {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true
    }
    return false
}

var condition = window.matchMedia("(max-width: 500px)")
condition.addListener(change_btn)


change_btn(condition);

FORM_ELEM.addEventListener("submit", e => {
    handleClick(e)
});

MONTH_ELEM.addEventListener("input",setMaxDays)
YEAR_ELEM.addEventListener("input", setMaxDays)




