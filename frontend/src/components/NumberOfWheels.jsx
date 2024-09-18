import React, { useEffect, useState } from "react";

const NumberOfWheels = ({ updateBookingInformation }) => {
  const [wheels, setWheels] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);

  const handleSelction = (e) => {
    updateBookingInformation(e.target.name, e.target.value);
    setSelectedOption(e.target.value); //
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/getNoOfWheels")
      .then((res) => res.json())
      .then((data) => {
        setWheels(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {loading && <h3>Please wait ... </h3>}
      {!loading && (
        <>
          <h2>What Your Preference ?</h2>
          {wheels.length &&
            wheels.map((wheel, index) => {
              return (
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "5px" }}
                  key={index}
                >
                  <input
                    type="radio"
                    name="Wheels"
                    value={wheel.wheels}
                    onChange={handleSelction}
                    checked={selectedOption == wheel.wheels}
                  />
                  <label>{`${wheel.wheels} Wheeler`}</label>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default NumberOfWheels;
