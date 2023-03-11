import React , {useState} from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { Wrap, WrapItem, Center ,useColorModeValue,Button,Divider} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { formatDatetime } from '../components/libs/format-datetime'
import { FiFilePlus,FiFilter,FiXSquare,FiEdit,FiSearch } from "react-icons/fi";
import { Stack, HStack, VStack,Input } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
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
} from '@chakra-ui/react'


import { updateDataOrderse } from "../bloc/dataorderse";


export default function Planning() {

   // const ip = 'http://localhost:4001/api-iot-cl'
   const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const toast = useToast()
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const allorderlist = useSelector((state) => state.dataOrder);
  const alldataPlanOrderlist = useSelector((state) => state.dataPlanOrder);  // ออเดอร์ที่ เพิ่ม
  const OrderIDList = allorderlist.map((info)=>(info.Order_ID))
  const OrderIDList2 = allorderlist.map((info)=>({
      Order_ID: String(info.Order_ID),
      Mat_No: info.Mat_No,
      MatDesc: info.MatDesc,
      TargetQty: info.TargetQty,
      PlanTargetQty: info.TargetQty,
      Unit: info.Unit,
      ScrapQty: info.ScrapQty,
      MRP_Controller: info.MRP_Controller,
      MRP_Name: info.MRP_Name,
      ProdSup: info.ProdSup,
      GrpRounting: info.GrpRounting,
      BS_StartDate: info.BS_StartDate,
      BS_FinishDate: info.BS_FinishDate,
  }))


  





  // console.log(OrderIDList2);
  const productionlinecheck = allproductionLinelist.map((info) => ({
    value: info.LineID,
    label: `[${info.LineName}]`,
  }));

 

  const alluserlist = useSelector((state) => state.datauser);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState({});
  const eventOpenAdd = (info) => {
    const readdatajob = allorderlist.filter(({ Order_ID }) => Order_ID == info);
    setDataAdd({
      Order_ID: readdatajob[0].Order_ID,
      Mat_No: readdatajob[0].Mat_No,
      MatDesc: readdatajob[0].MatDesc,
      TargetQty: readdatajob[0].TargetQty,
      PlanTargetQty: readdatajob[0].TargetQty,
      Unit: readdatajob[0].Unit,
      ScrapQty: readdatajob[0].ScrapQty,
      MRP_Controller: readdatajob[0].MRP_Controller,
      MRP_Name: readdatajob[0].MRP_Name,
      ProdSup: readdatajob[0].ProdSup,
      GrpRounting: readdatajob[0].GrpRounting,
      BS_StartDate: readdatajob[0].BS_StartDate,
      BS_FinishDate: readdatajob[0].BS_FinishDate,
      p_StartDate: formatDatetime(Date.now()).getDatetime,
    });
    setOpenAdd(true);
    // console.log(dataAdd);

  };
  const handleChangenum = (value)=> setDataAdd({...dataAdd,PlanTargetQty:value})
  const handleChangenum2 = (value)=> {value > dataEdit.TargetQty ? (
    toast({
      title: 'Plan > Target',
      status: 'error',
      isClosable: true,
    })
    
  ):(
    setDataEdit({...dataEdit,PlanTargetQty:value})
    )}
  const eventCloseAdd = () => {
    setOpenAdd(false);
  };
  const starteventAdd = (e) => {
    e.preventDefault();
    // console.log(dataAdd);
    axios
      .post(`${ip}/p/add-joborder`, dataAdd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state } }) => {
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Saved" : "Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        eventCloseAdd();
      });
  }



  const [OpenEdit, setOpenedit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const eventOpenEdit = (info) => {
    setOpenedit(true);
    setDataEdit(info);
    console.log(dataEdit);

  };
  const eventCloseEdit = () => {
    setOpenedit(false);
  };
  const starteventEdit = (e)=>{
    e.preventDefault();
    console.log(dataEdit);
    axios
      .post(`${ip}/p/edit-joborder`, dataEdit, {
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
  }

  // DELETE USER
  const DeleteJob = (id) => {
      
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
          .post(`${ip}/p/delete-joborder/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + token,
            },
          })
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

  let names = ['1720040071', '1720040070']
  const string = OrderIDList.toString()
  const ans_array = string.split(',')
  // console.log(ans_array);
  // console.log(names);
  const string2 = OrderIDList2.toString()
  const ans_array2 = string2.split(',')
  // console.log(ans_array2);
  const [datase,setDatase]=useState({orderID:'0'});
  const [dataorderse, setDataOrderse] = useState([]);
  const seorder = () => {
    
    console.log(datase);
    axios
    .post(`${ip}/p/seOrder`, datase)
    .then(({ data }) => {
      setDataOrderse(data);
    });
  }
  // console.log(datase.orderID)
  // const allorderlist2 = useSelector((state) => state.dataOrderse);
// console.log(allorderlist2);

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
          <Wrap spacing="30px" justify="center" sx={{padding:'16px',width:'100%'}}>
            
          <Box
                w={[375, 500, "92vw"]}
                h="40vh"
                // bg="red.200"
                borderWidth="1px"
                bg={useColorModeValue('white', 'gray.800')}
                rounded="lg"
                shadow="xl"
                boxShadow={'lg'}
                position="relative"
                maxHeight={"90vh"}
              >
                <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
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
                <div className="overflow-auto" style={{maxHeight:'31vh'}}>
                <TableContainer>
                <Table variant='striped' >
                <Thead>
                    <Tr
                      style={{ textAlignLast: "center" }}
                      className="fontnew"
                      bg={useColorModeValue("gray.300", "gray.900")}
                    >
                      <Th>No.</Th>
                      <Th>Action</Th>
                      <Th maxWidth={'200px'}>Line</Th>
                      <Th >Order ID</Th>
                      <Th >Material</Th>
                      <Th maxWidth={'200px'}>Material Description</Th>
                      <Th >TargetQty</Th>
                      <Th >Plan TargetQty</Th>
                      <Th maxWidth={'200px'}>Customer</Th>
                      <Th maxWidth={'200px'}>Start Date</Th>
                      <Th maxWidth={'200px'}>DATE On SAP</Th>
                      {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alldataPlanOrderlist.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td style={{ padding:'0' }}>{i + 1}</Td>
                        <Td style={{ padding:'0' }}>
                        <HStack spacing="2px" style={{ justifyContent: "center" }}>
                            <Button style={{padding:'0'}}
                              // leftIcon={<FiEdit />}
                              colorScheme="blue"
                              variant="ghost"
                              onClick={() => eventOpenEdit(info)}
                              // size='sm'
                            >
                              <FiEdit />
                            </Button>
                        <Button style={{padding:'0'}}
                              // leftIcon={<FiFilePlus />}
                              colorScheme="orange"
                              variant="ghost"
                              onClick={() => DeleteJob(info.p_id)}
                              // size='sm'
                            ><FiXSquare /></Button>
                          </HStack>
                        </Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.LineName}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Order_ID}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.Mat_No}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.MatDesc}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.TargetQty}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.PlanTargetQty}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{info.MRP_Name}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{formatDatetime(info.p_StartDate).getDatetimeLocal2}</Td>
                        <Td style={{ padding:'0 10px 0 10px' }}>{formatDatetime(info.BS_StartDate).getDatetimeLocal3} - {formatDatetime(info.BS_FinishDate).getDatetimeLocal3}</Td>

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
              <Box
                w={[375, 500, "92vw"]}
                h="45vh"
                // bg="red.200"
                borderWidth="1px"
                bg={useColorModeValue('white', 'gray.800')}
                rounded="lg"
                shadow="xl"
                boxShadow={'lg'}
                position="relative"
                maxHeight={"90vh"}
              >
                <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    padding: "16px 0 0  16px  ",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Assign production order 
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
                  <Stack spacing={4} direction={{ base: "column", md: "row" }} w={"full"}>
          <Input
            type={"text"}
            placeholder={"Order.."}
            color={useColorModeValue("gray.800", "gray.200")}
            bg={useColorModeValue("gray.100", "gray.600")}
            rounded={"full"}
            border={0}
            _focus={{
              bg: useColorModeValue("gray.200", "gray.800"),
              outline: "none"
            }}
            onChange={(e)=>{
              setDatase({
                ...datase,
                orderID: e.target.value,
              })
              // setDatase(e.target.value)
              console.log(datase.length)
              datase.orderID.length == 0 ? setDatase({orderID:'0'}):('')
            }}
          />
          <Button
            bg={"blue.400"}
            rounded={"full"}
            color={"white"}
            flex={"1 0 auto"}
            _hover={{ bg: "blue.500" }}
            _focus={{ bg: "blue.500" }}
            onClick={seorder
              

              // console.log(ans_array
              //   .filter(name => name.match(new RegExp(datase, "i")))
              //   );
              // console.log(OrderIDList2.filter(Order_ID=>Order_ID == datase.match(new RegExp(datase,'i'))) ); names
              
            }
          >
            {/* Subscribe */}
            <FiSearch/>
          </Button>
        </Stack>
                </div>
                </div>
                <br />
                <div className="overflow-auto" style={{maxHeight:'35vh'}}>
                <TableContainer>
                <Table variant='striped' >
                  <Thead>
                    <Tr
                      style={{ textAlignLast: "center" }}
                      className="fontnew"
                      bg={useColorModeValue("gray.300", "gray.900")}
                    >
                      <Th maxWidth={'20px'}>No.</Th>
                      <Th>Action</Th>
                      <Th minWidth={'200px'}>Order ID</Th>
                      <Th minWidth={'200px'}>Material</Th>
                      <Th minWidth={'200px'}>Material Description</Th>
                      <Th minWidth={'200px'}>TargetQty</Th>
                      <Th minWidth={'200px'}>Customer</Th>
                      <Th minWidth={'200px'}>DATE</Th>
                      {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                  </Thead>
                  {dataorderse.length !== 0  && datase.orderID !== '' ? (
                    
                      <Tbody>
                         {dataorderse.map((info, i) => (
                          <Tr key={i} style={{ textAlignLast: "center" }}>
                            <Td style={{ padding:'0' }}>{i + 1}</Td>
                            <Td style={{ padding:'0' }}>
                            <Button
                                  // leftIcon={<FiFilePlus />}
                                  colorScheme='green'
                                  variant="solid"
                                  onClick={()=>eventOpenAdd(info.Order_ID)} 
                                  // onClick={() => eventOpenEdit(info)}
                                  size='sm'
                                ><FiFilePlus /></Button>
                            </Td>
                            <Td style={{ padding:'15px' }}>{info.Order_ID}</Td>
                            <Td style={{ padding:'0' }}>{info.Mat_No}</Td>
                            <Td style={{ padding:'0' }}>{info.MatDesc}</Td>
                            <Td style={{ padding:'0' }}>{info.TargetQty}</Td>
                            <Td style={{ padding:'0' }}>{info.MRP_Name}</Td>
                            <Td style={{ padding:'0' }}>{formatDatetime(info.BS_StartDate).getDatetimeLocal3} - {formatDatetime(info.BS_FinishDate).getDatetimeLocal3}</Td>
    
                          </Tr>
                        ))}
                      </Tbody>
                     
                  ):(
                    <>
                    <Tbody>
                    {allorderlist.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td style={{ padding:'0' }}>{i + 1}</Td>
                        <Td style={{ padding:'0' }}>
                        <Button
                              // leftIcon={<FiFilePlus />}
                              colorScheme='green'
                              variant="solid"
                              onClick={()=>eventOpenAdd(info.Order_ID)} 
                              // onClick={() => eventOpenEdit(info)}
                              size='sm'
                            ><FiFilePlus /></Button>
                        </Td>
                        <Td style={{ padding:'15px' }}>{info.Order_ID}</Td>
                        <Td style={{ padding:'0' }}>{info.Mat_No}</Td>
                        <Td style={{ padding:'0' }}>{info.MatDesc}</Td>
                        <Td style={{ padding:'0' }}>{info.TargetQty}</Td>
                        <Td style={{ padding:'0' }}>{info.MRP_Name}</Td>
                        <Td style={{ padding:'0' }}>{formatDatetime(info.BS_StartDate).getDatetimeLocal3} - {formatDatetime(info.BS_FinishDate).getDatetimeLocal3}</Td>

                      </Tr>
                    ))}
                  </Tbody>
                    </>
                  )}
                  {/* <Tbody>
                    {allorderlist.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td style={{ padding:'0' }}>{i + 1}</Td>
                        <Td style={{ padding:'0' }}>
                        <Button
                              // leftIcon={<FiFilePlus />}
                              colorScheme='green'
                              variant="solid"
                              onClick={()=>eventOpenAdd(info.Order_ID)} 
                              // onClick={() => eventOpenEdit(info)}
                              size='sm'
                            ><FiFilePlus /></Button>
                        </Td>
                        <Td style={{ padding:'15px' }}>{info.Order_ID}</Td>
                        <Td style={{ padding:'0' }}>{info.Mat_No}</Td>
                        <Td style={{ padding:'0' }}>{info.MatDesc}</Td>
                        <Td style={{ padding:'0' }}>{info.TargetQty}</Td>
                        <Td style={{ padding:'0' }}>{info.MRP_Name}</Td>
                        <Td style={{ padding:'0' }}>{formatDatetime(info.BS_StartDate).getDatetimeLocal3} - {formatDatetime(info.BS_FinishDate).getDatetimeLocal3}</Td>

                      </Tr>
                    ))}
                  </Tbody> */}
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
          </Wrap>
        </div>
        <Modal isOpen={OpenAdd} onClose={eventCloseAdd} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{fontSize:'2rem'}}>۰Assign Order۰</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={starteventAdd}>
                <ModalBody>
                
                  <FormControl >
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold'}}>Order</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
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
                  <FormControl  style={{width:'150px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Material</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
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
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Description</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
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
                  <FormControl >
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Start Date</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Username..."
                      defaultValue={formatDatetime(dataAdd.BS_StartDate).getDatetimeLocal3}
                      onChange={(e) =>
                        setDataAdd({
                          ...dataAdd,
                          BS_StartDate: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Finist Date</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                        defaultValue={formatDatetime(dataAdd.BS_FinishDate).getDatetimeLocal3}
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
                  <FormControl  style={{width:'250px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>TargetQty</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Username..."
                      defaultValue={dataAdd.TargetQty}
                      onChange={(e) =>
                        setDataAdd({
                          ...dataAdd,
                          TargetQty: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Costomer</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                        defaultValue={dataAdd.MRP_Name}
                        onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            MRP_Name: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  </HStack>
                  </Stack>
                  <Stack spacing={4}>
                  <HStack>
                  <FormControl isRequired  style={{width:'250px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Plan Target</FormLabel>
                    <NumberInput  min={0} max={dataAdd.TargetQty}
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
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Machine Line</FormLabel>
                    <Select placeholder="Machine Line..." onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            LineID: e.target.value,
                          })
                        }>
                          {productionlinecheck.map((option,i) => (
                            
                              <option key={i} value={option.value}>{option.label}</option>
                            
                          ))}
                      
                      {/* <option value="user">user</option> */}
                    </Select>
                  </FormControl>
                  </HStack>
                  </Stack>
                  
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={eventCloseEdit}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">Save</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>




          
        <Modal isOpen={OpenEdit} onClose={eventCloseEdit} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{fontSize:'2rem'}}>۰Edit Order۰</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={starteventEdit}>
                <ModalBody>
                
                  <FormControl >
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold'}}>Order</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Name..."
                      defaultValue={dataEdit.Order_ID}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          Order_ID: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <Stack spacing={4}>
                  <HStack>
                  <FormControl  style={{width:'150px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Material</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Username..."
                      defaultValue={dataEdit.Mat_No}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          Mat_No: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Description</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                        // type={showPassword ? "text" : "password"}
                        defaultValue={dataEdit.MatDesc}
                        onChange={(e) =>
                          setDataEdit({
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
                  <FormControl >
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Start Date</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Username..."
                      defaultValue={formatDatetime(dataEdit.BS_StartDate).getDatetimeLocal3}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          BS_StartDate: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Finist Date</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                        defaultValue={formatDatetime(dataEdit.BS_FinishDate).getDatetimeLocal3}
                        onChange={(e) =>
                          setDataEdit({
                            ...dataEdit,
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
                  <FormControl  style={{width:'250px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>TargetQty</FormLabel>
                    <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                      placeholder="Username..."
                      defaultValue={dataEdit.TargetQty}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          TargetQty: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Costomer</FormLabel>
                    <InputGroup>
                      <Input
                    style={{opacity:'1',cursor:'default'}}
                    disabled
                    variant='filled'
                        defaultValue={dataEdit.MRP_Name}
                        onChange={(e) =>
                          setDataEdit({
                            ...dataEdit,
                            MRP_Name: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  </HStack>
                  </Stack>
                  <Stack spacing={4}>
                  <HStack>
                  <FormControl isRequired  style={{width:'250px'}}>
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Plan Target</FormLabel>
                    <NumberInput  min={0} max={dataEdit.TargetQty}
                    defaultValue={dataEdit.PlanTargetQty}
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
                    <FormLabel style={{fontSize:'1.3rem',fontWeight: 'bold',marginTop:'10px'}}>Machine Line</FormLabel>
                    <Select placeholder="Machine Line..." onChange={(e) =>
                          setDataEdit({
                            ...dataEdit,
                            p_lineMC: e.target.value,
                          })}
                          defaultValue={dataEdit.p_lineMC}
                          
                          >
                          {productionlinecheck.map((option,i) => (
                            
                              <option key={i} value={option.value}>{option.label}</option>
                            
                          ))}
                      
                      {/* <option value="user">user</option> */}
                    </Select>
                  </FormControl>
                  </HStack>
                  </Stack>
                  
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={eventCloseEdit}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">Save</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
      </motion.div>
    </div>
  );
}
