import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Box, useColorModeValue, Badge, Progress } from "@chakra-ui/react";
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

import { useSelector } from "react-redux";
import { formatDatetime } from "../libs/format-datetime";

import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Display2() {

  const ip = "https://iot-west.sncformer.com/api/api-iot-cl";
  const token = localStorage.getItem("token");

  const dataCheckcount = useSelector((state) => state.datacheckcount);
  
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม
  const series1 = [50];

  const options1 = {
    chart: {
      height: 250,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            // color: colors.primary[100],
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            // color: colors.primary[100],
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["Shift 1"],
  };
  const series2 = [67];

  const options2 = {
    chart: {
      height: 250,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            // color: colors.primary[100],
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            // color: colors.primary[100],
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["Shift 2"],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    label: {
      fontColor: "#FFF",
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          //   color: colors.primary[100]
        },
      },
      y: {
        stacked: false,
        ticks: {
          //   color: colors.primary[100]
        },
      },
    },
  };

  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const la = ["{info.Counter}"];
  const la2 = [100, 70, 100, 50, 30, 100, 70, 100, 50, 30];

  const datas = {
    labels,
    datasets: [
      {
        label: "1",
        data: la,
        backgroundColor: "#2afe74ff",
        hoverBackgroundColor: "rgba(79, 78, 78,0.8)",
      },
      {
        label: "2",
        data: la2,
        backgroundColor: "#2aa9feff",
        hoverBackgroundColor: "rgba(79, 78, 78,0.8)",
      },
    ],
  };
  return (
    <>
    
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          // backgroundColor={colors.primary[101]}
          borderWidth="1px"
          bg={useColorModeValue("white", "gray.800")}
          rounded="lg"
          shadow="xl"
          boxShadow={"lg"}
          position="relative"
          borderRadius="10px"
          maxHeight={"40vh"}
          margin={"10px"}
          p="15px"
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              fontSize: "1rem",
            }}
          >
            <h4>Overall Productivity Across Shifts Today</h4>
            {/* <h3>  </h3> */}
            <h4>Press 300T line 1 and Press 300T line 2</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <ReactApexChart
                  options={options1}
                  series={series1}
                  type="radialBar"
                  height={250}
                  width={160}
                />
              </div>
              <div style={{ marginLeft: "15px" }}>
                <ReactApexChart
                  options={options2}
                  series={series2}
                  type="radialBar"
                  height={250}
                  width={160}
                />
              </div>
            </div>
          </div>
        </Box>
        <div style={{ width: "55%", marginLeft: "20px" }}>
          <Box
            // backgroundColor={colors.primary[101]}
            borderWidth="1px"
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
            shadow="xl"
            boxShadow={"lg"}
            position="relative"
            borderRadius="10px"
            // maxHeight={'33vh'}
            height={"40vh"}
            margin={"10px"}
            p="15px"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                width: "90%",
                fontSize: "1.3rem",
              }}
            >
              <h4>Production Planning (Last 10 Day)</h4>
              {/* <ReactApexChart options={optionchart2} series={serieschart2} type="line" height={350} /> */}
              <Bar options={options} data={datas} height={150} />
            </div>
          </Box>
        </div>
        <div style={{ width: "55%", marginLeft: "20px" }}>
          <Box
            // backgroundColor={colors.primary[101]}
            borderWidth="1px"
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
            shadow="xl"
            boxShadow={"lg"}
            position="relative"
            borderRadius="10px"
            // maxHeight={'33vh'}
            height={"40vh"}
            margin={"10px"}
            p="15px"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                width: "90%",
                fontSize: "1.3rem",
              }}
            >
              <h4>Production Planning (Hour)</h4>
              {/* <ReactApexChart options={optionchart2} series={serieschart2} type="line" height={350} /> */}
              <Bar options={options} data={datas} height={150} />
            </div>
          </Box>
        </div>
      </div>
      {dataCheckcount.map((info, i) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <Box
            boxShadow="lg"
            p="10"
            width={"40vh"}
            height={"20vh"}
            rounded="md"
            bg="white"
            position="relative"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          > 
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                width: "100%",
                fontSize: "20px",
              }}
            >
              <h4>Employee : {info.FullName} </h4>
              <h4>Job Order : {info.Order_ID} </h4>
            </div>
          </Box>
        </div>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <Box
            boxShadow="lg"
            p="10"
            width={"40vh"}
            height={"20vh"}
            rounded="md"
            bg="white"
            position="relative"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                width: "90%",
                fontSize: "28px",
              }}
            >
              <h4>TargetQty</h4>
              <h4>{info.TargetQty}</h4>
            </div>
            <div
              style={{
                color: "crimson"
              }}
              >
                <GpsFixedIcon sx={{ fontSize: 40 }}/>
                </div>
          </Box>
        </div>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <Box
            boxShadow="lg"
            p="10"
            width={"40vh"}
            height={"20vh"}
            rounded="md"
            bg="white"
            position="relative"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                width: "90%",
                fontSize: "28px",
              }}
            >
              <h4>PlanTargetQty</h4>
              <h4>{info.TargetQty}</h4>
            </div>
            <div
              style={{
                color: "crimson"
              }}
              >
                <TimelineIcon sx={{ fontSize: 40 }}/>
                </div>
          </Box>
        </div>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <Box
            boxShadow="lg"
            p="10"
            width={"40vh"}
            height={"20vh"}
            rounded="md"
            bg="white"
            position="relative"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                width: "90%",
                fontSize: "28px",
              }}
            >
              <h4>Actual</h4>
              <h4>{info.Counter}</h4>
            </div>
            <div
              style={{
                color: "crimson"
              }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 40 }}/>
                </div>
          </Box>
        </div>
        <div style={{ width: "100%", marginLeft: "20px" }}>
          <Box
            boxShadow="lg"
            p="10"
            width={"40vh"}
            height={"20vh"}
            rounded="md"
            bg="white"
            position="relative"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                width: "90%",
                fontSize: "28px",
              }}
            >
              <h4>ScarpQty</h4>
              <h4>{info.ScrapQty}</h4>
            </div>
            <div
              style={{
                color: "red"
              }}
              >
                <DeleteForeverIcon sx={{ fontSize: 40 }}/>
                </div>
          </Box>
        </div>
      </div>
      ))}
    </>
  );
}
