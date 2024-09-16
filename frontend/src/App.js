import React from "react";
import { useNavigationFormSteps } from "./hooks/useNavigateFormSteps";
import Name from "./components/Name";
import NumberOfWheels from "./components/NumberOfWheels";
import VehicleType from "./components/VehicleType";
import BookingDate from "./components/BookingDate";

function App() {
  const { currentFormStep, step, formLength, next } = useNavigationFormSteps([
    <Name />,
    <NumberOfWheels />,
    <VehicleType />,
    <BookingDate />,
  ]);
  return (
    <div>
      <form>
        <div>
          {step}
          <div>
            <button type="button" onClick={next}>
              {currentFormStep == formLength - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
