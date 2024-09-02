import React, { createContext, useState } from "react";

const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const [houseData, setHouseData] = useState(null);

  const saveHouseData = (data) => {
    setHouseData(data);
  };

  return (
    <HouseContext.Provider value={{ houseData, saveHouseData }}>
      {children}
    </HouseContext.Provider>
  );
};

export { HouseContext };
export default HouseProvider;
