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
      let add = `${data.address.city}, ${data.address.city}, ${data.address.state}`;

      place.innerHTML = data.address.city;
      printCards({ address: add, today: date });
      monthTable({ address: add });

      set_address(
        `${data.address.city}`
        // `${data.address.city}, ${data.address.city}, ${data.address.state}`
      );
      console.log(data);
      // return address
    });
};

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

function err(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Please allow access to location.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}
