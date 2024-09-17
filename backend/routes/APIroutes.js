const express = require("express");
const router = express.Router();
const {
  confirmVehicleBooking,
  getVehileModel,
  getVehileType,
  checIfAvailableOnDate,
} = require("../controllers/VehicleController.js");

router.route("/confirmBooking").post(confirmVehicleBooking);
router.route("/getVehileType/:wheels").get(getVehileType);
router.route("/getVehileModel/:type").get(getVehileModel);
router.route("/checIfAvailableOnDate").get(checIfAvailableOnDate);

module.exports = router;
