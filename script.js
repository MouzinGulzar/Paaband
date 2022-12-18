// Imports
import * as api from "./modules/Api.js";
import {
  formatTime,
  printCards,
  tomorrow,
  validFormatDate,
  fillCardsFront,
  fillCardsBack,
  dateToTimestamp,
  yesterday,
  scrollFunction,
} from "./modules/Functions.js";

// Insert cards into html dynamically
printCards();

// Default address
let address = "srinagar";

// A universal date variable to store current date of which timings are shown
let date = new Date();
place.innerHTML = address;

// Insert data
fillCardsFront({ address: address });
fillCardsBack({ address: address, date: tomorrow(date) });

// Date picker's default value set to today()
date_picker.value = validFormatDate(new Date());

// Onscroll listener to change styles on scroll
window.onscroll = function () {
  scrollFunction();
};

// An onclick event listener attached to submit button to fetch the timings of new address
submit.addEventListener("click", (e) => {
  // If the input is empty stay idle.
  if (search.value == false) return;

  // Else update address variable, change place name in heading, reset date picker value
  address = search.value;
  place.innerHTML = address;
  date_picker.value = validFormatDate(new Date());

  // Insert data
  fillCardsFront({ address: address });
  fillCardsBack({ address: address });
});

// An onchange event listener attached to date picker to fetch the timings everytime date changes.
date_picker.addEventListener("change", () => {
  // Insert date
  fillCardsFront({
    address: address,
    date: dateToTimestamp(date_picker.value),
  });
  fillCardsBack({
    address: address,
    date: dateToTimestamp(tomorrow(new Date(date_picker.value))),
  });
  // Update date variable
  date = date_picker.value;
});

// An onclick event listener attached to button to fethc the timing of next day.
btn_next.addEventListener("click", () => {
  // Update date variable and set it equal to tomorrow
  date = tomorrow(new Date(date));

  // Update date picker value
  date_picker.value = validFormatDate(new Date(date));

  // Insert data
  fillCardsFront({ address: address, date: date });
  fillCardsBack({
    address: address,
    date: tomorrow(new Date(date)),
  });
});

// An onclick event listener attached to button to fethc the timing of previous day.
btn_prev.addEventListener("click", () => {
  // Update data variable and set it equal to yesterday
  date = yesterday(new Date(date));

  // Update date picker value
  date_picker.value = validFormatDate(new Date(date));

  // Insert data
  fillCardsFront({ address: address, date: date });
  fillCardsBack({
    address: address,
    date: dateToTimestamp(tomorrow(new Date(date))),
  });
});