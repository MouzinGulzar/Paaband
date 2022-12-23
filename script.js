// Imports
import {
  tomorrow,
  validFormatDate,
  scrollFunction,
} from "./modules/Functions.js";
import { printCards } from "./modules/Cards.js";
import { monthTable } from "./modules/MonthTable.js";

// Default address
export let address = "srinagar";
export const set_address = (value) => {
  address = value;
};

// A universal date variable to store current date of which timings are shown in cards.
export let date = new Date();
export const set_date = (value) => {
  date = value;
};

// A universal date variable to strore current date of which timings are shown in month table.
export var curr_table_date = date;
export const set_curr_table_date = (value) => {
  curr_table_date = value;
};

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
  title.innerHTML = address;

  // date_picker.value = validFormatDate(new Date());

  // Insert data
  // fillCardsFront({ address: address, date: date });
  // fillCardsBack({ address: address, date: tomorrow(new Date(date)) });
  printCards({
    address: address,
    today: date,
    tomorrow: tomorrow(new Date(date)),
  });

  // On the first load only display the days left in the month in month table.
  // if (curr_table_date == date) romTable({ address: address });
  // Else fetch details of picked date
  // else
  monthTable({
    address: address,
    month: curr_table_date.getMonth() + 1,
    year: curr_table_date.getFullYear(),
  });
});


title.innerHTML = address;
place.innerHTML = address;
printCards({ address: address, today: date });
monthTable({ address: address });
