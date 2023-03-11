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

import { FiEdit, FiXSquare, FiUsers, FiUserPlus } from "react-icons/fi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";




export default function Employee() {
 // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");

  
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const alluserlist = useSelector((state) => state.datauser);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [datauserAdd, setDatauserAdd] = useState({});
  const eventOpenAdd = () => {
    setOpenAdd(true);
    // setDatauserAdd(info);
  };
  const eventCloseAdd = () => {
    setOpenAdd(false);
  };
  const starteventAdduser = (e) => {
    e.preventDefault();
    console.log(datauserAdd);
    axios
      .post(`${ip}/admin/add-user`, datauserAdd, {
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
  const [datauserEdit, setDatauserEdit] = useState({});
  const eventOpenEdit = (info) => {
    setOpenedit(true);
    setDatauserEdit(info);
  };
  const eventCloseEdit = () => {
    setOpenedit(false);
  };
  const handleedituser = (e)=>{
    e.preventDefault();
    // console.log(datauserEdit);
    axios
      .post(`${ip}/admin/update-datauser`, datauserEdit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data: { state,msg } }) => {
        eventCloseEdit();
        Swal.fire({
          icon: state ? "success" : "error",
          title: state ? "Edit Success" : "Failed",
          text:msg,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  // DELETE USER
  const DeleteUser = (id) => {
      
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
          .post(`${ip}/admin/deletedatauser/${id}`)
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

  const [showPassword, setShowPassword] = useState(false);
  //   console.log(alluserlist);
  return (
    <div>
      {/* <AnimatePresence > */}
      <motion.div
        // key={selectedTab ? selectedTab.label : "empty"}
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
          <Container centerContent maxW='90vw'>
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
                  Employee <FiUsers style={{ marginLeft: "10px" }}/>
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
                    <FiUserPlus />
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
                      <Th minWidth={'200px'}>Name</Th>
                      <Th minWidth={'200px'}>Production line</Th>
                      <Th minWidth={'200px'}>Authentication</Th>
                      <Th minWidth={'200px'}>Username</Th>
                      <Th>Action</Th>
                      {/* <Th isNumeric>multiply by</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alluserlist.map((info, i) => (
                      <Tr key={i} style={{ textAlignLast: "center" }}>
                        <Td>{i + 1}</Td>
                        <Td>{info.U_Name}</Td>
                        <Td>{info.U_Line}</Td>
                        <Td>{info.U_Username}</Td>
                        <Td>{info.U_Auth}</Td>
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
                              onClick={()=> DeleteUser(info.id)}
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
              <ModalHeader>Edit User</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleedituser}>
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name..."
                      defaultValue={datauserEdit.U_Name}
                      onChange={(e) =>
                        setDatauserEdit({
                          ...datauserEdit,
                          U_Name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Production line</FormLabel>
                    <Select placeholder="Select Production line"  defaultValue={datauserEdit.U_Line}  onChange={(e) =>
                          setDatauserEdit({
                            ...datauserEdit,
                            U_Line: e.target.value,
                          })
                        }>
                          {allproductionLinelist.map((info,i)=>(
                            <option key={i} value={info.L_Productionline}>Line - {info.L_Productionline}</option>
                          ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Username..."
                      defaultValue={datauserEdit.U_Username}
                      onChange={(e) =>
                        setDatauserEdit({
                          ...datauserEdit,
                          U_Username: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        defaultValue={datauserEdit.U_Password}
                        onChange={(e) =>
                          setDatauserEdit({
                            ...datauserEdit,
                            U_Password: e.target.value,
                          })
                        }
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Authentication</FormLabel>
                    <Select placeholder="Select Authentication" defaultValue={datauserEdit.U_Auth} onChange={(e) =>
                          setDatauserEdit({
                            ...datauserEdit,
                            U_Auth: e.target.value,
                          })
                        }>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </Select>
                  </FormControl>
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
              <ModalHeader>Add user</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={starteventAdduser}>
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name..."
                      // defaultValue={datauserAdd.Name}
                      onChange={(e) =>
                        setDatauserAdd({
                          ...datauserAdd,
                          U_Name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Production line</FormLabel>
                    <Select placeholder="Select Production line" onChange={(e) =>
                          setDatauserAdd({
                            ...datauserAdd,
                            U_Line: e.target.value,
                          })
                        }>
                          {allproductionLinelist.map((info,i)=>(
                            <option key={i} value={info.L_Productionline}>Line - {info.L_Productionline}</option>
                          ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Username..."
                      // defaultValue={datauserAdd.Username}
                      onChange={(e) =>
                        setDatauserAdd({
                          ...datauserAdd,
                          U_Username: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        // defaultValue={datauserAdd.Password}
                        onChange={(e) =>
                          setDatauserAdd({
                            ...datauserAdd,
                            U_Password: e.target.value,
                          })
                        }
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Authentication</FormLabel>
                    <Select placeholder="Select Authentication" onChange={(e) =>
                          setDatauserAdd({
                            ...datauserAdd,
                            U_Auth: e.target.value,
                          })
                        }>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
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
