import React, {useState, createContext} from "react";

export const priceContext = createContext();

const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState(0);

  return <priceContext.Provider value={{price, setPrice}}>
    {children}
  </priceContext.Provider>;
};

export default PriceProvider;
