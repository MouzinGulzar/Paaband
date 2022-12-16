// Returns a date in dd-mm-yyyy format
const today = (date) => {
  const today = date;
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) dd = "0" + mm;

  const ddmmyyyy = `${dd}-${mm}-${yyyy}`;

  return ddmmyyyy;
};

// Returns location of the user
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos.coords));
  } else {
    return false;
  }
};

function showPosition(position) {
  position;
  // "<br>Longitude: " + position.coords.longitude;
}

// console.log(getLocation());
getLocation();

// Exports
export { today, getLocation };
