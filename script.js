// Media Query JS: https://css-tricks.com/working-with-javascript-media-queries/

// HTML ELEMENTS

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
const USER_DATE = new Date(2021,5,10);





//const FORM_DATE = new Date(YEAR_ELEM.textContent,MONTH_ELEM.textContent,DAY_ELEM.textContent);


// Function code source

//https:tutorial.eyehunts.com/js/javascript-difference-between-two-dates-in-years-months-days/

const getDateDiff = (startDate,endDate) => {
    const oneDayMs = 1000 * 60 * 60 * 24;
    if (startDate > endDate) {
        return;
    }
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));
    return { years, months, days };
}

console.log(getDateDiff(USER_DATE,CURRENT_DATE))

const handleClick = (e) => {
    e.preventDefault();
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

var condition = window.matchMedia("(max-width: 500px)")
condition.addListener(change_btn)


change_btn(condition);

SUBMIT_BTN.addEventListener("click", e => {
    handleClick(e)
});

