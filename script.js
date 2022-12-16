import * as api from "./modules/Api.js";
// api.timingsByAddress((address = "bandipora"));

console.log("Timing by address:");
api.timingsByAddress({ address: "bandipora" });
api.CtimingsByAddress({ lat: "19.0748", lon: "72.8856" });
