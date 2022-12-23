// Takes two times in 12h format and returns
export const diff = (yesterday, today) => {
  if (yesterday.includes("AM") || today.includes("AM")) {
    yesterday = yesterday.replace("AM", "");
    today = today.replace("AM", "");
  }
  if (yesterday.includes("PM") || today.includes("PM")) {
    yesterday = yesterday.replace("PM", "");
    today = today.replace("PM", "");
  }

  const yday = yesterday.split(":");
  const tday = today.split(":");
  const y_mins = Number(yday[1]);
  const y_hrs = Number(yday[0]);
  const t_mins = Number(tday[1]);
  const t_hrs = Number(tday[0]);
  let increment = t_mins - y_mins;
  if (t_hrs > y_hrs) {
    increment += 60;
  } else if (y_hrs > t_hrs) {
    increment -= 60;
  }
  if (increment >= 0) increment = "+" + increment;

  return increment;
};

// Listenes to window scroll
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

// Takes a JS date and return date
export const getDate = (date) => {
  let d = date.getDate();
  return d;
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

// Takes JS 0 based month number and return name of month
export const getMonthName = (month) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month];
};

// Removes year from date string
export const removeYear = (date) => {
  const dt = new Date(date);
  let d = dt.getDate();
  if (d < 10) d = "0" + d;

  let m = dt.getMonth();
  return `${d} ${getMonthName(m)}`;
};

// Removes zone from time string (eg., IST, GMT, UTC)
export const removeZone = (time) => {
  let arr = time.split("");
  let start = arr.indexOf("(") - 1;
  let end = arr.indexOf(")");
  arr.splice(start, end - start + 1);

  return arr.join("");
};

// Takes a date and return next month.
export const nextMonth = (date = new Date()) => {
  const days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const this_month = date.getTime();
  const passedDays = date.getDate();
  ``;
  const next_month =
    (days_in_months[date.getMonth()] - passedDays + 1) * 24 * 60 * 60 * 1000;

  return new Date(this_month + next_month);
};

// Takes a date and return previous month
export const prevMonth = (date = new Date()) => {
  const days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const this_month = date.getTime();
  const passedDays = date.getDate();
  const prevMonthDays = days_in_months[date.getMonth() - 1] ?? 31;
  const totalDaysToSub = (passedDays + prevMonthDays - 1) * 24 * 60 * 60 * 1000;

  return new Date(this_month - totalDaysToSub);
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
