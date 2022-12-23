// Imports
import { formatTime, tomorrow, formatDate } from "./Functions.js";

// Return all timings of a day by address
export const timingsByAddress = ({
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
} = {}) => {
  const options = { method: "GET" };
  let url = `https://api.aladhan.com/v1/timingsByAddress/${formatDate(
    new Date(date)
  )}?address=${address.replaceAll(
    " ",
    "%20"
  )}&method=${method}&shafaq=${shafaq}&tune=${tune}&school=${school}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&adjustment=${adjustment}&iso8601=${iso8601}`;
  console.log(url);
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const monthCalender = ({
  address = "",
  month = "",
  year = "",
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
  const options = { method: "GET" };
  let url = `https://api.aladhan.com/v1/calendarByAddress?address=${address.replaceAll(
    " ",
    "%20"
  )}&month=${month}&year=${year}&annual=${annual}&method=${method}&shafaq=${shafaq}&tune=${tune}&school=${school}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&adjustment=${adjustment}&iso8601=${iso8601}`;
  console.log("Calender", url);
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

// Returns all timing of a day by coordinates
export const timingsByCoords = ({
  date = today(new Date()),
  lat = "",
  lon = "",
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false,
} = {}) => {
  const options = { method: "GET" };
  let url = `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lon}&method=${method}&shafaq=${shafaq}&tune=${tune}&school=${school}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&adjustment=${adjustment}&iso8601=${iso8601}`;
  console.log(url);
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
