import React, { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  const Authorize = () => setIsAuthorized(prev => !prev);

  return (
    <UserContext.Provider value={{ isAuthorized, Authorize }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;