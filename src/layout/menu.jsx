import React, { ReactNode,useEffect, useRef,useState } from "react";
import { useNavigate, Link , NavLink as RouterLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
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
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Box,
  Flex,
  Popover,
  PopoverTrigger ,
  PopoverContent,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { HStack, VStack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiEdit,
  FiDatabase,
} from "react-icons/fi";

const LinkItems = [
  { name: "Dashboard", icon: FiHome,link:'/Monitor' },
  // { name: "Planning", icon: FiCompass ,link:'/dashboard'},
  { name: "Overview", icon: FiTrendingUp,link:'/Overview' },
  // { name: "Report", icon: FiStar,link:'/Report' },
  // { name: "Value", icon: FiDatabase,link:'/dashboard' },
];
const PlanningLink = [
  { name: "Planning", icon: FiSettings, 
    children:[
      // { id:1,subname: "Line A", icon: FiSettings,link:'/planning/a' },
      // { id:2,subname: "Line B", icon: FiSettings,link:'/planning/b' },
      { id:3,subname: "Line C1", icon: FiSettings,link:'/planning/c1' },
      // { id:4,subname: "Line J", icon: FiSettings,link:'/planning/j' },
      // { id:5,subname: "Line H", icon: FiSettings,link:'/planning/h' },
      // { id:6,subname: "Line E", icon: FiSettings,link:'/planning/e' },
      // { id:7,subname: "Line D1", icon: FiSettings,link:'/planning/d1' },
      // { id:8,subname: "Line D2", icon: FiSettings,link:'/planning/d2' },
    ] },
];

var LinkItems2 = [
  { name: "Setting", icon: FiSettings, 
    children:[
      // { id:1,subname: "Employee", icon: FiSettings,link:'/employee' },
      { id:2,subname: "Production Line", icon: FiSettings ,link:'/prod_line'},
      { id:3,subname: "Machine Master", icon: FiSettings ,link:'/ms_mc'},
    ] },
];
var LinkItemsAD = [
  { name: "Setting", icon: FiSettings, 
    children:[
      { id:1,subname: "Employee", icon: FiSettings,link:'/employee' },
      { id:2,subname: "Production Line", icon: FiSettings ,link:'/prod_line'},
      { id:3,subname: "Machine Master", icon: FiSettings ,link:'/ms_mc'},
    ] },
];
// const routlink =()=>window.location.pathname.slice(0);


export default function Menu_web({sysname}) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen , setMenuOpen] = useState(false);
  const clickmenuopen = () => setMenuOpen(true)
  const clickmenuclose = () => setMenuOpen(false)
  const alluserlist = useSelector((state) => state.datauser);
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const infoDatauser = alluserlist.filter(({U_Name})=>U_Name == sysname)
  const datadeteiluser = infoDatauser[0];
  // console.log(infoDatauser);
  const btnRef = useRef(); //กำหนดจุดเริ่มต้น
  // console.log(window.location.pathname.slice(5));
  // const routlink =()=>window.location.pathname.slice(5);
   // const ip = 'http://localhost:4001/api-iot-cl'
 const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");
  const [menuAD , setMenuAD] = useState(false);

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

        } else if (data.sys.Auth == "admin") {
          setMenuAD(true)
        } else {
        }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("Name");
          navigate("../");
        }
      });
  }, []);
  

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("Name");
        // localStorage.setItem("Name", '-');
        Swal.fire({
          icon: "success",
          title: "Logout",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/")
          window.location.reload(false);
        });
      }
    });
  }

  
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        boxShadow={"2xl"}
        shadow="lg"
      >
        
        <Flex p={1} alignItems={"center"} justifyContent={"space-between"}>
          

          <HStack spacing={2} alignItems={"center"}>
          <Box sx={{ display: "flex", alignItems: "center" }} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            // onClick={isOpen ? onClose : onOpen}
            onClick={clickmenuopen}
          />
            {/* <Button ref={btnRef} onClick={clickmenuopen}>
              <HamburgerIcon />
            </Button> */}
            <Text fontSize={{ base: "15px", md: "20px", lg: "30px" }}>
              <b style={{ color: "red" ,marginLeft:'15px'}}>SNC</b> Cooling : IIoT
            </Text>
          </Box>
            <HStack
              as={"nav"}
              spacing={1}
              display={{ base: "none", md: "flex" }}
            >
              {LinkItems.map(link => (
                <NavItem key={link.name} icon={link.icon} link={link.link} sublink={link.children}>
                {link.name}
              </NavItem>
              ))}
              
              {PlanningLink.map(link => (
                <div key={link.id}>
                <SubNavbar key={link.name} icon={link.icon} link={link.link} sublink={link.children}>
                {link.name}
              </SubNavbar>
              </div>
              ))}
              {menuAD == true ? (
                <>
                {LinkItemsAD.map(link => (
                  <div key={link.name}>
                  <SubNavbar key={link.name} icon={link.icon} link={link.link} sublink={link.children}>
                  {link.name}
                </SubNavbar>
                </div>
                ))}
                </>
              ):(
<>
{LinkItems2.map(link => (
  <div key={link.name}>
  <SubNavbar key={link.name} icon={link.icon} link={link.link} sublink={link.children}>
  {link.name}
</SubNavbar>
</div>
))}
</>
              )}
              
              
            </HStack>
            
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  //   rounded={"full"}
                  //   variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  style={{ marginLeft: "5px" }}
                >
                  user : {sysname}
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {/* <MenuItem onClick={()=>eventOpenEdit(infoDatauser)}>Account Settings</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Drawer
        isOpen={menuOpen}
        placement="left"
        onClose={clickmenuclose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text sx={{fontSize:'1.5rem'}}>
              <b style={{ color: "red" }}>SNC</b> B4 IPC Factory
            </Text>
          </DrawerHeader>

          <DrawerBody >
            <div onClick={clickmenuclose}>
          <SidebarContent />
          </div>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button colorScheme="red" onClick={clickmenuclose}>
              Cancel
            </Button> */}
            {/* <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


      {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {LinkItems.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}




    </>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <>
        {LinkItems.map(link => (
          <NavItem key={link.name} icon={link.icon} link={link.link} sublink={link.children}>
            {link.name}
          </NavItem>
        ))}
      </>
    )
  }
  
  const NavItem = ({ icon, children,link,sublink, ...rest }) => {
    let activeStyle = {
      textDecoration: "none",
      backgroundColor: '#0BC5EA !important',
      color:'white!important',
      borderRadius: '10px',
    };
    return (
      <RouterLink
        // as={RouterLink}
        to={link}
        // isactive={true}
        // style={{ textDecoration: "none",}}
        _focus={{ boxShadow: "none" }}
        // activeStyle={{
        //   backgroundColor: '#0BC5EA !important',
        //   color:'#fff!important',
        //   borderRadius: '10px',
        // }}
        
        style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
      >
        <Flex
          // as={RouterLink}
          align="center"
          p="2"
          mx="1"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white"
          }}
          // _activeLink={{ fontWeight: "bold" }}

          // _activeLink={{
          //   bg: "cyan.400",
          //   color: "white"
          // }}
          
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              fontSize="20"
              _groupHover={{
                color: "white"
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </RouterLink>
    )
  }


  const SubNavbar = ({ icon, children,link,sublink, ...rest  }) => {
    return (
      // <Link
      //   to={'#'}
      //   style={{ textDecoration: "none" }}
      //   _focus={{ boxShadow: "none" }}
      // >
        <Menu>
        <MenuButton 
        // key={'9'}
        borderRadius="lg"
        _hover={{
            bg: "cyan.400",
            color: "#ffffff"
          }}
          style={{width:'100%'}}
          >
        <Flex
          align="center"
          p="2"
          mx="1"
          borderRadius="lg"
          cursor="pointer"
          {...rest}
        >
        <FiSettings style={{margin:'0 8 0 0'}}/>
        <Box>
            <Text
              // transition={"all .3s ease"}
              // _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {children}
              {/* {sublink} */}
            </Text>
          </Box>
        </Flex>
        </MenuButton>
        <MenuList>
        {sublink.map((sub,i) => (
          <div key={i}>
          <RouterLink
          isactive
        to={sub.link}
        style={{ textDecoration: "none" , }}
        _focus={{ boxShadow: "none" }}
        className="summenu"
      >
          
          <MenuItem  key={sub.id} id={sub.link} icon={<FiEdit/>} >
            {sub.subname}
          </MenuItem>
          </RouterLink>
          </div>
        ))}
        
        </MenuList>
        </Menu >
      // {/* </Link> */}
    )
  }