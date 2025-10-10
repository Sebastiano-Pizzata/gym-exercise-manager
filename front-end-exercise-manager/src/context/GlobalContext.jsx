import { createContext, useContext } from "react";

const GlobalContext = createContext(undefined);

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, useGlobalContext };