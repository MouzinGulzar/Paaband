// Imports
import * as api from "./Api.js";

// Fills the front side of cards.
export const fillCardsFront = ({
  date = today(),
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
  api
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
      imsak_today.innerHTML = formatTime(response.data.timings?.Imsak);
      fajr_today.innerHTML = formatTime(response.data.timings?.Fajr);
      sunrise_today.innerHTML = formatTime(response.data.timings?.Sunrise);
      zuhr_today.innerHTML = formatTime(response.data.timings?.Dhuhr);
      asr_today.innerHTML = formatTime(response.data.timings?.Asr);
      magrib_today.innerHTML = formatTime(response.data.timings?.Maghrib);
      isha_today.innerHTML = formatTime(response.data.timings?.Isha);

      // Insert date in header
      day.innerHTML = response.data.date.gregorian.weekday.en;
      Idate.innerHTML = response.data.date.hijri.day;
      month.innerHTML = response.data.date.hijri.month.en;
      year.innerHTML = response.data.date.hijri.year;
    });
};

// Fills the back side of cards
export const fillCardsBack = ({
  date = today(),
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
  api
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

// Scroll event listener
export const scrollFunction = () => {
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    document.querySelector("#search-div").classList.add("sticked");
  } else {
    document.querySelector("#search-div").classList.remove("sticked");
  }
};

// Formats date in dd-mm-yyyy format
export const formatDate = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const ddmmyyyy = `${dd}-${mm}-${yyyy}`;
  return ddmmyyyy;
};

// Formates date in yyyy-mm-dd format. (In order to submit it to date input)
export const validFormatDate = (date) => {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const yyyymmdd = `${yyyy}-${mm}-${dd}`;

  return yyyymmdd;
};

// Convets date to timestamp
export const dateToTimestamp = (date) => {
  const timestamp = Date.parse(date);
  return timestamp;
};

// Converts timestamp to date and returns it in dd-mm-yyyy format
export const timestampToDate = (timestamp) => {
  const stamp = timestamp;
  const date = new Date(stamp);
  return formatDate(date);
};

// Takes a date and returns tomorrow in yyyy-mm-dd format.
export const tomorrow = (date = new Date()) => {
  const today = date.getTime();
  let tomorrow = new Date(today + 24 * 60 * 60 * 1000);
  return validFormatDate(tomorrow);
};

// Takes a date and return yesterday in yyyy-mm-dd format.
export const yesterday = (date = new Date()) => {
  const today = date.getTime();
  let yesterday = new Date(today - 24 * 60 * 60 * 1000);
  return validFormatDate(yesterday);
};

// Formats 24h format into 12h format
export function formatTime(t) {
  if (t == undefined) return "HH:MM";
  else {
    let hoursMins = t.split(":");
    let hours = hoursMins[0];
    let mins = hoursMins[1];
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // hour 0 shoud be 12
    let time = `${hours}:${mins}${ampm}`;
    return time;
  }
}

// Prints cards
export const printCards = () => {
  // Cards headers
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