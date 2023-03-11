import React , { useState,useEffect } from "react";
import { Routes, Route ,useNavigate } from "react-router-dom";
import Menu_web from "./layout/menu";
import Home from "./page/home";
import Report from "./page/report"
import Employee from "./page/setting/employee";
import Prod_line from "./page/setting/prod_line";
import Planning from "./page/planning";
import Overview from "./page/overview";
import View404 from "./page/view404";
import Master_mc from "./page/setting/master_mc";

import CallAPI from "./services/CallApi";
import Login from "./page/login";
import Login2 from "./page/p_login";
import { Planning_c1 } from "./page/planning/index";

import Working from "./page/employee/working";
import Line_c1 from "./page/employee/line_c1";

import ContentWrapper from "./layout/ContentWrapper";
import ContentWrapper_u from "./layout/ContentWrapper_U";

import display2 from "./components/dashboard/display2";

// import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
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
          console.log(data.sys.Name);
      } else {
       
        navigate("../");
      }
    });
}, []);
  return (
    <div className="app">
      <CallAPI/>
      {/* <line_chart /> */}
      {/* {localStorage.getItem("token") != "undefined" && localStorage.getItem("token") != null  ? 
      (<Menu_web sysname={localStorage.getItem("Name")}/>):('')} */}
      
      <main className="content">
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route path="*" element={<View404 />} />
        {/* <Route path="/login" element={<Login2 />} /> */}
        <Route path="/Monitor" element={<ContentWrapper content={display2} />} />
        <Route path="/Overview" element={<ContentWrapper content={Overview}   />} />
        <Route path="/Planning" element={<ContentWrapper content={Planning}  />} />
        <Route path="/Planning/c1" element={<ContentWrapper content={Planning_c1} />} />
        <Route path="/Report" element={<ContentWrapper content={Report}  />} />
        <Route path="/prod_line" element={<ContentWrapper content={Prod_line}  />} />
        <Route path="/ms_mc" element={<ContentWrapper content={Master_mc}  />} />
        <Route path="/employee" element={<ContentWrapper content={Employee}  />} />
        <Route path="/working" element={<ContentWrapper_u content={Working}  />} />
        <Route path="/working/c1" element={<ContentWrapper_u content={Line_c1}  />} />
        {/* <Route path="/dashboard" element={<ContentWrapper_u content={display2}  />} /> */}

      </Routes>
      </main>
    </div>
    
  )
}
