import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  InputLeftElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiLogIn, FiUser, FiLock } from "react-icons/fi";
//   import { BsLockFill } from 'react-icons/bs'
//   import from '../components/images/b4.jpg'
export default function Login() {
  // const ip = "https://ipc.sncformer.com/iiot/api";
  const ip = "http://localhost:4001/api-iot-cl";
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({ Username: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");
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

    await axios.post(`${ip}/auth/login`, formLogin).then(({ data }) => {
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
          if (data.auth == "operator") {
            navigate("/Monitor");
          } else if (data.auth == "admin") {
            navigate("/Monitor");
          } else {
          }
        })
        .then(() => window.location.reload(true));
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormLogin({ ...formLogin, [name]: value });
  }


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      className="backgroundDash"
    >
      <motion.div
        // key={selectedTab ? selectedTab.label : "empty"}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            w={"md"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
                <form onSubmit={handleLogin} >
              <Stack align={"center"}>
                <Heading
                  fontSize={"4xl"}
                  textAlign={"center"}
                  bgGradient="linear(to-l, #ff000d, #ff00f2)"
                  bgClip="text"
                >
                  IIoT - Cooling
                </Heading>
                {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text> */}
              </Stack>
              <FormControl isRequired>
                <FormLabel style={{ fontSize: "1.3rem" }}>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiUser color="gray.300" />}
                  />
                  <Input type="text" placeholder="Type your username"  name="Username"
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
          </Box>
        </Stack>
      </motion.div>
    </Flex>
  );
}
