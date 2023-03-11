import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
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
import Tableshow from "../component/tableAddordertoPlan/DataTable";



import Lottie from "react-lottie";
import Loading2 from '../../components/29894-error-404-page.json';
import Loading from '../../components/95728-loading-19.json';
import Loading3 from '../../components/99387-loading-page.json'; //?OK
import Loading4 from '../../components/97930-loading.json';
import Loading5 from '../../components/74185-boxes-unloading.json';

export default function Planning_c1() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loading3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/api-iot-cl/p/showorder")
      .then(res => res.json())
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
      )
  }, [])


  // console.log(isLoaded);


 // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';

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
  .filter(
    ({ MC_ProductionLine }) => MC_ProductionLine == "C1"
  )
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
      MC_ProductionLine:'C1',
      Order_ID: info.Order_ID,
      Mat_No: info.Mat_No,
      MatDesc: info.MatDesc,
      TargetQty: info.TargetQty,
      PlanTargetQty: info.TargetQty,
      Unit: info.Unit,
      ScrapQty: info.ScrapQty,
      Activity:info.Activity,
      OptShortText:info.OptShortText,
      Opt_task_list_no:info.Opt_task_list_no,
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
            variant:  'solid',
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
            variant:  'solid',
            isClosable: true,
          })
        : setDataEditOTP({ ...dataEditOTP, PlanTargetQty: value });
    };


  const eventCloseAdd = () => {
    setOpenAdd(false);
  };
  const clickhandler = name => {
    eventOpenAdd(name)
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
      .then(({ data: { state,msg } }) => {
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


  // const showEmployee = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get(`/Employee`, (req , res) => {
  //       method: "GET",
  //       headers: {
  //         ""
  //       }
  //     })
  // }


  const [OpenEditOrdertoplan, setOpenEditOrdertoplan] = useState(false);
  const [dataEditOTP , setDataEditOTP ] = useState({})
  const hendelOpeneditOTP = (info) => {
    setDataEditOTP(info)
    setOpenEditOrdertoplan(true)
    console.log(dataEditOTP);
  }
  const hendelCloseeditOTP = () => {
    setOpenEditOrdertoplan(false)
  }
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
      customClass : { 
        container : 'my-swal' 
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
  

  const [showOrdersap , setShowOrdersap] = useState(false)
  const handelshoworder = () => {
    setShowOrdersap(true)
  }
  const handelcloseShowordersap = () => {
    setShowOrdersap(false)
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
        {/* <div
          style={{
            // width: "100vw",
            // height: "100vh",
            display: "flex",
            margin: "0 15px 0 15px",
            justifyContent: "center",
          }}
        > */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} style={{fontSize:'var(--chakra-fontSizes-lg)',marginTop:'10px',marginLeft:'5px'}}>
          <GridItem colSpan={2} w={'100%'}>
            <Grid w={'100%'} templateColumns="repeat(2, 0fr)" gap={2} style={{fontSize:'var(--chakra-fontSizes-lg)'}}>
              <GridItem
                w={"25vw"}
                // h="40vh"
                // bg="red.200"
                // borderWidth="1px"
                // bg={useColorModeValue("white", "gray.800")}
                // rounded="lg"
                // shadow="xl"
                // boxShadow={"lg"}
                position="relative"
                maxHeight={"90vh"}
                // padding={'20px'}
                sx={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <Box w={'80%'} sx={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  padding:'17px'
                }}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                shadow="xl"
                boxShadow={"lg"}>
                <b style={{fontSize:'1.4rem'}}>ALUMINIUM PIPE</b>
                <b style={{fontSize:'1.4rem'}}>(LINE C1)</b>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} style={{fontSize:'1.7rem',marginTop:'10px'}}>
                  <GridItem>Online</GridItem>
                  <GridItem sx={{justifySelf:'center'}}>
                    <b style={{color:'green'}}>
                    {dataStatusMCLineC1
                    .filter(
                      ({ MC_ProductionLine,StatusMC }) => MC_ProductionLine == "C1" & StatusMC == 'RUN'
                    )
                    .length}</b>
                    </GridItem>
                  <GridItem>Stop</GridItem>
                  <GridItem sx={{justifySelf:'center'}}>
                  <b style={{color:'red'}}>
                    {dataStatusMCLineC1
                    .filter(
                      ({ MC_ProductionLine,StatusMC }) => MC_ProductionLine == "C1" & StatusMC == 'STOP'
                    )
                    .length}</b></GridItem>
                    <GridItem>Offline</GridItem>
                    <GridItem sx={{justifySelf:'center'}}>
                    <b  style={{color:'gray'}}>
                      {dataStatusMCLineC1
                      .filter(
                        ({ MC_ProductionLine,StatusMC }) => MC_ProductionLine == "C1" & StatusMC != 'STOP' & StatusMC != 'RUN'
                      )
                      .length}
                      </b></GridItem>
                  <GridItem>Machine All</GridItem>
                  <GridItem sx={{justifySelf:'center'}}><b>{dataStatusMCLineC1
                    .filter(
                      ({ MC_ProductionLine }) => MC_ProductionLine == "C1"
                    )
                    .length}</b></GridItem>
                </Grid>
                </Box>
              </GridItem>
              <GridItem
                w={"100%"}
                // h="40vh"
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
                    marginBottom:'10px'
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
                    Production plan
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
                    <Button
                    colorScheme="green"
                    variant="solid"
                    style={{ fontSize: "1.5rem" }}
                    onClick={handelshoworder} 
                  >
                    <FiFilePlus />
                  </Button>
                  </div>
                </div>
                {/* <br /> */}
                <div className="overflow-auto" style={{ maxHeight: "31vh" }}>
                  <TableContainer>
                    <Table variant="striped">
                      <Thead>
                        <Tr
                          style={{ textAlignLast: "center" }}
                          className="fontnew"
                          bg={useColorModeValue("gray.300", "gray.900")}
                        >
                          <Th style={{ padding: "0 10px" }}>No.</Th>
                          <Th style={{ padding: "0 10px" }}>Action</Th>
                          <Th style={{ padding: "0 10px" }}>Machine</Th>
                          <Th style={{ padding: "0 10px" }}>Order ID</Th>
                          <Th style={{ padding: "0 10px" }}>Material</Th>
                          <Th maxWidth={"200px"}>Material Description</Th>
                          <Th style={{ padding: "0 10px" }}>TargetQty</Th>
                          <Th style={{ padding: "0 10px" }}>Plan TargetQty</Th>
                          {/* <Th style={{ padding: "0 10px" }}>Activity</Th> */}
                          <Th style={{ padding: "0 10px" }} maxWidth={"200px"}>OperationShortText</Th>
                          <Th style={{ padding: "0 10px" }}>Start Date</Th>
                          <Th>process</Th>
                          {/* <Th maxWidth={"200px"}>DATE On SAP</Th> */}
                          {/* <Th isNumeric>multiply by</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {dataAlljob.map((info, i) => (
                          <Tr key={i} style={{ textAlignLast: "center" }}>
                            <Td style={{ padding: "0" }}>{i + 1}</Td>
                            <Td style={{ padding: "0" }}>
                              {/* {info.ID} */}
                              <HStack
                                spacing="2px"
                                style={{ justifyContent: "center" }}
                              >
                                {info.StatusOrder == 'onprocess' ? (
                                  <>
                                  <Button
                                  style={{ padding: "0" }}
                                  // leftIcon={<FiEdit />}
                                  colorScheme="blue"
                                  variant="ghost"
                                  onClick={() => eventOpenEdit(info)}
                                  // size='sm'
                                >
                                  <FiEdit />
                                </Button>
                                {/* <Button
                                  style={{ padding: "0" }}
                                  // leftIcon={<FiFilePlus />}
                                  colorScheme="orange"
                                  variant="ghost"
                                  onClick={() => DeleteJob(info.p_id)}
                                  // size='sm'
                                >
                                  <FiXSquare />
                                </Button> */}
                                  </>
                                ):(
                                  <>
                                  <Button
                                  style={{ padding: "0" }}
                                  // leftIcon={<FiEdit />}
                                  colorScheme="blue"
                                  variant="ghost"
                                  onClick={() => hendelOpeneditOTP(info)}
                                  // size='sm'
                                >
                                  <FiEdit />
                                </Button>
                                {/* <Button
                                  style={{ padding: "0" }}
                                  // leftIcon={<FiFilePlus />}
                                  colorScheme="orange"
                                  variant="ghost"
                                  onClick={() => DeleteJob(info.p_id)}
                                  // size='sm'
                                >
                                  <FiXSquare />
                                </Button> */}
                                  </>
                                )}
                                
                              </HStack>
                            </Td>
                            <Td style={{ padding: "0" }}>{info.MC_Name}</Td>
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
                              {info.TargetQty}
                            </Td>
                            <Td style={{ padding: "0 10px 0 10px" }}>
                              {info.PlanTargetQty}
                            </Td>
                            {/* <Td style={{ padding: "0 10px 0 10px" }}>
                              {info.Activity}
                            </Td> */}
                            <Td style={{ padding: "0 10px 0 10px" }}>
                              {info.OptShortText}
                            </Td>
                            <Td style={{ padding: "0 5px" }}>
                              {
                                formatDatetime(info.StartDatetime)
                                  .getDatetimeLocal2
                              }
                            </Td>
                            <Td style={{ padding: "0 5px" }}>
                              {info.StatusOrder === 'onprocess' ? (<Badge colorScheme='green'>IN PROCESS</Badge>):(<Badge colorScheme='orange'>WAITING</Badge>)}
                            </Td>
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
              </GridItem>
              
              </Grid>
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
                      <Machineboxhome key={i} namemc={info.MC_Name} mcid={info.MC_ID} datamc={info} />
                    ))):(
                      <Lottie options={defaultOptions} width={'500px'} />
                      )}
                </SimpleGrid>
              </div>
            </Box>
            </GridItem>
          </Grid>
          
        {/* </div> */}


        <Modal isOpen={showOrdersap} onClose={handelcloseShowordersap} >
          <ModalOverlay />
          <ModalContent  style={{width:'80vw',maxWidth:'80vw'}} >
            <ModalHeader rounded="lg" style={{ fontSize: "2rem",padding:'16px 24px 0 24px' }}  bg={useColorModeValue("white", "gray.800")}>
              ۰Assign order to plan۰
            </ModalHeader>
            <ModalCloseButton />
              {/* <div className="overflow-auto" style={{ height: "75vh" }}> */}
              <ModalBody bg={useColorModeValue("#white", "gray.800")}>
                {isLoaded == false ? (<Lottie options={defaultOptions} width={'500px'} />):(
                  <Tableshow data={items} click={clickhandler} />
                )}
              
              </ModalBody>
              {/* </div> */}

              <ModalFooter rounded="lg"  bg={useColorModeValue("white", "gray.800")}>
              </ModalFooter>
            
          </ModalContent>
        </Modal>



        <Modal isOpen={OpenAdd} onClose={eventCloseAdd} isCentered size={"xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader style={{ fontSize: "2rem" }}>
              ۰Assign to plan
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={starteventAdd}>
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
                    defaultValue={dataAdd.Order_ID}
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
                        defaultValue={dataAdd.Mat_No}
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
                          variant="filled"
                          // type={showPassword ? "text" : "password"}
                          defaultValue={dataAdd.MatDesc}
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
                        placeholder="Username..."
                        defaultValue={
                          formatDatetime(dataAdd.BS_StartDate).getDatetimeLocal3
                        }
                        onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            BS_StartDate: e.target.value,
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
                        Finist Date
                      </FormLabel>
                      <InputGroup>
                        <Input
                          style={{ opacity: "1", cursor: "default" }}
                          disabled
                          variant="filled"
                          defaultValue={
                            formatDatetime(dataAdd.BS_FinishDate)
                              .getDatetimeLocal3
                          }
                          onChange={(e) =>
                            setDataAdd({
                              ...dataAdd,
                              BS_FinishDate: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                </Stack>
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
                        Activity
                      </FormLabel>
                      <Input
                        style={{ opacity: "1", cursor: "default" }}
                        disabled
                        variant="filled"
                        placeholder="Username..."
                        defaultValue={dataAdd.Activity}
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
                          defaultValue={dataAdd.OptShortText}
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
                <FormControl>
                  <FormLabel style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                    TargetQty
                  </FormLabel>
                  <Input
                    style={{ opacity: "1", cursor: "default" }}
                    disabled
                    variant="filled"
                    placeholder="Name..."
                    defaultValue={dataAdd.TargetQty}
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
                        max={dataAdd.TargetQty}
                        defaultValue={dataAdd.PlanTargetQty}
                        onChange={handleChangenum}
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
                        placeholder="Machine Line..."
                        onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            MC_ID: e.target.value,
                          })
                        }
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
                <Button colorScheme="green" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>











        <Modal
          isOpen={OpenEditOrdertoplan}
          onClose={hendelCloseeditOTP}
          isCentered
          size={"xl"}
          // style={{zIndex:'1'}}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader style={{ fontSize: "2rem" }}>۰Edit plan order۰</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={hendeleditOTP}>
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
                    defaultValue={dataEditOTP.Order_ID}
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
                        defaultValue={dataEditOTP.Mat_No}
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
                          defaultValue={dataEditOTP.MatDesc}
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
                          formatDatetime(dataEditOTP.StartDatetime).getDatetimeLocal2
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
                          defaultValue={dataEditOTP.Activity}
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
                          defaultValue={dataEditOTP.OptShortText}
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
                    defaultValue={dataEditOTP.TargetQty  +dataEditOTP.Unit}
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
                        max={dataEditOTP.TargetQty}
                        defaultValue={dataEditOTP.PlanTargetQty}
                        onChange={handleChangenum2}
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
                        placeholder="Machine Line..."
                        defaultValue={dataEditOTP.MC_ID}
                        onChange={(e) =>
                          setDataEditOTP({
                            ...dataEditOTP,
                            MC_ID: e.target.value,
                          })
                        }
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
              <div style={{width:'100%',display:'flex',justifyContent: 'space-between'}}>
                <Button colorScheme="red" mr={3} onClick={()=>{
                  DeleteOTP(dataEditOTP.ID)
                  }}>
                  Delete
                </Button>
                <Button colorScheme="green" type="submit">
                  Save
                </Button>
                </div>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>









        <Modal
          isOpen={OpenEdit}
          onClose={eventCloseEdit}
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
                    defaultValue={dataEdit.Order_ID}
                    onChange={(e) =>
                      setDataAdd({
                        ...dataEdit,
                        Order_ID: e.target.value,
                      })
                    }
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
                        defaultValue={dataEdit.Mat_No}
                        onChange={(e) =>
                          setDataAdd({
                            ...dataEdit,
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
                          variant="filled"
                          // type={showPassword ? "text" : "password"}
                          defaultValue={dataEdit.MatDesc}
                          onChange={(e) =>
                            setDataAdd({
                              ...dataEdit,
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
                        placeholder="Username..."
                        defaultValue={
                          formatDatetime(dataEdit.StartDatetime).getDatetimeLocal2
                        }
                        onChange={(e) =>
                          setDataAdd({
                            ...dataEdit,
                            BS_StartDate: e.target.value,
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
                        Activity
                      </FormLabel>
                      <InputGroup>
                        <Input
                          style={{ opacity: "1", cursor: "default" }}
                          disabled
                          variant="filled"
                          defaultValue={dataEdit.Activity}
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
                          defaultValue={dataEdit.OptShortText}
                          onChange={(e) =>
                            setDataAdd({
                              ...dataEdit,
                              OptShortText: e.target.value,
                            })
                          }
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
                    defaultValue={dataEdit.TargetQty}
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
                        max={dataEdit.TargetQty}
                        defaultValue={dataEdit.PlanTargetQty}
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
                      style={{ opacity: "1", cursor: "default",backgroundColor:'#EDF2F7',borderColor:'#EDF2F7' }}
                      disabled
                        placeholder="Machine Line..."
                        defaultValue={dataEdit.MC_ID}
                        onChange={(e) =>
                          setDataAdd({
                            ...dataEdit,
                            MC_ID: e.target.value,
                          })
                        }
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
              <div style={{width:'100%',display:'flex',justifyContent: 'space-between'}}>
                <Button colorScheme="red" mr={3} onClick={()=>DeleteOTMC(dataEdit.ID)}>
                  Delete
                </Button>
                <Button colorScheme="green" type="submit">
                  Save
                </Button>
                </div>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </motion.div>
    </div>
  );
}
