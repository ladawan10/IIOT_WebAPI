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
import { Badge } from '@chakra-ui/react'
import { formatDatetime } from "../libs/format-datetime";
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


export default function Overview_Table({Name,LID}) {
  const ip = "https://ipc.sncformer.com/iiot/api";
  const token = localStorage.getItem("token");
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const allorderlist = useSelector((state) => state.dataOrder);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม
  
  const dataPlaninglistMC = alldataPlanOrderlist.filter(({LineName})=> LineName == Name)
  const actualplan = useSelector((state) => state.dataPlanOrderView);
  const alldataPlan =  actualplan[0]?.PlanTargetQty + actualplan[1]?.PlanTargetQty;
//   console.log(dataPlaninglistMC);

  return (
    <div key={LID}>
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
          <Box
                w={[375, 500, "92vw"]}
                h="29vh"
                // bg="red.200"
                borderWidth="1px"
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                shadow="xl"
                boxShadow={"lg"}
                position="relative"
                maxHeight={"90vh"}
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
                    {Name}
                  </h2>
                </div>
                {/* <br /> */}
                <div className="overflow-auto" style={{maxHeight:'22vh',marginTop:'10px'}}>
                <TableContainer>
                <Table variant='striped'  >
                  <Thead>
                    <Tr
                      style={{ textAlignLast: "center" }}
                      className="fontnew"
                      bg={useColorModeValue("gray.300", "gray.900")}
                    >
                      <Th>No.</Th>
                      <Th maxWidth={'200px'}>Line</Th>
                      <Th >Order ID</Th>
                      <Th >Material</Th>
                      <Th maxWidth={'200px'}>Material Description</Th>
                      <Th >TargetQty</Th>
                      <Th >Plan TargetQty</Th>
                      <Th maxWidth={'200px'}>Customer</Th>
                      <Th maxWidth={'200px'}>Start Date</Th>
                      {/* <Th maxWidth={'200px'}>DATE On SAP</Th> */}
                      <Th maxWidth={'200px'}>process</Th>
                      <Th maxWidth={'200px'}>Status</Th>
                      {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataPlaninglistMC.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td style={{ padding:'15px' }}>{i + 1}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.LineName}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Order_ID}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Mat_No}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.MatDesc}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.TargetQty}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.PlanTargetQty}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.MRP_Name}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{formatDatetime(info.p_StartDate).getDatetimeLocal2}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Onprocess != 0 ? (<Progress className="progress" hasStripe value={64}   />):(<Progress className="progress" hasStripe value={0}   />)}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Onprocess != 0 ? (<Badge variant='solid' colorScheme='whatsapp'>
                        In Process
  </Badge>):(<Badge variant='solid' colorScheme='orange'>
  Waiting
  </Badge>)}</Td>
                        
                        
                      </Tr>
                    ))}
                  </Tbody>
                  {/* <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot> */}
                </Table>
              </TableContainer>
                </div>
              </Box>
          
        </div>
        
      </motion.div>
    </div>
  );
}
