// Imports
import {
  tomorrow,
  validFormatDate,
  scrollFunction,
} from "./modules/Functions.js";
import { printCards } from "./modules/Cards.js";
import { monthTable } from "./modules/MonthTable.js";
import { getLocation } from "./modules/GetLocation.js";
import * as api from "./modules/Api.js";

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

// A universal date variable to store current date of which timings are shown in cards.
export let Hdate = validFormatDate(date);
export const set_Hdate = (value) => {
  Hdate = value;
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

// month_switch.addEventListener("click", () => {
//   if (month_switch_text.dataset.toggle == 0) {
//     month_switch_text.innerHTML = "Switch to Gregorian Calender";
//     month_switch_text.dataset.toggle = 1;
//   } else if (month_switch_text.dataset.toggle == 1) {
//     month_switch_text.innerHTML = "Switch to Hijri Calender";
//     month_switch_text.dataset.toggle = 0;
//   }
// });

title.innerHTML = address;
place.innerHTML = address;

let fl = 1;
if (fl) {
  console.log("First Load");
  window.onload = function () {
    getLocation();
  };
  fl = 0;
} else {
  printCards({ address: address, today: date });
  monthTable({ address: address });
}
