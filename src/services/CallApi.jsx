import React, { useEffect } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";

import { updateDatauser } from "../bloc/datauser";
import { updateDataMachine } from "../bloc/datamachine";
import { updateDataPLine } from "../bloc/dataline";
import { updateDataOrder_w } from "../bloc/dataorder_w";
import { updateDataOrder_i } from "../bloc/dataorder_i";

import { updateDataPlanOrder } from "../bloc/dataplanorder";
import { updateDataPlanOrderView } from "../bloc/dataplanorderoverview";

import { updateDataStatusMCLineC1 } from "../bloc/mc/dataStatusMCLineC1";
import { updateAllVJobsMonitor } from "../bloc/allVjobsMonitorSlice"; //? Job run & waiting
import { updateDataOrder_log } from "../bloc/dataorder_log";
import { updatedatacheckcount } from "../bloc/datacheckcount";
import { updatedataoperationslip } from "../bloc/dataoperationslip";

export default function CallAPI() {
  const dispatch = useDispatch();

   // const ip = 'http://localhost:4001/api-iot-cl'
   const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';

   const getAlldatacheckcount = () => {
    axios.get(`http://localhost:1410/api/checkcounter`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updatedatacheckcount(data));
    });
  };
  const getAlldataoperationslip = () => {
    axios.get(`http://localhost:1410/api/OperationSlip`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updatedataoperationslip(data));
    });
  };
  const getAllUser = () => {
    axios.get(`${ip}/admin/show-user`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updateDatauser(data));
    });
  };
  const getAllMasterMC = () => {
    axios.get(`${ip}/admin/show-msmc`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updateDataMachine(data));
    });
  };
  
  const getAllVJobsMonitor = () => {
    axios.get(`${ip}/op/showorderinplan`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updateAllVJobsMonitor(data));
    });
  };

  
  const getAllDataProductionLine = () => {
    axios.get(`${ip}/p/showProductionLine`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updateDataPLine(data));
    });
  };

  const getAllStatusMCLineC1 = () => {
    axios.get(`${ip}/mc/show-statusLineC1`).then(({ data }) => {
      // console.log("CALL API getAllVJobsAssign=", data);
      dispatch(updateDataStatusMCLineC1(data));
    });
  };
  const getDataOrder_w = () => {
    axios.get(`${ip}/so/showorderwaiting`).then(({ data }) => {
      // console.log("CALL API getAllVJobsAssign=", data);
      dispatch(updateDataOrder_w(data));
    });
  };
  const getDataOrder_i = () => {
    axios.get(`${ip}/so/showorderinprocess`).then(({ data }) => {
      // console.log("CALL API getAllVJobsAssign=", data);
      dispatch(updateDataOrder_i(data));
    });
  };
  const getOrder_Logger = () => {
    axios.get(`${ip}/p/showOrderfinish`).then(({ data }) => {
      // console.log("CALL API ADMIN=", data);
      dispatch(updateDataOrder_log(data));
    });
  };
    
  
  useEffect(() => {
    const initPage1 = setTimeout(() => {
      getAlldatacheckcount();
      getAlldataoperationslip();
      getAllUser();
      getAllDataProductionLine();
      getAllMasterMC();
      getAllStatusMCLineC1();
      getAllVJobsMonitor();
      // getDataOrder_w();
      getDataOrder_i();
      getOrder_Logger();
      // getAllDashboardSumNg();
      // getAllVJobsAssign();
      // getAllVJobsAssignMonitor();
      // getAllVJobsMonitor();
      // getAllEmployeeAss();
      // getAllJobLogger();
      // getAllJobAssignMC();
      // getAllDataPlanOrderView();
    }, 0);
    const timer3s1 = setInterval(() => {
      getAlldatacheckcount();
      getAlldataoperationslip();
      getAllUser();
      getAllDataProductionLine();
      getAllMasterMC();
      getAllStatusMCLineC1();
      getAllVJobsMonitor();
      // getDataOrder_w();
      getDataOrder_i();
      getOrder_Logger();
      // getAllDashboardSumNg();
      // getAllVJobsAssign();
      // getAllVJobsAssignMonitor();
      // getAllVJobsMonitor();
      // getAllEmployeeAss();
      // getAllDataPlanOrderView();

    }, 3000);
    return () => {
      clearTimeout(initPage1);
      clearInterval(timer3s1);
    };
  }, []);

  return <></>;
};
