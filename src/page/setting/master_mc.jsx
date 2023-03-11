import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useColorModeValue,
  useDisclosure,
  Center,
  Input,
  InputRightElement,
  InputGroup,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Divider,
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
} from "@chakra-ui/react";

import { FiEdit, FiXSquare, FiFileText, FiPlusCircle } from "react-icons/fi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";




export default function Master_mc() {
 // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const alldataMachine = useSelector((state) => state.dataMachine);
  // console.log(alldataMachine);

  const [OpenAdd, setOpenAdd] = useState(false);
  const [dataAdd, setDataAdd] = useState({});
  const eventOpenAdd = () => {
    setOpenAdd(true);
    // setDatauserAdd(info);
  };
  const eventCloseAdd = () => {
    setOpenAdd(false);
  };
  const starteventAdd = (e) => {
    e.preventDefault();
    // console.log(dataAdd);
    axios
    .post(`${ip}/admin/add-msmc`, dataAdd, {
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
  };
  const eventCloseEdit = () => {
    setOpenedit(false);
  };
  const handleeditline = (e)=>{
    e.preventDefault();
    console.log(dataEdit);
    axios
      .post(`${ip}/admin/update-msmc`, dataEdit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state } }) => {
        eventCloseEdit();
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Edit Success" : "Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  // DELETE line
  const DeleteLine = (id) => {
      
    // console.log(ID);
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
          .post(`${ip}/admin/delete-msmc/${id}`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + token,
            },
          })
          .then(({ data: { state , msg}  }) => {
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

  return (
    <div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container centerContent maxW="90vw">
            <Box
              // p="4"
              bg={useColorModeValue("white", "gray.800")}
              borderWidth="1px"
              m={5}
              w="full"
              rounded="lg"
              shadow="xl"
              position="relative"
              maxHeight={'90vh'}
              // className="overflow-auto"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "2rem",
                    padding: "16px 0 0  16px  ",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Master Machine <FiFileText style={{ marginLeft: "10px" }}/>
                </h3>
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
                    onClick={eventOpenAdd} 
                  >
                    <FiPlusCircle />
                  </Button>
                </div>
              </div>
              <br />
              <Box className="overflow-auto" height={'80vh'}>
              <TableContainer>
                <Table variant='striped' >
                  <Thead>
                    <Tr
                      style={{ textAlignLast: "center" }}
                      className="fontnew"
                      bg={useColorModeValue("gray.300", "gray.900")}
                    >
                      <Th>No.</Th>
                      <Th minWidth={'200px'}>Machine ID</Th>
                      <Th minWidth={'200px'}>Name</Th>
                      <Th minWidth={'200px'}>Line</Th>
                      <Th minWidth={'200px'}>ProductionLine</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alldataMachine.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td>{i + 1}</Td>
                        <Td>{info.MC_ID}</Td>
                        <Td>{info.MC_Name}</Td>
                        <Td>{info.MC_Line}</Td>
                        <Td>{info.MC_ProductionLine}</Td>
                        <Td align="center">
                          <HStack spacing="2px" style={{ justifyContent: "center" }}>
                            <Button
                              leftIcon={<FiEdit />}
                              colorScheme="blue"
                              variant="solid"
                              onClick={() => eventOpenEdit(info)}
                              size='sm'
                            >
                              Edit
                            </Button>
                            <Center height="30px">
                              <Divider
                                orientation="vertical"
                                sx={{ margin: "0px 5px 0px 5px" }}
                              />
                            </Center>
                            <Button
                            size='sm'
                              leftIcon={<FiXSquare />}
                              colorScheme="red"
                              variant="solid"
                              onClick={()=> DeleteLine(info.ID)}
                            >
                              Delete
                            </Button>
                          </HStack>
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
              </Box>
            </Box>
          </Container>

          <Modal isOpen={OpenEdit} onClose={eventCloseEdit} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit master machine</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleeditline}>
                <ModalBody>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                    <FormLabel>Machine ID</FormLabel>
                    <Input
                      placeholder="Line name"
                      defaultValue={dataEdit.MC_ID}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          MC_ID: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                    <FormLabel>Name Machine</FormLabel>
                    <Input
                      placeholder="Line name"
                      defaultValue={dataEdit.MC_Name}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          MC_Name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                  <FormLabel>Line</FormLabel>
                    <Select placeholder="Select Production line" defaultValue={dataEdit.MC_Line} onChange={(e) =>
                          setDataEdit({
                            ...dataEdit,
                            MC_Line: e.target.value,
                          })
                        }>
                          
                            <option value="Bending">Bending</option>
                            <option value="Forming">Forming</option>
                            <option value="CNC">CNC</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                  <FormLabel>Production line</FormLabel>
                    <Select placeholder="Select Production line" defaultValue={dataEdit.MC_ProductionLine} onChange={(e) =>
                          setDatauserAdd({
                            ...datauserAdd,
                            MC_ProductionLine: e.target.value,
                          })
                        }>
                          {allproductionLinelist.map((info,i)=>(
                            <option key={i} value={info.L_Productionline}>Line - {info.L_Productionline}</option>
                          ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl isRequired>
                    <FormLabel>Machine name</FormLabel>
                    <Input
                      placeholder="Description"
                      defaultValue={dataEdit.L_FullName}
                      onChange={(e) =>
                        setDataEdit({
                          ...dataEdit,
                          L_FullName: e.target.value,
                        })
                      }
                    />
                  </FormControl> */}
                  
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

          <Modal isOpen={OpenAdd} onClose={eventCloseAdd} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add master machine</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={starteventAdd}>
                <ModalBody>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                    <FormLabel>Machine ID</FormLabel>
                    <Input
                      placeholder="Machine ID..."
                      onChange={(e) =>
                        setDataAdd({
                          ...dataAdd,
                          MC_ID: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                    <FormLabel>Name Machine</FormLabel>
                    <Input
                      placeholder="Line name"
                      onChange={(e) =>
                        setDataAdd({
                          ...dataAdd,
                          MC_Name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                  <FormLabel>Line</FormLabel>
                    <Select placeholder="Select Production line" onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            MC_Line: e.target.value,
                          })
                        }>
                          
                            <option value="Bending">Bending</option>
                            <option value="Forming">Forming</option>
                            <option value="CNC">CNC</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired style={{margin:'0 0 10px 0'}}>
                  <FormLabel>Production line</FormLabel>
                    <Select placeholder="Select Production line" onChange={(e) =>
                          setDataAdd({
                            ...dataAdd,
                            MC_ProductionLine: e.target.value,
                          })
                        }>
                          {allproductionLinelist.map((info,i)=>(
                            <option key={i} value={info.L_Productionline}>Line - {info.L_Productionline}</option>
                          ))}
                    </Select>
                  </FormControl>
                  
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={eventCloseAdd}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">Save</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>








        </div>
      </motion.div>
      {/* </AnimatePresence> */}
    </div>
  );
}
