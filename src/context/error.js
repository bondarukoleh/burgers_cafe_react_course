import React, {useState, createContext} from "react";

export const errorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const errorOccurred = (e) => setError(e);
  const removeError = () => setError(null);

  return <errorContext.Provider value={{error, errorOccurred, removeError}}>
    {children}
  </errorContext.Provider>;
};

export default ErrorProvider;
