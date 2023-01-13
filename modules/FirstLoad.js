import { address, set_address, date } from "../script.js";
import { printCards } from "./Cards.js";
import { monthTable } from "./MonthTable.js";
import { load } from "./Loader.js";

// window.onload = function () {
// getLocation();
// };

export const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(userLocation, err);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};
const userLocation = (pos) => {
  load(5);
  let url = `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      load(25);
      let add = `${data.address.city}, ${data.address.state}`;
      printCards({ address: add, today: date });
      load(50);
      monthTable({ address: add });
      set_address(add);
      load(75);
      add = data.address.city ?? data.address.state;
      place.innerHTML = add;
      inacc_warning.innerHTML =
        '"For more accurate results type address manually"';
      title.innerHTML = `Timings for ${add}`;
      load(100);
      // console.log(data);
    });
};

function err(error) {
  load(5);
  place.innerHTML = address;
  load(25);
  printCards({ address: address, today: date });
  load(75);
  monthTable({ address: address });
  load(100);
  // Handling geolocation errors
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("Please allow access to location.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
