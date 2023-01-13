const show = () => {
  ld_bar.classList.add("show");
};

const hide = () => {
  ld_bar.classList.remove("show");
  // ld_bar.style.animationName = "";
};

const hide_ld_cards = () => {
  ld_bar.classList.remove("show");
};

export const load = (ld) => {
  if (ld == 5) show();
  ld_bar.style.animationName = `ld${ld}`;
  if (ld == -1) hide();
  //   ld_bar.classList.add(ld);
};

export const loadCard = (ld) => {
  if (ld == 5) show();
  ld_bar_cards.style.animationName = `ld${ld}`;
  if (ld == -1) hide_ld_cards();
  //   ld_bar.classList.add(ld);
};

// const ld = () => {
//   load("load5");
//   setTimeout(() => {
//     load("load25");
//   }, 2000);
//   setTimeout(() => {
//     load("load50");
//   }, 4000);
//   setTimeout(() => {
//     load("load75");
//   }, 6000);
//   setTimeout(() => {
//     load("load100");
//   }, 8000);
// };

// ld();

// setInterval(() => {
//   ld();
// }, 10000);
