import React, { useState } from "react";
import "./index.css";
import { useNavigationFormSteps } from "./hooks/useNavigateFormSteps";
import Name from "./components/Name";
import NumberOfWheels from "./components/NumberOfWheels";
import VehicleType from "./components/VehicleType";
import BookingDate from "./components/BookingDate";
import VehicleModel from "./components/VehicleModel";

function App() {
  const [userFormData, setUserFormData] = useState({
    FirstName: "",
    LastName: "",
    Wheels: "",
    VehicleType: "",
    VehicleModel: "",
    FromDate: "",
    ToDate: "",
  });

  const updateBookingInformation = (key, value) => {
    if (Object.keys(userFormData).includes(key)) {
      setUserFormData((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    }
  };
  const [loading, setLoading] = useState(false);
  const [isCheckingForAvailability, setIsCheckingForAvailability] =
    useState(false);

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const { currentFormStep, step, formLength, next } = useNavigationFormSteps([
    <Name updateBookingInformation={updateBookingInformation} />,
    <NumberOfWheels updateBookingInformation={updateBookingInformation} />,
    <VehicleType
      {...userFormData}
      updateBookingInformation={updateBookingInformation}
    />,
    <VehicleModel
      {...userFormData}
      updateBookingInformation={updateBookingInformation}
    />,
    <BookingDate
      userFormData={userFormData}
      updateBookingInformation={updateBookingInformation}
      checkingForAvailability={setIsCheckingForAvailability}
    />,
  ]);

  const submitBooking = async () => {
    setLoading(true);
    try {
      console.log("CAlling");
      const response = await fetch(`http://localhost:3001/confirmBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });

      if (response) {
        const result = await response.json();
        if (result.message == "Booking Successful" && response.status == 200) {
          setIsBookingConfirmed(true);
        } else {
          alert(result.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    !(currentFormStep == formLength - 1) ? next() : submitBooking();
  };

  return (
    <div>
      {loading && <h2>Submitting Booking Form ... </h2>}
      {!loading && (
        <>
          <form onSubmit={onSubmit}>
            <div>
              {isBookingConfirmed ? (
                <>
                  <h3>
                    Booking Confirmed for {userFormData.VehicleModel} From:{" "}
                    {userFormData.FromDate} To: {userFormData.ToDate}
                  </h3>
                </>
              ) : (
                <>
                  {step}
                  <div style={{ marginTop: "5px" }}>
                    <button
                      type="submit"
                      style={{ width: "10%" }}
                      disabled={isCheckingForAvailability}
                    >
                      {currentFormStep == formLength - 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
