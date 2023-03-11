import React from "react";
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
} from "@chakra-ui/react";
import { Progress } from '@chakra-ui/react'
import { FiFilePlus, FiFilter, FiXSquare, FiEdit } from "react-icons/fi";
import { Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";
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

import Chart_Boxes from "../chart/box_chart1";

export default function All_oee() {
    const data = [
        { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
        { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
        { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
        { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
      ];
  return (
    <>
    <h2 style={{marginLeft:'15px',fontSize:'1.8rem'}}>Overall Equipment Effectiveness (OEE) Metrics</h2>
    <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            margin: "15px",
          }}
        >
          <div style={{position: "relative",}}>
        <a style={{marginLeft:"10px",fontSize:'1.2rem'}}> OEE</a>
                    
          <Box
            
            borderWidth="1px"
                bg={useColorModeValue("white", "gray.800")}
                rounded="xl"
                // shadow="xl"
                // boxShadow={"lg"}
                position="relative"
                maxHeight={"15vh"}
            height={120}
            sx={{ marginRight: "10px" }}
          >
            
            <div
              style={{
                display: "flex",
                // marginRight: "20px",
                alignItems: "top",
                position: "relative",
                minWidth: "160px",
                height: "100%",
              }}
            >
              <Chart_Boxes data={data} keyar={"amt"} nums={90} />
            </div>
          </Box>
          </div>
          
          <div style={{position: "relative",}}>
        <a style={{marginLeft:"10px",fontSize:'1.2rem'}}> Availability</a>
          <Box
            
            borderWidth="1px"
                bg={useColorModeValue("white", "gray.800")}
                rounded="xl"
                // shadow="xl"
                // boxShadow={"lg"}
                position="relative"
                maxHeight={"15vh"}
            height={120}
            sx={{ marginRight: "10px" }}
          >
            <div
              style={{
                display: "flex",
                // marginRight: "20px",
                alignItems: "top",
                position: "relative",
                width:"160px",
                height: "100%",
              }}
            >
              <Chart_Boxes data={data} keyar={"pv"} nums={90} />
            </div>
          </Box>
          </div>
          
          <div style={{position: "relative",}}>
        <a style={{marginLeft:"10px",fontSize:'1.2rem'}}> Performance</a>
          <Box
            
            borderWidth="1px"
                bg={useColorModeValue("white", "gray.800")}
                rounded="xl"
                // shadow="xl"
                // boxShadow={"lg"}
                position="relative"
                maxHeight={"15vh"}
            height={120}
            sx={{ marginRight: "10px" }}
          >
            <div
              style={{
                display: "flex",
                // marginRight: "20px",
                alignItems: "top",
                position: "relative",
                width:"160px",
                height: "100%",
              }}
            >
              <Chart_Boxes data={data} keyar={"pv"} nums={90} />
            </div>
          </Box>
          </div>
          
          <div style={{position: "relative",}}>
        <a style={{marginLeft:"10px",fontSize:'1.2rem'}}> Quality</a>
          <Box
            borderWidth="1px"
            bg={useColorModeValue("white", "gray.800")}
            rounded="xl"
            // shadow="xl"
            // boxShadow={"lg"}
            position="relative"
            maxHeight={"15vh"}
        height={120}
        // sx={{ marginRight: "10px" }}
          >
            <div
              style={{
                display: "flex",
                // marginRight: "20px",
                alignItems: "top",
                position: "relative",
                width:"160px",
                height: "100%",
              }}
            >
              <Chart_Boxes data={data} keyar={"pv"} nums={100} />
            </div>
          </Box>
        </div>
        </div>
    </>
  )
}
