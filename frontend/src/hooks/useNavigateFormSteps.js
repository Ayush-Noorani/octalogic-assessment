import { useState } from "react";
export const useNavigationFormSteps = (formSteps) => {
  const [currentFormStep, setCurrentFormStep] = useState(0);

  const next = () => {
    setCurrentFormStep((prev) => {
      if (prev >= formSteps.length - 1) return prev;
      return prev + 1;
    });
  };

  return {
    currentFormStep,
    step: formSteps[currentFormStep],
    formLength: formSteps.length,
    next,
  };
};
