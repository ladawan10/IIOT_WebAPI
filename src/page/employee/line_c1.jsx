import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";
import {
  Wrap,
  WrapItem,
  Center,
  useColorModeValue,
  Button,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { formatDatetime } from "../../components/libs/format-datetime";
import {
  FiFilePlus,
  FiFilter,
  FiXSquare,
  FiEdit,
  FiSearch,
  FiArrowLeft,
} from "react-icons/fi";
import { Stack, HStack, VStack, Input, SimpleGrid } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  InputGroup,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import Machineboxhome from "../component/machineboxhome";
import Machinebox_user from "../component/machinebox_user";
import Tableshow from "../component/tableAddordertoPlan/DataTable";

import Lottie from "react-lottie";
import Loading2 from "../../components/29894-error-404-page.json";
import Loading from "../../components/95728-loading-19.json";
import Loading3 from "../../components/99387-loading-page.json"; //?OK
import Loading4 from "../../components/97930-loading.json";
import Loading5 from "../../components/74185-boxes-unloading.json";

export default function Line_c1() {

  // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${ip}/p/showorder`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // console.log(isLoaded);

 

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const toast = useToast();

  const alldataMachine = useSelector((state) => state.dataMachine);
  const dataStatusMCLineC1 = useSelector((state) => state.dataStatusMCLineC1);
  const dataAlljob = useSelector((state) => state.allVjobsMonitor);

  const allproductionLinelist = useSelector((state) => state.dataLine);
  const allorderlist = useSelector((state) => state.dataOrder);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม

  const productionlinecheck = dataStatusMCLineC1
    .filter(({ MC_ProductionLine }) => MC_ProductionLine == "C1")
    .map((info, i) => ({
      value: info.MC_ID,
      label: `[${info.MC_Name}]`,
    }));

  const alluserlist = useSelector((state) => state.datauser);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState({});
  const eventOpenAdd = (info) => {
    // const readdatajob = allorderlist.filter(({ Order_ID }) => Order_ID == info);
    setDataAdd({
      MC_ProductionLine: "C1",
      Order_ID: info.Order_ID,
      Mat_No: info.Mat_No,
      MatDesc: info.MatDesc,
      TargetQty: info.TargetQty,
      PlanTargetQty: info.TargetQty,
      Unit: info.Unit,
      ScrapQty: info.ScrapQty,
      Activity: info.Activity,
      OptShortText: info.OptShortText,
      Opt_task_list_no: info.Opt_task_list_no,
      MRP_Controller: info.MRP_Controller,
      ProdSup: info.ProdSup,
      SequenceNo: info.SequenceNo,
      GrpCounter: info.GrpCounter,
      WorkCenter: info.WorkCenter,
      BS_StartDate: info.BS_StartDate,
      BS_FinishDate: info.BS_FinishDate,
      StartDatetime: formatDatetime(Date.now()).getDatetime,
    });
    setOpenAdd(true);
    // console.log(dataAdd);
  };

  const handleChangenum = (value) =>
    setDataAdd({ ...dataAdd, PlanTargetQty: value });
  const handleChangenum1 = (value) => {
    value > dataEdit.TargetQty
      ? toast({
          title: "Production order exceeded",
          description: "ใส่ยอดเกินจำนวนที่กำหนด",
          status: "error",
          variant: "solid",
          isClosable: true,
        })
      : setDataEdit({ ...dataEdit, PlanTargetQty: value });
  };
  const handleChangenum2 = (value) => {
    value > dataEditOTP.TargetQty
      ? toast({
          title: "Production order exceeded",
          description: "ใส่ยอดเกินจำนวนที่กำหนด",
          status: "error",
          variant: "solid",
          isClosable: true,
        })
      : setDataEditOTP({ ...dataEditOTP, PlanTargetQty: value });
  };

  const eventCloseAdd = () => {
    setOpenAdd(false);
  };
  const clickhandler = (name) => {
    eventOpenAdd(name);
    // console.log(name);
  };
  const starteventAdd = (e) => {
    e.preventDefault();
    // console.log(dataAdd);
    axios
      .post(`${ip}/otp/add-ordertoplan`, dataAdd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state, msg } }) => {
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Saved" : "Failed",
          text: msg,
          showConfirmButton: false,
          timer: 1500,
        });
        eventCloseAdd();
        handelcloseShowordersap();
      });
  };

  const [OpenEditOrdertoplan, setOpenEditOrdertoplan] = useState(false);
  const [dataEditOTP, setDataEditOTP] = useState({});
  const hendelOpeneditOTP = (info) => {
    setDataEditOTP(info);
    setOpenEditOrdertoplan(true);
    console.log(dataEditOTP);
  };
  const hendelCloseeditOTP = () => {
    setOpenEditOrdertoplan(false);
  };
  const hendeleditOTP = (e) => {
    e.preventDefault();
    console.log(dataEditOTP);
    axios
      .post(`${ip}/otp/edit-ordertoplan`, dataEditOTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state, msg } }) => {
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Saved" : "Failed",
          text: msg,
          showConfirmButton: false,
          timer: 1500,
        });
        hendelCloseeditOTP();
      });
  };

  const DeleteOTP = (id) => {
    // hendelCloseeditOTP();
    // console.log(id);
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      title: "Are you sure?",
      text: "Do you want to Delete  !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${ip}/otp/delete-ordertoplan/${id}`)
          .then(({ data: { state, msg } }) => {
            Swal.fire({
              icon: state ? "success" : "error",
              title: state ? "Deleted" : "Failed",
              text: msg,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const [OpenEdit, setOpenedit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const eventOpenEdit = (info) => {
    setDataEdit(info);
    setOpenedit(true);
    console.log(dataEdit);
  };
  const eventCloseEdit = () => {
    setOpenedit(false);
  };
  const starteventEdit = (e) => {
    e.preventDefault();
    // console.log(dataEdit);
    axios
      .post(`${ip}/otp/edit-ordertoMC`, dataEdit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state, msg } }) => {
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Saved" : "Failed",
          text: msg,
          showConfirmButton: false,
          timer: 1500,
        });
        eventCloseEdit();
      });
  };
  const DeleteOTMC = (id) => {
    // eventCloseEdit();
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete  !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${ip}/otp/delete-ordertoMC/${id}`)
          .then(({ data: { state, msg } }) => {
            Swal.fire({
              icon: state ? "success" : "error",
              title: state ? "Deleted" : "Failed",
              text: msg,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  // let names = ["1720040071", "1720040070"];
  // const string = OrderIDList.toString();
  // const ans_array = string.split(",");
  // console.log(ans_array);
  // console.log(names);
  // const string2 = OrderIDList2.toString();
  // const ans_array2 = string2.split(",");
  // console.log(ans_array2);

  const [showOrdersap, setShowOrdersap] = useState(false);
  const handelshoworder = () => {
    setShowOrdersap(true);
  };
  const handelcloseShowordersap = () => {
    setShowOrdersap(false);
  };
  return (
    <div>
      <motion.div
        // key={selectedTab ? selectedTab.label : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* <div
          style={{
            // width: "100vw",
            // height: "100vh",
            display: "flex",
            margin: "0 15px 0 15px",
            justifyContent: "center",
          }}
        > */}
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={3}
          style={{
            fontSize: "var(--chakra-fontSizes-lg)",
            marginTop: "10px",
            marginLeft: "5px",
          }}
        >
          <GridItem colSpan={2} w={"100%"}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 36px'}}>

            <a style={{fontSize:'2rem',fontWeight:'bold'}}>Line C1</a>
            <Button leftIcon={<FiArrowLeft/>} colorScheme='orange' onClick={()=>navigate("/working")}>Back</Button>
            </div>
          </GridItem>
          <GridItem w={"100%"}>
            <Box w={"99vw"}>
              <div className="overflow-auto" style={{ height: "47vh" }}>
                <SimpleGrid minChildWidth="350px" spacing="3px">
                  {/* {alldataMachine.length} */}
                  {dataStatusMCLineC1.length != 0 ? (
                    dataStatusMCLineC1
                      .filter(
                        ({ MC_ProductionLine }) => MC_ProductionLine == "C1"
                      )
                      .map((info, i) => (
                        <Machinebox_user
                          key={i}
                          namemc={info.MC_Name}
                          mcid={info.MC_ID}
                          datamc={info}
                        />
                      ))
                  ) : (
                    <Lottie options={defaultOptions} width={"500px"} />
                  )}
                </SimpleGrid>
              </div>
            </Box>
          </GridItem>
        </Grid>

        {/* </div> */}

      </motion.div>
    </div>
  );
}
