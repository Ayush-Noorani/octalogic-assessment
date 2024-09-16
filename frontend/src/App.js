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
    RequiredOn: "",
  });

  const { currentFormStep, step, formLength, next } = useNavigationFormSteps([
    <Name />,
    <NumberOfWheels />,
    <VehicleType />,
    <VehicleModel />,
    <BookingDate />,
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
