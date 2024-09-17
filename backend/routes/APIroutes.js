const express = require("express");
const router = express.Router();
const {
  confirmVehicleBooking,
  getNoOfWheels,
  getVehileModel,
  getVehileType,
  checIfAvailableOnDate,
} = require("../controllers/VehicleController.js");

router.route("/confirmBooking").post(confirmVehicleBooking);
router.route("/getNoOfWheels").get(getNoOfWheels);
router.route("/getVehileType/:wheels").get(getVehileType);
router.route("/getVehileModel/:type").get(getVehileModel);
router.route("/checIfAvailableOnDate").get(checIfAvailableOnDate);

module.exports = router;
