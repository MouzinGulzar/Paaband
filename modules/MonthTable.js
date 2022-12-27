import * as api from "./Api.js";
import {
  removeYear,
  removeZone,
  formatTime,
  nextMonth,
  prevMonth,
  getMonthName,
  getDate,
  formatToIslamic,
} from "./Functions.js";

import {
  curr_table_date,
  set_curr_table_date,
  address,
  set_Hdate,
  Hdate,
} from "../script.js";

// An onchange event listener attached to month picker to fetch the timings everytime it changes.
month_table_picker.addEventListener("change", () => {
  // console.log(month_table_picker.value);
  let dt = new Date(month_table_picker.value);
  let month = dt.getMonth() + 1;
  let year = dt.getFullYear();
  console.log(month);

  // Inserts data in month table
  monthTable({
    address: address,
    month: month,
    year: year,
  });

  // Change month table header
  mon_table_header.innerHTML = `For the month of ${getMonthName(
    month - 1
  )} ${year}`;

  // Change text of next and prev buttons
  next_mon.innerHTML = `${getMonthName(nextMonth(dt).getMonth())} ${nextMonth(
    dt
  ).getFullYear()}`;
  prev_mon.innerHTML = `${getMonthName(prevMonth(dt).getMonth())} ${prevMonth(
    dt
  ).getFullYear()}`;

  // Set curr_table_date equal to current date
  set_curr_table_date(new Date(month_table_picker.value));
  // curr_table_date = new Date(month_table_picker.value);
});

// An onclick event listener attached to button to fetch the timing of next month.
btn_next_mon.addEventListener("click", () => {
  // Calculates the next month
  const next_month = nextMonth(curr_table_date);
  // Updates the curr_table_month
  set_curr_table_date(next_month);
  // curr_table_date = next_month;

  // Prints timings of the current month
  monthTable({
    address: address,
    month: curr_table_date.getMonth() + 1,
    year: curr_table_date.getFullYear(),
  });

  // Updates contents of table header and next, prev buttons
  mon_table_header.innerHTML = `For the month of ${getMonthName(
    curr_table_date.getMonth()
  )} ${curr_table_date.getFullYear()}`;
  next_mon.innerHTML = `${getMonthName(
    nextMonth(curr_table_date).getMonth()
  )} ${nextMonth(curr_table_date).getFullYear()}`;
  prev_mon.innerHTML = `${getMonthName(
    prevMonth(curr_table_date).getMonth()
  )} ${prevMonth(curr_table_date).getFullYear()}`;
});

// An onclick event listener attached to button to fetch the timing of previous month.
btn_prev_mon.addEventListener("click", () => {
  // Calculate the previous month and updates curr_table_date
  const prev_month = prevMonth(curr_table_date);
  set_curr_table_date(prev_month);
  // curr_table_date = prev_month;

  // Prints timings of the current month
  monthTable({
    address: address,
    month: prev_month.getMonth() + 1,
    year: prev_month.getFullYear(),
  });

  // Updates contents of table header and next, prev buttons
  mon_table_header.innerHTML = `For the month of ${getMonthName(
    curr_table_date.getMonth()
  )} ${curr_table_date.getFullYear()}`;
  next_mon.innerHTML = `${getMonthName(
    nextMonth(curr_table_date).getMonth()
  )} ${nextMonth(curr_table_date).getFullYear()}`;
  prev_mon.innerHTML = `${getMonthName(
    prevMonth(curr_table_date).getMonth()
  )} ${prevMonth(curr_table_date).getFullYear()}`;
});

// FUNCTIONS:
// Fill month table with timings
export const monthTable = ({
  address = "",
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
  annual = false,
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false,
}) => {
  api
    .monthCalender({
      address: address,
      month: month,
      year: year,
      annual: annual,
      method: method,
      shafaq: shafaq,
      tune: tune,
      school: school,
      midnightMode: midnightMode,
      latitudeAdjustmentMethod: latitudeAdjustmentMethod,
      adjustment: adjustment,
      iso8601: iso8601,
    })
    .then((response) => {
      console.log(response);
      mon_table_rows.innerHTML = "";

      for (
        let i = getDate(curr_table_date) - 1;
        i < Object.keys(response.data).length;
        i++
      ) {
        let row = response.data[i];
        let html = `
        <tr>
            <td>${removeYear(row.date.readable)}</td>
            <td>${formatToIslamic(row.date.hijri.date)}</td>
            <td>${formatTime(removeZone(row.timings.Imsak))}</td>
            <td>${formatTime(removeZone(row.timings.Fajr))}</td>
            <td>${formatTime(removeZone(row.timings.Sunrise))}</td>
            <td>${formatTime(removeZone(row.timings.Dhuhr))}</td>
            <td>${formatTime(removeZone(row.timings.Asr))}</td>
            <td>${formatTime(removeZone(row.timings.Maghrib))}</td>
            <td>${formatTime(removeZone(row.timings.Isha))}</td>
        </tr>
        `;
        mon_table_rows.insertAdjacentHTML("beforeend", html);
      }
    });
};

export const hijriMonthTable = ({
  address = "",
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
  annual = false,
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false,
}) => {
  api
    .hijriMonthCalender({
      address: address,
      month: month,
      year: year,
      annual: annual,
      method: method,
      shafaq: shafaq,
      tune: tune,
      school: school,
      midnightMode: midnightMode,
      latitudeAdjustmentMethod: latitudeAdjustmentMethod,
      adjustment: adjustment,
      iso8601: iso8601,
    })
    .then((response) => {
      console.log(response);
      mon_table_rows.innerHTML = "";
      set_Hdate(response.data[0].date.hijri.date);
      console.log(Hdate);
      for (
        let i = getDate(curr_table_date) - 1;
        i < Object.keys(response.data).length;
        i++
      ) {
        let row = response.data[i];

        let html = `
        <tr>
            <td>${removeYear(row.date.readable)}</td>
            <td>${removeYear(row.date.readable)}</td>
            <td>${formatTime(removeZone(row.timings.Imsak))}</td>
            <td>${formatTime(removeZone(row.timings.Fajr))}</td>
            <td>${formatTime(removeZone(row.timings.Sunrise))}</td>
            <td>${formatTime(removeZone(row.timings.Dhuhr))}</td>
            <td>${formatTime(removeZone(row.timings.Asr))}</td>
            <td>${formatTime(removeZone(row.timings.Maghrib))}</td>
            <td>${formatTime(removeZone(row.timings.Isha))}</td>
        </tr>
        `;
        mon_table_rows.insertAdjacentHTML("beforeend", html);
      }
    });
};