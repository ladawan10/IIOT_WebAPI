import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Wrap, useColorModeValue , Grid , GridItem} from "@chakra-ui/react";
import Lottie from "react-lottie";
import Loading2 from '../../components/29894-error-404-page.json';

export default function Working() {
  const allproductionLinelist = useSelector((state) => state.dataLine);
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loading2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const gogo = (line) =>{
    // console.log(line)
    line == 'C1' ? (navigate("/working/c1") ): console.log(line)
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
            // width: "100vw",
            height: "85vh",
            display: "flex",
            margin: "0 15px 0 15px",
            justifyContent: "center",
            alignItems:'center'
          }}
        >
          <Wrap spacing="30px" justify="center" sx={{padding:'16px',width:'100%'}}>
          {allproductionLinelist.length != 0 ? (allproductionLinelist.map((info, i) => (
            <>
          <Box 
                padding={'15px'}
                borderWidth="1px"
                bg={useColorModeValue('white', 'gray.800')}
                rounded="lg"
                shadow="xl"
                boxShadow={'lg'}
                position="relative"
                onClick={()=>gogo(info.L_Productionline)}
                sx={{fontSize:'2.3rem',fontWeight:'bold'
                ,cursor: info.L_Productionline != 'C1' ? 'no-drop' : 'pointer'
              }}
                >
                  <Grid  templateRows='repeat(2, 1fr)'  gap={1} sx={{justifyItems:'center'}}>
                    <GridItem>Line :  {info.L_Productionline}</GridItem>
                    <GridItem>{info.L_FullName}</GridItem>
                  </Grid>
           
           
          </Box>
          </>
          ))):('')}
          </Wrap>
        </div>
      </motion.div>
    </div>
  );
}
 