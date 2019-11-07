import React, { createContext } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = GlobalContext.Provider;
export const GlobalContextConsumer = GlobalContext.Consumer;

import Router from "../../ui/components/router";

export default () => <Router />;
