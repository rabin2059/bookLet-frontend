import { createContext } from "react";
import { useState, useEffect } from "react";
import apiClient from "../api/axios.js";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const value = {};
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
