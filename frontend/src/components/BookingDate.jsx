import React, { useState, useEffect } from "react";

const BookingDate = ({
  VehicleModel,
  VehicleType,
  updateBookingInformation,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromDate && toDate) {
      setLoading(true);
      fetch(
        `http://localhost:3001/checIfAvailableOnDate?model=${VehicleModel}&type=${VehicleType}&from=${fromDate}&to=${toDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.data.length == 0) {
            setTimeout(() => {
              alert("Booking Available. Please submit the form");
            }, 3000);
          } else {
            setTimeout(() => {
              alert(
                "Booking Unavailable. Please select a different date or vehicle"
              );
            }, 5000);
          }
        });
    }
  }, [toDate, fromDate]);

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
