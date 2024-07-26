import React, { Children } from "react";
import useAuth from "../components/hooks/useAuth";

const AppWrapper = ({ children }) => {
  useAuth();
  return <div>{children}</div>;
};

export default AppWrapper;
