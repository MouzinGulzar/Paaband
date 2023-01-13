import * as api from "./Api.js";
import {
  formatTime,
  diff,
  yesterday,
  tomorrow,
  validFormatDate,
  dateToTimestamp,
} from "./Functions.js";
import { address, date, set_date } from "../script.js";
import { loadCard } from "./Loader.js";

let fl = 1;
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
  set_date(date_picker.value);
  // date = date_picker.value;
});

// An onclick event listener attached to button to fetch the timing of next day.
btn_next.addEventListener("click", () => {
  // Update date variable and set it equal to tomorrow
  set_date(tomorrow(new Date(date)));
  loadCard(5);
  loadCard(25);
  // date = tomorrow(new Date(date));

  // Update date picker value
  date_picker.value = validFormatDate(new Date(date));

  loadCard(50);
  // Insert data
  // fillCardsFront({ address: address, date: date });
  // fillCardsBack({
  //   address: address,
  //   date: tomorrow(new Date(date)),
  // });
  printCards({ address: address });
  loadCard(100);
  loadCard(-1);
});

// An onclick event listener attached to button to fetch the timing of previous day.
btn_prev.addEventListener("click", () => {
  // Update data variable and set it equal to yesterday
  set_date(yesterday(new Date(date)));
  // date = yesterday(new Date(date));

  // Update date picker value
  date_picker.value = validFormatDate(new Date(date));

  // Insert data
  fillCardsFront({ address: address, date: date });
  fillCardsBack({
    address: address,
    date: dateToTimestamp(tomorrow(new Date(date))),
  });
});

// Fills the front side of cards
const fillCardsFront = async ({
  date = new Date(),
  address = "",
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false,
}) => {
  await api
    .timingsByAddress({
      date: date,
      address: address,
      method: method,
      shafaqgeneral: shafaq,
      tune: tune,
      school: school,
      midnightMode: midnightMode,
      latitudeAdjustmentMethod: latitudeAdjustmentMethod,
      adjustment: adjustment,
      iso8601: iso8601,
    })
    .then((response) => {
      // console.log(response);

      // Insert data into cards
      imsak_today.innerHTML = formatTime(response.data.timings?.Imsak);
      fajr_today.innerHTML = formatTime(response.data.timings?.Fajr);
      sunrise_today.innerHTML = formatTime(response.data.timings?.Sunrise);
      zuhr_today.innerHTML = formatTime(response.data.timings?.Dhuhr);
      asr_today.innerHTML = formatTime(response.data.timings?.Asr);
      magrib_today.innerHTML = formatTime(response.data.timings?.Maghrib);
      isha_today.innerHTML = formatTime(response.data.timings?.Isha);

      api
        .timingsByAddress({
          date: yesterday(new Date(date)),
          address: address,
          method: method,
          shafaqgeneral: shafaq,
          tune: tune,
          school: school,
          midnightMode: midnightMode,
          latitudeAdjustmentMethod: latitudeAdjustmentMethod,
          adjustment: adjustment,
          iso8601: iso8601,
        })
        .then((response) => {
          imsak_increment.innerHTML = diff(
            formatTime(response.data.timings?.Imsak),
            imsak_today.textContent
          );
          fajr_increment.innerHTML = diff(
            formatTime(response.data.timings?.Fajr),
            fajr_today.textContent
          );
          sunrise_increment.innerHTML = diff(
            formatTime(response.data.timings?.Sunrise),
            sunrise_today.textContent
          );
          zuhr_increment.innerHTML = diff(
            formatTime(response.data.timings?.Dhuhr),
            zuhr_today.textContent
          );
          asr_increment.innerHTML = diff(
            formatTime(response.data.timings?.Asr),
            asr_today.textContent
          );
          magrib_increment.innerHTML = diff(
            formatTime(response.data.timings?.Maghrib),
            magrib_today.textContent
          );
          isha_increment.innerHTML = diff(
            formatTime(response.data.timings?.Isha),
            isha_today.textContent
          );
        });
      // Insert date in header
      if (fl) {
        //Prevent date updation with updation of cards
        day.innerHTML = response.data.date.gregorian.weekday.en;
        Idate.innerHTML = response.data.date.hijri.day;
        month.innerHTML = response.data.date.hijri.month.en;
        year.innerHTML = response.data.date.hijri.year;
        fl = 0;
      }
    });
};

// Fills the back side of cards
const fillCardsBack = async ({
  date = new Date(),
  address = "",
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false,
}) => {
  await api
    .timingsByAddress({
      date: date,
      address: address,
      method: method,
      shafaqgeneral: shafaq,
      tune: tune,
      school: school,
      midnightMode: midnightMode,
      latitudeAdjustmentMethod: latitudeAdjustmentMethod,
      adjustment: adjustment,
      iso8601: iso8601,
    })
    .then((response) => {
      // Insert data into cards
      imsak_tomorrow.innerHTML = formatTime(response.data.timings?.Imsak);
      fajr_tomorrow.innerHTML = formatTime(response.data.timings?.Fajr);
      sunrise_tomorrow.innerHTML = formatTime(response.data.timings?.Sunrise);
      zuhr_tomorrow.innerHTML = formatTime(response.data.timings?.Dhuhr);
      asr_tomorrow.innerHTML = formatTime(response.data.timings?.Asr);
      magrib_tomorrow.innerHTML = formatTime(response.data.timings?.Maghrib);
      isha_tomorrow.innerHTML = formatTime(response.data.timings?.Isha);
    });
};

// Prints cards
export const printCards = ({ address = address, today = date }) => {
  fillCardsFront({ address: address, date: today });
  fillCardsBack({ address: address, date: tomorrow(new Date(date)) });
  // Card names
  const card_headers = [
    "imsak",
    "fajr",
    "sunrise",
    "zuhr",
    "asr",
    "magrib",
    "isha",
  ];
  const Ucard_headers = [
    "ختم سحری",
    "فجر",
    "طلوع آفتاب",
    "ظہر",
    "عصر",
    "مغرب",
    "عشاء",
  ];
  cards_section.innerHTML = "";
  for (let i = 0; i < card_headers.length; i++) {
    cards_section.innerHTML += `
        <div class="card">
          <div class="card-front">
            <h2>
              ${card_headers[i]} <br />
              <span class="ur">${Ucard_headers[i]}</span>
            </h2>
            <div>
              <p id="${card_headers[i]}_today">HH:MM</p>
            </div>
            <div class="increment"><span id="${card_headers[i]}_increment">+M</span></div>
          </div>
          <div class="card-back">
            <h2>Tomorrow at <br /></h2>
            <div>
              <p id="${card_headers[i]}_tomorrow">HH:MM</p>
            </div>
          </div>
      </div>
        `;
  }
};
