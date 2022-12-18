// Imports
import { today, getLocation, formatTime, tomorrow, formatDate } from "./Functions.js";

// Return all timings of a day by address
const timingsByAddress = ({
  date = new Date(),
  address = "",
  method = 1,
  shafaq = "general",
  tune = 0,
  school = 1,
  midnightMode = "",
  latitudeAdjustmentMethod = "",
  adjustment = "",
  iso8601 = false 
} = {}) => {
  const options = { method: "GET" };
  let url = `http://api.aladhan.com/v1/timingsByAddress/${formatDate(new Date(date))}?address=${address}&method=${method}&shafaq=${shafaq}&tune=${tune}&school=${school}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&adjustment=${adjustment}&iso8601=${iso8601}`;
  console.log(url);
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

// Returns all timing of a day by coordinates
const CtimingsByAddress = ({
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
  let url = `http://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lon}&method=${method}&shafaq=${shafaq}&tune=${tune}&school=${school}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&adjustment=${adjustment}&iso8601=${iso8601}`;
  console.log(url);
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export { timingsByAddress, CtimingsByAddress };
