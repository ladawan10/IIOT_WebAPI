import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Menu_web from "./menu";



export default function ContentWrapper({ content: Content}) {
// const ip = 'http://localhost:4001/api-iot-cl'
const ip = 'https://iot-west.sncformer.com/api/api-iot-cl';
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
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
          // console.log(data.sys.Name);
          if (data.sys.Auth == "user") {
          } else if (data.sys.Auth == "admin") {
          } else {
            history.back()
          }
      } else {
       
        navigate("../");
      }
    });
}, []);

    return (
<>
<div
        className="wrapper no-select"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/*<Preloader />*/}
        {/* { menu === "" ? <NavbarMenu /> : <NavbarMenuUser />}
        { menu === "" ? <MainSidebar /> : null} */}
        {/* <NavbarMenu />
        <MainSidebar /> */}
        <Menu_web  sysname={localStorage.getItem("Name")}/>
        <div className="content-wrapper" style={{minHeight:'auto'}}>
          <section className="content">
            <div className="container-fluid py-1 vh-85">
              <Content />
            </div>
          </section>
        </div>
        {/* <ControlSidebar /> */}
        {/* <MainFooter /> */}
      </div>
</>

        );
    }

    ContentWrapper.propTypes = {
      content: PropTypes.func,
    };