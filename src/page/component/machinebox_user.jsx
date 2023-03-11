import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import Loading from "../../components/74185-boxes-unloading.json";
import {
  Box,
  useColorModeValue,
  Badge,
  Tooltip,
  Button,
  Divider,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Stack, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";
import { BsPlayCircleFill, BsPower, BsStopCircleFill } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDatetime } from "../../components/libs/format-datetime";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  InputGroup,
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
import { Grid, GridItem } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function Machinebox_user({ namemc, mcid, datamc }) {
  // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const toast = useToast();
  const token = localStorage.getItem("token");

  const dataAlljob = useSelector((state) => state.allVjobsMonitor);
  const dataAlljob_i = useSelector((state) => state.dataOrder_I);
  const order_inprocess = dataAlljob.filter(
    ({ MC_ID, StatusOrder }) =>
      (MC_ID == datamc.MC_ID) & (StatusOrder == "onprocess")
  );
  const order_waiting = dataAlljob.filter(
    ({ MC_ID, StatusOrder }) =>
      (MC_ID == datamc.MC_ID) & (StatusOrder == "waiting")
  );

  const dataStatusMCLineC1 = useSelector((state) => state.dataStatusMCLineC1);
  const datacountMC = dataAlljob_i.filter(({ MC_ID }) => MC_ID == mcid);
  const productionlinecheck = dataStatusMCLineC1
    .filter(({ MC_ProductionLine }) => MC_ProductionLine == "C1")
    .map((info, i) => ({
      value: info.MC_ID,
      label: `[${info.MC_Name}]`,
    }));
  // console.log(dataAlljob_i);
  const selectorders = order_waiting.map((info, i) => ({
    value: info.Order_ID,
    label: `${info.Order_ID} - ${info.Mat_No} - ${info.MatDesc}`,
  }));

  const [OpenAdd, setOpenAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState({});
  const eventOpenAdd = (info) => {
    // const readdatajob = allorderlist.filter(({ Order_ID }) => Order_ID == info);
    // setDataAdd(info);
    setOpenAdd(true);
  };
  // console.log(order_inprocess);
  const selectOrderModel = (orderid) => {
    setDataAdd(order_waiting.filter(({ Order_ID }) => Order_ID == orderid));
  };
  const eventCloseAdd = () => {
    setOpenAdd(false);
    setDataAdd({});
  };
  // console.log(dataAdd);
  const starteventAdd = (e) => {
    e.preventDefault();
    // console.log(dataAdd[0]);
    const dataAddOMC = dataAdd[0];
    axios
      .post(`${ip}/otp/edit-ordertoMCNow`, dataAddOMC, {
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
        hendelClosedetial();
      });
  };

  const handleChangenum = (value) => {
    value > dataEditOrderMC.TargetQty
      ? toast({
          title: "Production order exceeded",
          description: "ใส่ยอดเกินจำนวนที่กำหนด",
          status: "error",
          variant: "solid",
          isClosable: true,
        })
      : setDataEditOrderMC({ ...dataEditOrderMC, PlanTargetQty: value });
  };
  // console.log(order_waiting);
  const [opendetialmc, setOpendetialmc] = useState(false);
  const hendelOpendetial = () => {
    setOpendetialmc(true);
  };
  const hendelClosedetial = () => {
    setOpendetialmc(false);
  };

  const [OpenEditOrderMC, setOpeneditOrderMC] = useState(false);
  const [dataEditOrderMC, setDataEditOrderMC] = useState({});
  const eventOpenEditOrderMC = (info) => {
    setDataEditOrderMC(info);
    setOpeneditOrderMC(true);
    console.log(dataEditOrderMC);
  };
  const eventCloseEditOrderMC = () => {
    setOpeneditOrderMC(false);
  };

  const handleChangenum1 = (value) => {
    value > dataEditOrderMC.TargetQty
      ? toast({
          title: "Production order exceeded",
          description: "ใส่ยอดเกินจำนวนที่กำหนด",
          status: "error",
          variant: "solid",
          isClosable: true,
        })
      : setDataEditOrderMC({ ...dataEditOrderMC, PlanTargetQty: value });
  };
  const starteventEdit = (e) => {
    e.preventDefault();
    console.log(dataEditOrderMC);
    axios
      .post(`${ip}/otp/edit-ordertoMC`, dataEditOrderMC, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state, msg } }) => {
        // Swal.fire({
        //   icon: state ? "success" : "error",
        //   title: state ? "Saved" : "Failed",
        //   text: msg,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        toast({
          title: "Edit production order",
          description: state ? "succeed" : "unsuccessful",
          status: state ? "success" : "error",
          variant: "solid",
          isClosable: true,
        });
        eventCloseEditOrderMC();
      });
  };

  const confirmOrder = (info, actual) => {
    const dataconfirm = {
      Activity: info.Activity,
      GrpCounter: info.GrpCounter,
      EMP_ID: datamc.EMP_ID,
      ID: info.ID,
      MC_ID: info.MC_ID,
      MC_Name: info.MC_Name,
      MC_ProductionLine: info.MC_ProductionLine,
      MRP_Controller: info.MRP_Controller,
      Mat_No: info.Mat_No,
      MatDesc: info.MatDesc,
      OptShortText: info.OptShortText,
      Opt_task_list_no: info.Opt_task_list_no,
      Order_ID: info.Order_ID,
      PlanTargetQty: info.TargetQty,
      ProdSup: info.ProdSup,
      SequenceNo: info.SequenceNo,
      StartDatetime: info.StartDatetime,
      TargetQty: info.TargetQty,
      Unit: info.Unit,
      WorkCenter: info.WorkCenter,

      FinishDatetime: formatDatetime(Date.now()).getDatetime,
      ActualFG: actual,
      NG: 0,
    };
    console.log("-");
    console.log(dataconfirm);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Confirm Job !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (dataconfirm.PlanTargetQty - dataconfirm.ActualFG > 0) {
          axios
            .post(`${ip}/otp/add-ordertoMClog`, dataconfirm, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Bearer " + token,
              },
            })
            .then(() => {
              axios.post(`${ip}/otp/edit-ordertoplan`, dataconfirm, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  Authorization: "Bearer " + token,
                },
              });
            })
            .then(({ data: { state, msg } }) => {
              Swal.fire({
                icon: state ? "success" : "error",
                title: state ? "Success" : "Failed",
                text: msg,
                showConfirmButton: false,
                timer: 1500,
              });
              // eventCloseAdd();
              hendelClosedetial();
            });
        } else {
          axios
            .post(`${ip}/otp/add-ordertoMClog`, dataconfirm, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Bearer " + token,
              },
            })
            .then(() => {
              axios.post(`${ip}/otp/delete-ordertoplan/${dataconfirm.ID}`);
            })
            .then(({ data: { state } }) => {
              Swal.fire({
                icon: state ? "success" : "error",
                title: state ? "Success" : "Failed",
                // text: msg,
                showConfirmButton: false,
                timer: 1500,
              });
              // eventCloseAdd();
              hendelClosedetial();
            });
        }
      }
    });
  };

  const changOrdertoPlan = () => {
    // e.preventDefault();
    console.log(order_inprocess[0]);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Cancel Job !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(order_inprocess[0]);
        const dataSinprocess = order_inprocess[0];
        axios
          .post(`${ip}/otp/edit-ordertoplan`, dataSinprocess, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + token,
            },
          })
          .then(({ data: { state, msg } }) => {
            Swal.fire({
              icon: state ? "success" : "error",
              title: state ? "Success" : "Failed",
              text: msg,
              showConfirmButton: false,
              timer: 1500,
            });
            eventCloseAdd();
            hendelClosedetial();
          });
      }
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div style={{ margin: "5px" }}>
        <Box
          // w={[375, 500, "92vw"]}
          onClick={hendelOpendetial}
          h="auto"
          // bg="red.200"
          borderWidth="1px"
          bg={useColorModeValue("white", "gray.800")}
          rounded="lg"
          shadow="xl"
          boxShadow={"lg"}
          position="relative"
          maxHeight={"80vh"}
          _first={{
            opacity:
              order_inprocess.length != 0 || order_waiting.length != 0
                ? "1"
                : "0.5",
          }}
          _hover={{
            opacity: "1",
            boxShadow:
              "rgb(125 125 125) 0px 0px 3px, rgb(125 125 125) 0px 0px 8px;",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                {" "}
                Machine :{" "}
                <b>
                  {namemc}

                  {/* {namemc.slice(2)} ({workcenters.MACHINE_TYPE}{workcenters.TONS}) */}
                </b>
              </div>
              {/* <div>Employee : {Employees.length !== 0 ?(Employees[0].FullName):('')}</div> */}
              <div>
                Employee : {datamc.FullName}
                {/* {jobassign[0].Order_ID != null ?(
                            <b>
                            {jobassign[0].Order_ID}
                            </b>
                            ) :(<>
                            {checkjobassign.length != '0' ? (
                              <Badge className="blink-notify" colorScheme={'orange'}>{checkjobassign.length}  JOB WAITING</Badge>
                            ):(<Badge  colorScheme={'red'}>NO JOB WAITING</Badge>)}
                            </>)} */}
              </div>
              <div>
                Job Order :{" "}
                {order_inprocess[0]?.Order_ID != null ? (
                  <b> {order_inprocess[0]?.Order_ID}</b>
                ) : (
                  <>
                    {order_waiting.length != 0 ? (
                      <>
                        <Badge
                          style={{ marginLeft: "15px" }}
                          className="blink-notify"
                          colorScheme={"orange"}
                        >
                          {order_waiting.length} Order WAITING
                        </Badge>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {/* {jobassign[0].Order_ID != null ?(
                                <>
                                {jobassign[0].MatDesc}
                                </>
                                ) :('')} */}
              </div>
            </div>
            <div></div>
            <div>
              {datamc.StatusMC === "RUN" ? (
                <Tooltip label="RUN" hasArrow bg="green.600" placement="top">
                  <div style={{ fontSize: "2em", color: "green" }}>
                    <BsPlayCircleFill />
                  </div>
                </Tooltip>
              ) : datamc.StatusMC === "STOP" ? (
                <Tooltip label="STOP" bg="red.600" hasArrow placement="top">
                  <div style={{ fontSize: "2em", color: "red" }}>
                    <BsPlayCircleFill />
                  </div>
                </Tooltip>
              ) : datamc.StatusMC === "ALARM" ? (
                <Tooltip label="ALARM" bg="orange.600" hasArrow placement="top">
                  <div style={{ fontSize: "2em", color: "orange" }}>
                    <BsPlayCircleFill />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip label="OFFLINE" hasArrow bg="gray.600" placement="top">
                  <div style={{ fontSize: "2em", color: "#848484" }}>
                    <BsStopCircleFill />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: " 0 8px 2px 8px",
            }}
          >
            {/* {(datacountMC[0]?.Actual >= 0 ? (datacountMC[0]?.Actual):(0))*100/order_inprocess[0]?.PlanTargetQty} */}
            {/* <div style={{width:'30%'}}>Actual</div> */}
            {order_inprocess[0]?.Order_ID != null ? (
              <>
                <div style={{ width: "100%" }}>
                  <ProgressBar
                    variant="success"
                    animated
                    now={Math.round(
                      ((datacountMC[0]?.Actual >= 0
                        ? datacountMC[0]?.Actual
                        : 0) *
                        100) /
                      order_inprocess[0]?.PlanTargetQty
            )}
                    style={{}}
                    label={`${Math.round(
                      ((datacountMC[0]?.Actual >= 0
                        ? datacountMC[0]?.Actual
                        : 0) *
                        100) /
                      order_inprocess[0]?.PlanTargetQty
            )}%`}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "100%" }}>
                  <ProgressBar
                    variant="success"
                    animated
                    now={0}
                    style={{}}
                    label={`0%`}
                  />
                </div>
              </>
            )}
            {/* {order_inprocess[0]?.Order_ID != null ? (
                  <div style={{width:'70%'}}><ProgressBar variant="success" animated now={(datacountMC[0]?.Actual >= 0 ? (datacountMC[0]?.Actual):(0))*100/order_inprocess[0]?.PlanTargetQty} style={{}} label={`${runPBar}%`}/></div>
                  ):(
                    <div style={{width:'70%'}}><ProgressBar variant="success" animated now={0} style={{}} label={`${0}%`}/></div>
                  )} */}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: " 0 8px 8px 8px",
            }}
          >
            {/* <div style={{width:'30%'}}>STD Time</div>
                  {datajobassign?.Order_ID != null ?(
                  <div style={{width:'70%'}}><ProgressBar animated now={showSTD} style={{}} label={`${showSTD}%`}/></div>
                  ):(<div style={{width:'70%'}}><ProgressBar animated now={0} style={{}} label={`${0}%`}/></div>)} */}
          </div>
        </Box>
      </div>

      <Modal
        isOpen={opendetialmc}
        onClose={hendelClosedetial}
        isCentered
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: "2rem", paddingBottom: "1px" }}>
            ۰{namemc}۰ ID {mcid}{" "}
            {datamc.StatusMC === "RUN" ? (
              <Badge
                style={{ marginLeft: "15px", fontSize: "1.5rem" }}
                // className="blink-notify"
                colorScheme={"green"}
              >
                RUN
              </Badge>
            ) : datamc.StatusMC === "STOP" ? (
              <Badge
                style={{ marginLeft: "15px", fontSize: "1.5rem" }}
                // className="blink-notify"
                colorScheme={"red"}
              >
                STOP
              </Badge>
            ) : (
              <Badge
                style={{ marginLeft: "15px", fontSize: "1.5rem" }}
                // className="blink-notify"
                colorScheme={"gray"}
              >
                Offline
              </Badge>
            )}
          </ModalHeader>
          <ModalCloseButton />
          {/* <form onSubmit={}> */}
          <ModalBody>
            {order_inprocess.length != 0 ? (
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <GridItem
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderInlineEnd: "var(--chakra-borders-1px)",
                  }}
                >
                  <CircularProgress
                    value={
                      ((datacountMC[0]?.Actual >= 0
                        ? datacountMC[0]?.Actual
                        : 0) *
                        100) /
                      order_inprocess[0]?.PlanTargetQty
                    }
                    color="green.400"
                    size={"250px"}
                    thickness="5px"
                  >
                    <CircularProgressLabel>
                      {Math.round(
                        ((datacountMC[0]?.Actual >= 0
                          ? datacountMC[0]?.Actual
                          : 0) *
                          100) /
                          order_inprocess[0]?.PlanTargetQty
                      )}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    style={{ fontSize: "var(--chakra-fontSizes-xl)" }}
                  >
                    <div>Plan Target:</div>
                    <div style={{fontWeight:'bold'}}>{order_inprocess[0]?.PlanTargetQty}</div>
                    <div>Actual:</div>
                    <div style={{fontWeight:'bold'}}>
                      {datacountMC[0]?.Actual >= 0 ? datacountMC[0]?.Actual : 0}
                    </div>
                    <div>Diff:</div>
                    <div style={{fontWeight:'bold'}}>
                      {(datacountMC[0]?.Actual >= 0
                        ? datacountMC[0]?.Actual
                        : 0) - order_inprocess[0]?.PlanTargetQty}
                    </div>
                  </Grid>
                </GridItem>
                <GridItem colSpan={2} m={"0 0 0 40px"}>
                  <b style={{ fontSize: "1.4rem" }}>Production Information</b>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap={2}
                    style={{
                      fontSize: "var(--chakra-fontSizes-lg)",
                      marginTop: "15px",
                      height:'90%'
                    }}
                  >
                    <GridItem>Employee</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {datamc.FullName}
                    </GridItem>
                    <GridItem w="100%">Order ID</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.Order_ID}
                    </GridItem>
                    <GridItem w="100%">Material</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.Mat_No}
                    </GridItem>
                    <GridItem w="100%">Material Description</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.MatDesc}
                    </GridItem>
                    <GridItem w="100%">Start Date</GridItem>
                    <GridItem colSpan={2} w="100%">
                      :{" "}
                      {
                        formatDatetime(order_inprocess[0]?.StartDatetime)
                          .getDatetimeLocal2
                      }
                    </GridItem>
                    <GridItem w="100%">TargetQty</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.TargetQty}
                    </GridItem>
                    {/* <GridItem w="100%">Activity</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.Activity}
                    </GridItem>
                    <GridItem w="100%">Operation</GridItem>
                    <GridItem colSpan={2} w="100%">
                      : {order_inprocess[0]?.OptShortText}
                    </GridItem> */}

                    <GridItem colSpan={3} w="100%">
                      <Grid
                        templateColumns="repeat(3, 1fr)"
                        gap={4}
                        style={{ marginTop: "15px" }}
                      >
                        {/* <Button
                          colorScheme="yellow"
                          borderRadius="50px"
                          leftIcon={<FiEdit />}
                          onClick={() =>
                            eventOpenEditOrderMC(order_inprocess[0])
                          }
                        >
                          Edit
                        </Button> */}
                        {datamc.FullName != null & datamc.FullName === localStorage.getItem("Name") || 'admin' == localStorage.getItem("Name") ? (
                          <>
                          <Button
                            leftIcon={<FiCheck />}
                            colorScheme="green"
                            borderRadius="50px"
                            onClick={() =>
                              confirmOrder(
                                order_inprocess[0],
                                datacountMC[0]?.Actual
                              )
                            }
                          >
                            Confirm
                          </Button>
                          <Button
                          leftIcon={<FiX />}
                          colorScheme="red"
                          borderRadius="50px"
                          onClick={() => changOrdertoPlan(order_inprocess[0])}
                        >
                          Cancel
                        </Button>
                        </>
                        ) : (
                          <>
                          <Button
                            disabled
                            leftIcon={<FiCheck />}
                            colorScheme="green"
                            borderRadius="50px"
                          >
                            Confirm
                          </Button>
                          <Button
                          disabled
                          leftIcon={<FiX />}
                          colorScheme="red"
                          borderRadius="50px"
                          onClick={() => changOrdertoPlan(order_inprocess[0])}
                        >
                          Cancel
                        </Button>
                        </>
                        )}

                        
                        {/* <Button
                          colorScheme="red"
                          borderRadius="50px"
                          onClick={() => DeleteOTMC(order_inprocess[0]?.ID)}
                        >
                          Delete Order
                        </Button> */}
                      </Grid>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            ) : (
              <>
                {/* <div style={{display:'flex'}}> */}
                {order_waiting.length != 0 ? (
                  <>
                    <VStack
                      // divider={<StackDivider borderColor='gray.200' />}
                      spacing={4}
                      align="center"
                    >
                      <Text fontSize="4xl" style={{}}>
                        No production order
                      </Text>
                      <Lottie options={defaultOptions} width={"300px"} />
                      <Button
                        colorScheme={"yellow"}
                        onClick={() => eventOpenAdd(order_waiting)}
                      >
                        Assing Order
                      </Button>
                      <Badge className="blink-notify" colorScheme={"orange"}>
                        {order_waiting.length} Order WAITING
                      </Badge>
                    </VStack>
                  </>
                ) : (
                  <>
                    <VStack
                      // divider={<StackDivider borderColor='gray.200' />}
                      spacing={4}
                      align="center"
                    >
                      <Text fontSize="4xl" style={{}}>
                        No production plan
                      </Text>
                      <Lottie options={defaultOptions} width={"300px"} />
                      <Text
                        fontSize="4xl"
                        className="blink-notify-mess"
                        style={{}}
                      >
                        Please contact Planning
                      </Text>
                    </VStack>
                  </>
                )}
                {/* </div> */}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="red" mr={3} onClick={hendelClosedetial}>
              Close
            </Button>
            <Button colorScheme="green" type="submit">
              Save
            </Button> */}
          </ModalFooter>
          {/* </form> */}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={OpenEditOrderMC}
        onClose={eventCloseEditOrderMC}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: "2rem" }}>۰Edit order۰</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={starteventEdit}>
            <ModalBody>
              <FormControl>
                <FormLabel style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Order
                </FormLabel>
                <Input
                  style={{ opacity: "1", cursor: "default" }}
                  disabled
                  variant="filled"
                  placeholder="Name..."
                  defaultValue={dataEditOrderMC.Order_ID}
                />
              </FormControl>
              <Stack spacing={4}>
                <HStack>
                  <FormControl style={{ width: "150px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Material
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Username..."
                      defaultValue={dataEditOrderMC.Mat_No}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Description
                    </FormLabel>
                    <InputGroup>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        variant="filled"
                        // type={showPassword ? "text" : "password"}
                        defaultValue={dataEditOrderMC.MatDesc}
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </Stack>
              <Stack spacing={4}>
                <HStack>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Start Date
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Username..."
                      defaultValue={
                        formatDatetime(dataEditOrderMC.StartDatetime)
                          .getDatetimeLocal2
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Activity
                    </FormLabel>
                    <InputGroup>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        variant="filled"
                        defaultValue={dataEditOrderMC.Activity}
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </Stack>
              <Stack spacing={4}>
                <HStack>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Operation short text
                    </FormLabel>
                    <InputGroup>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        variant="filled"
                        defaultValue={dataEditOrderMC.OptShortText}
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </Stack>
              <FormControl>
                <FormLabel style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  TargetQty
                </FormLabel>
                <Input
                  style={{ opacity: "1", cursor: "default" }}
                  disabled
                  variant="filled"
                  placeholder="Name..."
                  defaultValue={dataEditOrderMC.TargetQty}
                />
              </FormControl>
              <Stack spacing={4}>
                <HStack>
                  <FormControl isRequired style={{ width: "250px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Plan Target
                    </FormLabel>
                    <NumberInput
                      min={0}
                      max={dataEditOrderMC.TargetQty}
                      defaultValue={dataEditOrderMC.PlanTargetQty}
                      onChange={handleChangenum1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Machine
                    </FormLabel>
                    <Select
                      style={{
                        opacity: "1",
                        cursor: "default",
                        backgroundColor: "#EDF2F7",
                        borderColor: "#EDF2F7",
                      }}
                      disabled
                      placeholder="Machine Line..."
                      defaultValue={dataEditOrderMC.MC_ID}
                    >
                      {productionlinecheck.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </HStack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* <Button colorScheme="red" mr={3} onClick={()=>DeleteOTMC(dataEdit.ID)}>
                  Delete
                </Button> */}
                <Button colorScheme="green" type="submit">
                  Save
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* order_inprocess */}

      <Modal isOpen={OpenAdd} onClose={eventCloseAdd} isCentered size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: "2rem" }}>۰Assign order۰</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={starteventAdd}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Select Order
                </FormLabel>
                <Select
                  // style={{ opacity: "1", cursor: "default",backgroundColor:'#EDF2F7',borderColor:'#EDF2F7' }}

                  placeholder="Select Order..."
                  onChange={(e) => selectOrderModel(e.target.value)}
                >
                  {selectorders.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "8px 0",
                  cursor: "context-menu",
                  opacity: "0.5",
                }}
              >
                ..........................................................................................................
              </div>
              <FormControl>
                <FormLabel style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Order
                </FormLabel>
                <Input
                  style={{ opacity: "1", cursor: "default" }}
                  disabled
                  variant="filled"
                  placeholder="Order ID..."
                  defaultValue={dataAdd[0]?.Order_ID}
                  onChange={(e) =>
                    setDataAdd({
                      ...dataAdd,
                      Order_ID: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Stack spacing={4}>
                <HStack>
                  <FormControl style={{ width: "250px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Material
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Material No..."
                      defaultValue={dataAdd[0]?.Mat_No}
                      onChange={(e) =>
                        setDataAdd({
                          ...dataAdd,
                          Mat_No: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Description
                    </FormLabel>
                    <InputGroup>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        placeholder="Material Description..."
                        variant="filled"
                        // type={showPassword ? "text" : "password"}
                        defaultValue={dataAdd[0]?.MatDesc}
                        onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            MatDesc: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </Stack>
              <Stack spacing={4}>
                <HStack>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Start Date
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Start Date..."
                      defaultValue={dataAdd[0]?.StartDatetime}
                    />
                  </FormControl>
                  <FormControl style={{ width: "450px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Activity
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Activity..."
                      defaultValue={dataAdd[0]?.Activity}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Operation short text
                    </FormLabel>
                    <InputGroup>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        variant="filled"
                        defaultValue={dataAdd[0]?.OptShortText}
                        onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            OptShortText: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </Stack>

              <Stack spacing={4}>
                <HStack>
                  <FormControl style={{ width: "350px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        marginTop: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      TargetQty
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="TargetQty..."
                      defaultValue={dataAdd[0]?.TargetQty}
                    />
                  </FormControl>
                  <FormControl isRequired style={{ width: "350px" }}>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Plan Target
                    </FormLabel>
                    <Input
                      style={{ opacity: "1", cursor: "default" }}
                      disabled
                      variant="filled"
                      placeholder="Plan Target..."
                      defaultValue={dataAdd[0]?.PlanTargetQty}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Machine
                    </FormLabel>
                    <Select
                      style={{
                        opacity: "1",
                        cursor: "default",
                        backgroundColor: "#EDF2F7",
                        borderColor: "#EDF2F7",
                      }}
                      disabled
                      placeholder="Machine Line..."
                      defaultValue={mcid}
                      // onChange={(e) =>
                      //   setDataAdd({
                      //     ...dataAdd,
                      //     MC_ID: e.target.value,
                      //   })
                      // }
                    >
                      {productionlinecheck.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </HStack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={eventCloseAdd}>
                Close
              </Button>
              {/* <Button colorScheme="red" mr={3} onClick={()=>console.log(dataAdd)}>
                  ...
                </Button> */}
              <Button colorScheme="green" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
