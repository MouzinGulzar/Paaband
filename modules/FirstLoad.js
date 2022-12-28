import { address, set_address, date } from "../script.js";
import { printCards } from "./Cards.js";
import { monthTable } from "./MonthTable.js";

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
  let url = `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let add = `${data.address.city}, ${data.address.state}`;
      printCards({ address: add, today: date });
      monthTable({ address: add });
      set_address(add);

      add = data.address.city ?? data.address.state;
      place.innerHTML = add;
      inacc_warning.innerHTML =
        '"For more accurate results type address manually"';
      title.innerHTML = `Timings for ${add}`;

      // console.log(data);
    });
};

function err(error) {
  place.innerHTML = address;
  printCards({ address: address, today: date });
  monthTable({ address: address });

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
