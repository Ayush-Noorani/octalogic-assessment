import React, { useState } from "react";
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
    Wheels: 2,
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
      {...userFormData}
      updateBookingInformation={updateBookingInformation}
    />,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    next();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {step}
          <div style={{ marginTop: "5px" }}>
            <button type="submit">
              {currentFormStep == formLength - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
