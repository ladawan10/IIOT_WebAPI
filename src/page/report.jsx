import React ,{useState}from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  Progress,
  Badge,
} from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Lottie from "react-lottie";
import Loading from "../components/97930-loading.json";

import { formatDatetime } from "../components/libs/format-datetime";
import { FiFilePlus, FiFilter, FiXSquare, FiEdit } from "react-icons/fi";
import { Stack, HStack, VStack } from "@chakra-ui/react";
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
import { Tooltip } from "bootstrap";

export default function Report() {
   // const ip = 'http://localhost:4001/api-iot-cl'
   const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const allorderlist = useSelector((state) => state.dataOrder);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม
  // console.log(alldataPlanOrderlist);
  const allJobLogger = useSelector((state) => state.allJobLogger);
  const allVjobsAssign = useSelector((state) => state.allVjobsAssign);
  const allVjobsMonitor = useSelector((state) => state.allVjobsMonitor);
  const allDashboardSumNg = useSelector((state) => state.allDashboardSumNg);
  const allJobAssignMC = useSelector((state) => state.allJobAssignMC);
  const allVjobsAssignMonitor = useSelector(
    (state) => state.allVjobsAssignMonitor
  );
  const allEmployeeAss = useSelector((state) => state.allEmployeeAss);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [datamc , setDatamc] = useState({})


  // console.log(allVjobsAssign);
  return (
    <div>
      <motion.div
        // key={selectedTab ? selectedTab.label : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            // width: "100vw",
            // height: "100vh",
            display: "flex",
            margin: "0 15px 0 15px",
            justifyContent: "center",
          }}
        >
          <Wrap
            spacing="30px"
            justify="center"
            sx={{ padding: "16px", width: "100%" }}
          >
            <Box
              w={[375, 500, "95vw"]}
              h="40vh"
              // bg="red.200"
              borderWidth="1px"
              bg={useColorModeValue("white", "gray.800")}
              rounded="lg"
              shadow="xl"
              boxShadow={"lg"}
              position="relative"
              maxHeight={"90vh"}
              height={"90vh"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    padding: "16px 0 0  16px  ",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Report
                </h2>
                <div
                  style={{
                    fontSize: "2rem",
                    padding: "16px 16px 0 0",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  {/* <Button
                    colorScheme="green"
                    variant="solid"
                    style={{ fontSize: "1.5rem" }}
                    // onClick={eventOpenAdd} 
                  >
                    <FiFilter />
                  </Button> */}
                </div>
              </div>
              <br />
              <Tabs variant="enclosed" colorScheme="green">
                <TabList>
                  
                  <Tab><b style={{color:'blue'}}>In Process ({})</b></Tab>
                  <Tab><b style={{color:'orange'}}>Waiting ({}) </b></Tab>
                  <Tab> <b style={{color:'green'}}> Finished ({})</b></Tab>
                </TabList>
                <TabPanels>
                <TabPanel style={{ padding: "5px 0 0 0" }}>
                    <div
                      className="overflow-auto"
                      style={{ height: "75vh" }}
                    >
                      {/* <iframe src="https://embed.lottiefiles.com/animation/97930"></iframe> */}
                      {/* <Lottie options={defaultOptions} width={'200px'} /> */}
                      <TableContainer>
                        <Table variant="striped">
                          <Thead>
                            <Tr
                              style={{ textAlignLast: "center" }}
                              className="fontnew"
                              bg={useColorModeValue("gray.300", "gray.900")}
                            >
                              <Th padding={2} fontSize={"1rem"}>
                                No.
                              </Th>
                              {/* <Th maxWidth={'200px'}>Line</Th> */}
                              <Th
                                maxWidth={"200px"}
                                fontSize={"1rem"}
                                padding={2}
                              >
                                Machine Name
                              </Th>
                              <Th
                                maxWidth={"500px"}
                                style={{ whiteSpace: "break-spaces" }}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Employee
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Order ID
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Material
                              </Th>
                              <Th maxWidth={"200px"} fontSize={"1rem"}>
                                Material Description
                              </Th>
                              {/* <Th
                                minWidth={"80px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                TargetQty
                              </Th> */}
                              <Th padding={4} fontSize={"1rem"}>
                                BALANCE
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Plan TargetQty
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Actual FG
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Diff
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                NG
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Actual <br /> (Baht/Ton)
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Target <br /> (Baht/Ton)
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Customer
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Date
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                process
                              </Th>
                              {/* <Th maxWidth={"200px"} padding={2} fontSize={'1rem'}>Status</Th> */}
                              {/* <Th isNumeric>multiply by</Th> */}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {/* {allJobAssignMC.map((info, i) => (
                              <Tr key={i} style={{ textAlignLast: "center" }}>
                                <Td>{i + 1}</Td>
                                
                                <Td style={{ padding: "16px" }}>
                                  {info.MACHINE_NAME} ({info.MACHINE_TYPE}
                                  {info.TONS})
                                </Td>
                                <Td
                                  maxWidth={"230px"}
                                  style={{
                                    padding: "0 10px 0 10px",
                                    overflow: "overlay",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <p>{info.FullName}</p>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Order_ID}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Mat_No}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MatDesc}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.BALANCE}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b>{Math.round(info.PlanTargetDay)}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b style={{color:'green'}}>{
                    (info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))}
                  </b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                 <b style={{color:'orange'}}> {Math.floor(
                                info.COUNTER * info.Cavity -
                                  info.PlanTargetDay * info.Cavity -
                                  info.NG
                              )}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b style={{color:'red'}}>{info.NG}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                {(
                    ((info.COUNTER * info.Cavity -
                      info.NG) *
                      info.ConditionAmount) /
                      info.TONS
                  ).toFixed(0)}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                {(
                    (info.PlanTargetDay*
                      info.ConditionAmount) /
                      info.TONS
                  ).toFixed(0)}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MRP_Name}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {
                                    formatDatetime(info.DatetimeOpenOrder)
                                      .getDatetimeLocal2
                                  }{" "}
                                  
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                {
                                        Math.round((((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) /
                                        info.PlanTargetDay)
                                      } % <br />
                                  {( ((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) / info.PlanTargetDay <=
                                  49 ? (
                                    <Progress
                                      className="progress"
                                      colorScheme='red'
                                      hasStripe
                                      value={
                                        ( ((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  ) : ( ((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) /
                                      info.PlanTargetDay <=
                                    69 ? (
                                    <Progress
                                      className="progress"
                                      colorScheme='yellow'
                                      hasStripe
                                      value={
                                        ( ((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  ) : (
                                    <Progress
                                      className="progress"
                                      colorScheme='green'
                                      hasStripe
                                      value={
                                        (((info.COUNTER * info.Cavity) - ((info.NG != '') ? (info.NG):(0))) * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  )}
                                </Td>
                              </Tr>
                            ))} */}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </div>
                  </TabPanel>
                  <TabPanel style={{ padding: "5px 0 0 0" }}>
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "75vh" }}
                    >
                      {/* <iframe src="https://embed.lottiefiles.com/animation/97930"></iframe> */}
                      {/* <Lottie options={defaultOptions} width={'200px'} /> */}
                      <TableContainer>
                        <Table variant="striped">
                          <Thead>
                            <Tr
                              style={{ textAlignLast: "center" }}
                              className="fontnew"
                              bg={useColorModeValue("gray.300", "gray.900")}
                            >
                              <Th padding={2} fontSize={"1rem"}>
                                No.
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                fontSize={"1rem"}
                                padding={2}
                              >
                                Machine Name
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Order ID
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Material
                              </Th>
                              <Th maxWidth={"200px"} fontSize={"1rem"}>
                                Material Description
                              </Th>
                              <Th
                                minWidth={"80px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                TargetQty
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                BALANCE
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Plan TargetQty
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Customer
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Date
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody sx={{height:'70vh'}}>
                            {allVjobsMonitor.map((info, i) => (
                              <Tr key={i} style={{ textAlignLast: "center" }}>
                                <Td>{i + 1}</Td>
                                <Td style={{ padding: "16px" }}>
                                <b> {info.MACHINE_NAME} ({info.MACHINE_TYPE}
                                  {info.TONS}) </b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Order_ID}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Mat_No}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MatDesc}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                <b>{info.TargetQty}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.BALANCE}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b>{Math.round(info.PlanTargetDay)}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MRP_Name}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {
                                    formatDatetime(info.BS_StartDate)
                                      .getDatetimeLocal3
                                  }{" "}
                                  - {" "}
                                  {
                                    formatDatetime(info.BS_FinishDate)
                                      .getDatetimeLocal3
                                  }
                                </Td>
                                
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </div>
                  </TabPanel>
                  <TabPanel style={{ padding: "5px 0 0 0" }}>
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "75vh" }}
                    >
                      {/* <iframe src="https://embed.lottiefiles.com/animation/97930"></iframe> */}
                      {/* <Lottie options={defaultOptions} width={'200px'} /> */}
                      <TableContainer>
                        <Table variant="striped">
                          <Thead>
                            <Tr
                              style={{ textAlignLast: "center" }}
                              className="fontnew"
                              bg={useColorModeValue("gray.300", "gray.900")}
                            >
                              <Th padding={2} fontSize={"1rem"}>
                                No.
                              </Th>
                              {/* <Th maxWidth={'200px'}>Line</Th> */}
                              <Th
                                maxWidth={"200px"}
                                fontSize={"1rem"}
                                padding={2}
                              >
                                Machine Name
                              </Th>
                              <Th
                                maxWidth={"500px"}
                                style={{ whiteSpace: "break-spaces" }}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Employee
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Order ID
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Material
                              </Th>
                              <Th maxWidth={"200px"} fontSize={"1rem"}>
                                Material Description
                              </Th>
                              <Th
                                minWidth={"80px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                TargetQty
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                BALANCE
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Plan TargetQty
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Actual FG
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Diff
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                NG
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Actual <br /> (Baht/Ton)
                              </Th>
                              <Th padding={2} fontSize={"1rem"}>
                                Target <br /> (Baht/Ton)
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Customer
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                Date
                              </Th>
                              <Th
                                maxWidth={"200px"}
                                padding={2}
                                fontSize={"1rem"}
                              >
                                process
                              </Th>
                              {/* <Th maxWidth={"200px"} padding={2} fontSize={'1rem'}>Status</Th> */}
                              {/* <Th isNumeric>multiply by</Th> */}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {/* {allJobLogger.map((info, i) => (
                              <Tr key={i} style={{ textAlignLast: "center" }}>
                                <Td>{i + 1}</Td>

                                <Td style={{ padding: "16px" }}>
                                  {info.MACHINE_NAME} ({info.MACHINE_TYPE}
                                  {info.TONS})
                                </Td>
                                <Td
                                  maxWidth={"230px"}
                                  style={{
                                    padding: "0 10px 0 10px",
                                    overflow: "overlay",
                                    textOverflow: "ellipsis",
                                  }}
                                >

                                  <p>{info.Employee}</p>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Order_ID}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.Mat_No}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MatDesc}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                <b>{info.TargetQty}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.BALANCE}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b>{info.PlanTargetDay}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b style={{color:'green'}}>{info.ActualFG}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                 <b style={{color:'orange'}}> {info.DIFF}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  <b style={{color:'red'}}>{info.NG}</b>
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {Math.round(info.TargetBathTons)}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {Math.round(info.ActualBathTons)}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {info.MRP_Name}
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {
                                    formatDatetime(info.DatetimeOpenOrder)
                                      .getDatetimeLocal2
                                  }{" "}
                                  -{" "}
                                  {
                                    formatDatetime(info.DTCloseJobs)
                                      .getDatetimeLocal2
                                  }
                                </Td>
                                <Td style={{ padding: "0 10px 0 10px" }}>
                                  {(info.ActualFG * 100) / info.PlanTargetDay <=
                                  49 ? (
                                    <Progress
                                      className="progress"
                                      colorScheme='red'
                                      hasStripe
                                      value={
                                        (info.ActualFG * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  ) : (info.ActualFG * 100) /
                                      info.PlanTargetDay <=
                                    69 ? (
                                    <Progress
                                      className="progress"
                                      colorScheme='yellow'
                                      hasStripe
                                      value={
                                        (info.ActualFG * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  ) : (
                                    <Progress
                                      className="progress"
                                      colorScheme='green'
                                      hasStripe
                                      value={
                                        (info.ActualFG * 100) /
                                        info.PlanTargetDay
                                      }
                                    />
                                  )}
                                </Td>
                              </Tr>
                            ))} */}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Wrap>
        </div>
      </motion.div>
    </div>
  );
}
