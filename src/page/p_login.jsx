import { Center, Heading } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Flex,
  Stack,
  useColorModeValue,
  HStack
} from "@chakra-ui/react"
import { PinInput, PinInputField } from "@chakra-ui/react"
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
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
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement ,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function Login2() {
   // const ip = 'http://localhost:4001/api-iot-cl'
   const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
    const [idlog , setIdlog] = useState('')
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [useropen , setUseropen] = useState(false);
    const openMuser = () => setUseropen(true)
    const closeMuser = () => setUseropen(false)

    const [planningopen , setPlanningopen] = useState(false);
    const openMplanning = () => setPlanningopen(true)
    const closeMplanning = () => setPlanningopen(false)


    const [formLogin, setFormLogin] = useState({ Username: "", Password: "" });
    function handleChange(event) {
      const { name, value } = event.target;
      setFormLogin({ ...formLogin, [name]: value });
    }

    useEffect(() => {
  
      fetch(`${ip}/auth/check-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.state === true) {
          localStorage.setItem("Name", data.sys.Name);
          
          if (data.sys.Auth == "user") {
            navigate("/Monitor");
          } else if (data.sys.Auth == "admin") {
            navigate("/Monitor");
          } else {
            navigate("/working");
          }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("Name");
            navigate("../");
          }
        });
    }, []);


    async function handleLogin(event) {
        event.preventDefault();
    
        await axios.post(`${ip}/auth/login`, idlog).then(({ data }) => {
        //   setShowmodeladd(false);
          localStorage.setItem("token", data.token);
          Swal.fire({
            icon: data.state ? "success" : "error",
            title: data.state ? "Login Success" : "Login Failed",
            text: data.msg,
            showConfirmButton: false,
            timer: 1500,
            backdrop: `#000000b4`,
          })
            .then(() => {
            navigate("/working");
            })
            .then(() => window.location.reload(true));
        });
      }



      async function handleLoginPlanning(event) {
        event.preventDefault();

    await axios.post(`${ip}/auth/ad/login`, formLogin).then(({ data }) => {
    //   setShowmodeladd(false);
      localStorage.setItem("token", data.token);
      Swal.fire({
        icon: data.state ? "success" : "error",
        title: data.state ? "Login Success" : "Login Failed",
        text: data.msg,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `#000000b4`,
      })
        .then(() => {
          if(data.state != false){
            if (data.Auth === "user") {
              navigate("/Monitor");
            } else if (data.Auth === "admin") {
              navigate("/Monitor");
            } else {
            }
            window.location.reload(true)
          }else{

          } 
          
        })
    });
      }

      const initialRef = React.useRef(null)
      const finalRef = React.useRef(null)
  return (
<>

    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
      // className="login-page"
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            IIoT - <font style={{color:'red'}}>Cooling</font>
          </Heading>
        </Center>
        {/* <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          กรุณาระบุรหัสพนักงาน (Please Identify ID)
        </Center>*/}
        <Center
          fontSize={'1.2em'}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          
          <b> เข้าสู่ระบบ</b>
        </Center> 
        
        <Stack spacing={4}>
          
          <Button
            bg={"blue.500"}
            color={"white"}
            _hover={{
              bg: "blue.400"
            }}
            onClick={openMuser}
          >
            [ user ]
          </Button>
          <Button
            bg={"green.500"}
            color={"white"}
            _hover={{
              bg: "green.400"
            }}
            onClick={openMplanning}
          >
            [ Planning ]
          </Button>
        </Stack>
      </Stack>
    </Flex>
    

    <Modal isOpen={useropen} onClose={closeMuser} isCentered initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
            <ModalOverlay  bg='blackAlpha.300'
          backdropFilter='blur(15px) ' />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              {/* <form onSubmit={handleedituser}> */}
                <ModalBody>
                  <Stack spacing={6}>
                <Heading
                  fontSize={"4xl"}
                  textAlign={"center"}
                  bgGradient="linear(to-l, #ff000d, #ff00f2)"
                  bgClip="text"
                >
                  Login User
                </Heading>
                
                <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          กรุณาระบุรหัสพนักงาน (Please Identify ID)
        </Center>
        </Stack>
        <Stack spacing={6}>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          
          รหัสพนักงาน 7 หลักสุดท้าย (Last 7 Digit of Employee ID)
        </Center>
        
        <FormControl>
          <Center>
            <HStack>
              <PinInput id='emp_id' onChange={(e)=>setIdlog({emp_id:'101'+e})}>
                <PinInputField style={{borderColor:"gray"}} ref={initialRef}/>
                <PinInputField style={{borderColor:"gray"}} />
                <PinInputField style={{borderColor:"gray"}} />
                <PinInputField style={{borderColor:"gray"}} />
                <PinInputField style={{borderColor:"gray"}} />
                <PinInputField style={{borderColor:"gray"}} />
                <PinInputField style={{borderColor:"gray"}} />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500"
            }}
            onClick={handleLogin}
          >
            เข้าสู่ระบบ
          </Button>
          </Stack>
                </ModalBody>

                <ModalFooter>
                  {/* <Button colorScheme="red" mr={3} onClick={closeMuser}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">Save</Button> */}
                </ModalFooter>
              {/* </form> */}
            </ModalContent>
          </Modal>



          <Modal isOpen={planningopen} onClose={closeMplanning} isCentered initialFocusRef={initialRef}
        finalFocusRef={finalRef} >
            <ModalOverlay bg='blackAlpha.300'
          backdropFilter='blur(15px) ' />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              {/* <form onSubmit={handleedituser}> */}
                <ModalBody>
            <Stack spacing={4}>
                <form onSubmit={handleLoginPlanning} >
              <Stack align={"center"}>
                <Heading
                  fontSize={"4xl"}
                  textAlign={"center"}
                  bgGradient="linear(to-l, #ff00f2, #ff000d)"
                  bgClip="text"
                >
                  Login Planning
                </Heading>
                {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text> */}
              </Stack>
              <FormControl isRequired>
                <FormLabel style={{ fontSize: "1.3rem", marginTop:'15px' }}>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiUser color="gray.300" />}
                  />
                  <Input type="text" placeholder="Type your username" name="Username" ref={initialRef}
                      onChange={handleChange}/>
                </InputGroup>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel style={{ fontSize: "1.3rem" }}>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiLock color="gray.300" />}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password" name="Password"
                    onChange={handleChange}
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
              <Stack
                spacing={10}
                pt={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  w={"150px"}
                  leftIcon={<FiLogIn />}
                  loadingText="Submitting"
                  //   size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
              </form>
            </Stack>
                </ModalBody>

                <ModalFooter>
                  {/* <Button colorScheme="red" mr={3} onClick={closeMplanning}>
                    Close
                  </Button>
                  <Button colorScheme="green" type="submit">Save</Button> */}
                </ModalFooter>
              {/* </form> */}
            </ModalContent>
          </Modal>

          </>
  )
}
