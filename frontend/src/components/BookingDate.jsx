import React, { useState, useEffect } from "react";

const BookingDate = ({
  userFormData,
  updateBookingInformation,
  checkingForAvailability,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromDate && toDate) {
      setLoading(true);
      checkingForAvailability(true);

      if (toDate < fromDate) {
        alert("Please select correct dates");
        setLoading(false);
      } else {
        const dataValidation = Object.keys(userFormData).every(
          (key) =>
            userFormData[key] !== null &&
            userFormData[key] !== undefined &&
            userFormData[key] !== ""
        );

        if (dataValidation) {
          fetch(
            `http://localhost:3001/checIfAvailableOnDate?model=${userFormData.VehicleModel}&type=${userFormData.VehicleType}&from=${fromDate}&to=${toDate}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.data.length == 0) {
                alert("Booking Available. Please submit the form");
                setLoading(false);
                checkingForAvailability(false);
              } else {
                alert(
                  "Booking Unavailable. Please select a different date or vehicle"
                );
                setLoading(false);
              }
            });
        } else {
          alert(
            "You have missed out some options. Please select missing values."
          );
          setLoading(false);
        }
      }
    }
  }, [fromDate, toDate]);

  const handleDateSelection = (e) => {
    if (e.target.name == "FromDate") {
      setFromDate(e.target.value);
      updateBookingInformation(e.target.name, e.target.value);
    } else if (e.target.name == "ToDate") {
      setToDate(e.target.value);
      updateBookingInformation(e.target.name, e.target.value);
    }
  };

  return (
    <div>
      <>
        <h2>When do you want it ?</h2>
        {loading && <h3>Checking for availability ... </h3>}
        {!loading && (
          <>
            <div>
              <label>From: </label>
              <input
                type="date"
                name="FromDate"
                value={fromDate}
                onChange={handleDateSelection}
              />
            </div>
            <div>
              <label>To: </label>
              <input
                type="date"
                name="ToDate"
                value={toDate}
                onChange={handleDateSelection}
              />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default BookingDate;
