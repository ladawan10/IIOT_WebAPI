import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  datauser,
  dataOrder_W,
  dataOrder_I,
  dataLine,
  dataPlanOrder,
  dataPlanOrderView,
  allVjobsMonitor,
  dataMachine,
  dataStatusMCLineC1,
  dataOrder_log,
  datacheckcount,
  dataoperationslip,
} from "./index";
export const store = configureStore({
  reducer: {
    datauser: datauser,
    dataOrder_W: dataOrder_W,
    dataOrder_I: dataOrder_I,
    dataLine: dataLine,
    dataPlanOrder: dataPlanOrder,
    dataPlanOrderView: dataPlanOrderView,
    allVjobsMonitor: allVjobsMonitor,
    dataMachine: dataMachine,
    dataStatusMCLineC1: dataStatusMCLineC1,
    dataOrder_log: dataOrder_log,
    datacheckcount: datacheckcount,
    dataoperationslip: dataoperationslip,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
const StateProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default StateProvider;
