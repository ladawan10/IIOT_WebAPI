import React, { useState } from "react";
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
// import { Tooltip } from "bootstrap";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
} from "recharts";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function Overview() {
  // const ip = 'http://localhost:4001/api-iot-cl'
  const ip = "https://iot-west.sncformer.com/api/api-iot-cl";
  const token = localStorage.getItem("token");

  const dataOrder_log = useSelector((state) => state.dataOrder_log);
  const dataCheckcount = useSelector((state) => state.datacheckcount);
  //console.log(dataCheckcount);
  // const dataoperationslip = useSelector((state) => state.dataoperationslip);
  // console.log(dataoperationslip);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม
  const dataAlljob = useSelector((state) => state.allVjobsMonitor);
  const dataAlljob_i = useSelector((state) => state.dataOrder_I);
  const order_inprocess = dataAlljob.filter(
    ({ StatusOrder }) => StatusOrder == "onprocess"
  );
  const [datamc, setDatamc] = useState({});

  //Chart
  const data = [
    {
      name: "{info.MachineName}",
      uv: "{info.Counter}",
      pv: "{info.Date}",
    },
  ];

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
            {dataCheckcount.map((info, i) => (
              <>
                <Box
                  w={[375, 500, "95vw"]}
                  h="40vh"
                  // bg="red.200"
                  borderWidth="1px"
                  bg={useColorModeValue("gray.200", "gray.800")}
                  rounded="lg"
                  shadow="xl"
                  boxShadow={"lg"}
                  position="relative"
                  maxHeight={"90vh"}
                  height={"90vh"}
                >
                  <br />
                  <Tabs variant="enclosed">
                    <TabList>
                      <Tab fontSize="20px" fontWeight="bold">
                        {info.MachineName}
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel fontSize={"22px"}>
                        {/* {dataoperationslip.map((info, i) => ( */}
                        <Box
                          as="button"
                          borderRadius="md"
                          borderWidth="2px"
                          // bg="white"
                          color="#00AB9F"
                          px={10}
                          h={150}
                          w={350}
                          bg={useColorModeValue("white", "gray.800")}
                        >
                          <h1 style={{ color: "#3893FC", fontWeight: "bold" }}>
                            TargetQty
                          </h1>
                          <p style={{ fontSize: "36px" }}>{info.TargetQty}</p>
                        </Box>
                        {/* ))} */}
                      </TabPanel>
                    </TabPanels>
                    <TabPanels>
                      {dataAlljob_i.map((info, i) => (
                        <TabPanel fontSize={"24px"}>
                          <Box
                            as="button"
                            borderRadius="md"
                            borderWidth="2px"
                            // bg="white"
                            color="#00AB9F"
                            px={10}
                            h={150}
                            w={350}
                            bg={useColorModeValue("white", "gray.800")}
                          >
                            <h1
                              style={{ color: "#3893FC", fontWeight: "bold" }}
                            >
                              PlanTargetQty
                            </h1>
                            <p style={{ fontSize: "36px" }}>{info.Counter}</p>
                          </Box>
                        </TabPanel>
                      ))}
                    </TabPanels>
                    <TabPanels>
                      <TabPanel fontSize={"24px"}>
                        <Box
                          as="button"
                          borderRadius="md"
                          borderWidth="2px"
                          // bg="white"
                          color="#00AB9F"
                          px={10}
                          h={150}
                          w={350}
                          bg={useColorModeValue("white", "gray.800")}
                        >
                          <h1 style={{ color: "#3893FC", fontWeight: "bold" }}>
                            Actual
                          </h1>
                          <p style={{ fontSize: "36px" }}>
                            {
                              dataAlljob_i.filter(
                                ({ MC_ID }) => MC_ID == info.MC_ID
                              )[0]?.Actual
                            }
                          </p>
                        </Box>
                      </TabPanel>
                    </TabPanels>
                    <TabPanels>
                      <TabPanel fontSize={"24px"}>
                        <Box
                          as="button"
                          borderRadius="md"
                          borderWidth="2px"
                          // bg="white"
                          color="#00AB9F"
                          px={10}
                          h={150}
                          w={350}
                          bg={useColorModeValue("white", "gray.800")}
                        >
                          <h1 style={{ color: "#3893FC", fontWeight: "bold" }}>
                            ScrapQty
                          </h1>
                          <p style={{ fontSize: "36px" }}>
                            {/* {
                              formatDatetime(order_inprocess[0]?.StartDatetime)
                                .getDatetimeLocal2
                            } */}
                          </p>
                        </Box>
                      </TabPanel>
                    </TabPanels>
                    <TabPanels>
                      <TabPanel>
                        <Box
                          width="50%"
                          height="100%"
                          bg={useColorModeValue("white", "gray.800")}
                          rounded="lg"
                          shadow="xl"
                          boxShadow={"lg"}
                          position="relative"
                          maxHeight={"90vh"}
                          //  height={"400px"}
                          top={"-725"}
                          left={"400"}
                          borderWidth="2px"
                        >
                          <p
                            style={{
                              color: "#00AB9F",
                              fontWeight: "bold",
                              fontSize: "24px",
                              textAlign: "center",
                            }}
                          >
                            Actual : Hour
                          </p>
                          <BarChart
                            width={850}
                            height={300}
                            data={info.Counter}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {/* <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" /> */}
                          </BarChart>
                        </Box>
                      </TabPanel>
                    </TabPanels>
                    <TabPanels>
                      <TabPanel>
                        <Box
                          width="50%"
                          // height="100%"
                          bg={useColorModeValue("white", "gray.800")}
                          rounded="lg"
                          shadow="xl"
                          boxShadow={"lg"}
                          position="relative"
                          maxHeight={"90vh"}
                          height={"340px"}
                          top={"-730"}
                          left={"400"}
                          borderWidth="2px"
                        >
                          <p
                            style={{
                              color: "#00AB9F",
                              fontWeight: "bold",
                              fontSize: "24px",
                              textAlign: "center",
                            }}
                          >
                            Actual : Day
                          </p>
                          <ResponsiveContainer width="100%" aspect={3 / 1}>
                            <LineChart data={data}>
                              <XAxis dataKey={info.Counter} stroke="#5550bd" />
                              <YAxis datakey="pv" stroke="#5550bd" />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#5550bd"
                                activeDot={{ r: 5 }}
                              />
                              <Tooltip />
                              <CartesianGrid
                                stroke="#e0dfdf"
                                strokeDasharray="3 3"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </TabPanel>
                    </TabPanels>
                    <TabPanels>
                      <TabPanel>
                        <Box
                          width="20%"
                          // height="50%"
                          bg={useColorModeValue("white", "gray.800")}
                          rounded="lg"
                          shadow="xl"
                          boxShadow={"lg"}
                          position="relative"
                          maxHeight={"90vh"}
                          height={600}
                          top={"-1460"}
                          right={"-1350"}
                          borderWidth="2px"
                        >
                          <p
                            style={{
                              color: "tomato",
                              fontWeight: "bold",
                              fontSize: "24px",
                              textAlign: "center",
                            }}
                          ></p>
                          <CircularProgress
                            value={info.Counter}
                            color="tomato"
                            size="300px"
                          >
                            <CircularProgressLabel>
                              {
                                dataAlljob_i.filter(
                                  ({ MC_ID }) => MC_ID == info.MC_ID
                                )[0]?.Actual
                              }
                            </CircularProgressLabel>
                          </CircularProgress>
                          <br></br>
                          <br></br>
                          {dataOrder_log.map((info, i) => (
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "24px",
                              textAlign: "center",
                              flexDirection: "column",
                              marginLeft: "50px",
                            }}
                          >
                            <p>Employee :{info.FullName}</p>
                            <br></br>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "24px",
                                textAlign: "center",
                              }}
                            >
                              Job Order : {info.Order_ID}
                            </p>
                          </div>
                          ))}
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </>
            ))}
          </Wrap>
        </div>
      </motion.div>
    </div>
  );
}
