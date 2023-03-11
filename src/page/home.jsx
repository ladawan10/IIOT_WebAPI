import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Box, SimpleGrid  } from "@chakra-ui/react";
import {
  Wrap,
  WrapItem,
  Center,
  useColorModeValue,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { formatDatetime } from "../components/libs/format-datetime";
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
import ProgressBar from 'react-bootstrap/ProgressBar';

import Chart_Boxes from "../components/chart/box_chart1";
import All_oee from "../components/dashboard/all_oee";
import Machine_status from "../components/dashboard/machine_status";

import Machineboxhome from "./component/machineboxhome";
import Display2 from "../components/dashboard/display2";

import Lottie from "react-lottie";
import Loading from '../components/97930-loading.json'

export default function Home() {
   // const ip = 'http://localhost:4001/api-iot-cl'
   const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const allorderlist = useSelector((state) => state.dataOrder);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder); // ออเดอร์ที่ เพิ่ม

  const actualplan = useSelector((state) => state.dataPlanOrderView);

  const allVjobsAssign = useSelector((state) => state.allVjobsAssign);
  const allVjobsMonitor = useSelector((state) => state.allVjobsMonitor);
  const allDashboardSumNg = useSelector((state) => state.allDashboardSumNg);
  const allEmployeeAss = useSelector((state) => state.allEmployeeAss);
  console.log(allVjobsAssign);
  const mcLineA = allVjobsAssign.filter(({LINE})=>LINE == 'a')
  const mcAOn = mcLineA.filter(({STATUS})=>STATUS == 'RUN')
  const mcAStop = mcLineA.filter(({STATUS})=>STATUS == 'STOP')
  const mcAAlarm = mcLineA.filter(({STATUS})=>STATUS == 'ALARM')
  const mcAOff = mcLineA.filter(({STATUS})=>STATUS == 'OFFLINE')
  
  const mcLineB = allVjobsAssign.filter(({LINE})=>LINE == 'b')
  const mcBOn = mcLineB.filter(({STATUS})=>STATUS == 'RUN')
  const mcBStop = mcLineB.filter(({STATUS})=>STATUS == 'STOP')
  const mcBAlarm = mcLineB.filter(({STATUS})=>STATUS == 'ALARM')
  const mcBOff = mcLineB.filter(({STATUS})=>STATUS == 'OFFLINE')

  const mcLineC = allVjobsAssign.filter(({LINE})=>LINE == 'c')
  const mcCOn = mcLineC.filter(({STATUS})=>STATUS == 'RUN')
  const mcCStop = mcLineC.filter(({STATUS})=>STATUS == 'STOP')
  const mcCAlarm = mcLineC.filter(({STATUS})=>STATUS == 'ALARM')
  const mcCOff = mcLineC.filter(({STATUS})=>STATUS == 'OFFLINE')
  // console.log(mcLineA.filter(({STATUS})=>STATUS == 'RUN'));
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
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
            // width: "98%",
            // height: "90vh",
            // display: "flex",
            margin: "15px  15px 0 15px",
            // justifyContent: "center",
          }}
        >
          <SimpleGrid minChildWidth="100px" spacing="40px">
            <Box
              // height="100px"
              borderWidth="1px"
              bg={useColorModeValue("white", "gray.800")}
              rounded="lg"
              shadow="xl"
              boxShadow={"lg"}
              sx={{fontSize:'1.4rem' , padding:'10px'}}
            >
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <font style={{fontSize:'1.5rem'}}><b> Line : A</b> ({mcLineA.length})</font>
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                  Online
                </div>
                <div style={{paddingRight:'10px'}}>
                 <b style={{color:'green'}}> {mcAOn.length != 0 ? (mcAOn.length):('-')}</b>
                </div>
                
              </div>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Stop
                </div>
                <div>
                 {mcAStop.length != 0 ? ( <b className="blink-notify-mess" style={{color:'red'}}>{mcAStop.length}</b>):(<b style={{color:'red'}}>-</b>)}
                </div>
                
              </div>
              
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                Alarm
                </div>
                <div style={{paddingRight:'10px'}}>
                 {mcAAlarm.length != 0 ? ( <b className="blink-notify-mess" style={{color:'#ff8800'}}>{mcAAlarm.length}</b>):(<b style={{color:'#ff8800'}}>-</b>)}
                </div>
                
              </div>

              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Shutdown
                </div>
                <div>
                 {mcAOff.length != 0 ? ( <b className="blink-notify-mess2" style={{color:'#797979'}}>{mcAOff.length}</b>):(<b style={{color:'#797979'}}>-</b>)}

                </div>
                
              </div>
              </div>
            </Box>
            <Box
              // height="100px"
              borderWidth="1px"
              bg={useColorModeValue("white", "gray.800")}
              rounded="lg"
              shadow="xl"
              boxShadow={"lg"}
              sx={{fontSize:'1.4rem' , padding:'10px'}}
            >
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <font style={{fontSize:'1.5rem'}}><b> Line : B</b> ({mcLineB.length})</font>
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                  Online
                </div>
                <div style={{paddingRight:'10px'}}>
                 <b style={{color:'green'}}> {mcBOn.length != 0 ? (mcBOn.length):('-')}</b>
                </div>
                
              </div>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Stop
                </div>
                <div>
                 {mcBStop.length != 0 ? ( <b className="blink-notify-mess" style={{color:'red'}}>{mcBStop.length}</b>):(<b style={{color:'red'}}>-</b>)}
                </div>
                
              </div>
              
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                Alarm
                </div>
                <div style={{paddingRight:'10px'}}>
                 {mcBAlarm.length != 0 ? ( <b className="blink-notify-mess" style={{color:'#ff8800'}}>{mcBAlarm.length}</b>):(<b style={{color:'#ff8800'}}>-</b>)}
                </div>
                
              </div>

              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Shutdown
                </div>
                <div>
                 {mcBOff.length != 0 ? ( <b className="blink-notify-mess2" style={{color:'#797979'}}>{mcBOff.length}</b>):(<b style={{color:'#797979'}}>-</b>)}

                </div>
                
              </div>
              </div>
            </Box>
            <Box
              // height="100px"
              borderWidth="1px"
              bg={useColorModeValue("white", "gray.800")}
              rounded="lg"
              shadow="xl"
              boxShadow={"lg"}
              sx={{fontSize:'1.4rem' , padding:'10px'}}
            >
              <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
              <font style={{fontSize:'1.5rem'}}><b> Line : C</b> ({mcLineC.length})</font>
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                  Online
                </div>
                <div style={{paddingRight:'10px'}}>
                 <b style={{color:'green'}}> {mcCOn.length != 0 ? (mcCOn.length):('-')}</b>
                </div>
                
              </div>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Stop
                </div>
                <div>
                 {mcCStop.length != 0 ? ( <b className="blink-notify-mess" style={{color:'red'}}>{mcCStop.length}</b>):(<b style={{color:'red'}}>-</b>)}
                </div>
                
              </div>
              
              </div>
              <div style={{display:'flex'}}>
              <div style={{width:'90%',display:'flex',justifyContent:'space-between',borderRightStyle:'solid',borderWidth:'0 2px 0 0 '}}>
                <div>
                Alarm
                </div>
                <div style={{paddingRight:'10px'}}>
                 {mcCAlarm.length != 0 ? ( <b className="blink-notify-mess" style={{color:'#ff8800'}}>{mcCAlarm.length}</b>):(<b style={{color:'#ff8800'}}>-</b>)}
                </div>
                
              </div>

              <div style={{width:'90%',display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingLeft:'10px'}}>
                Shutdown
                </div>
                <div>
                 {mcCOff.length != 0 ? ( <b className="blink-notify-mess2" style={{color:'#797979'}}>{mcCOff.length}</b>):(<b style={{color:'#797979'}}>-</b>)}

                </div>
                
              </div>
              </div>
            </Box>
            
          </SimpleGrid>
        </div>
        <div
          className="overflow-auto"
          style={{
            // width: "98%",
            height: "77vh",
            // display: "flex",
            maxWidth: "98%",
            margin: "15px  15px 0 15px",
            justifyContent: "center",
          }}
        >
          <SimpleGrid minChildWidth="250px" spacing="3px">
            {allVjobsAssign.length != 0 ? (
              <>
            {allVjobsAssign.map((info, i) => (
              <div key={i}>
                <Machineboxhome namemc={info.MACHINE_NAME} workcenters={info} 
                allmDashboardSumNg={allDashboardSumNg.filter(
                    ({ MACHINE_NAME }) => MACHINE_NAME == `${info.MACHINE_NAME}`
                  )}
                  // allmVjobsAssignMonitor={allVjobsAssignMonitor.filter(
                  //   ({ MACHINE_NAME }) => MACHINE_NAME == `${info.MACHINE_NAME}`
                  // )}
                  allmVjobsAssign={allVjobsAssign.filter(
                    ({ MACHINE_NAME }) => MACHINE_NAME == `${info.MACHINE_NAME}`
                  )}
                  allmVjobsMonitor={allVjobsMonitor.filter(
                    ({ MACHINE_NAME }) => MACHINE_NAME == `${info.MACHINE_NAME}`
                  )}
                  allmEmployeeAss={allEmployeeAss.filter(
                    ({ MACHINE_NAME }) => MACHINE_NAME == `${info.MACHINE_NAME}`
                  )}/>
              </div>
            ))}
            </>
            ):(<div style={{display:'flex'}}><Lottie options={defaultOptions} width={'200px'} /></div>)}
          </SimpleGrid>
        </div>
      </motion.div>
    </div>
  );
}
