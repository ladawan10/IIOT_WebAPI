import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { Wrap, useColorModeValue} from "@chakra-ui/react";
import Lottie from "react-lottie";
import Loading2 from '../components/29894-error-404-page.json';

export default function View404() {

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: Loading2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
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
                // borderWidth="1px"
                // bg={useColorModeValue('white', 'gray.800')}
                // rounded="lg"
                // shadow="xl"
                // boxShadow={'lg'}
                position="relative"
                maxHeight={"90vh"}
                height={'90vh'}
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
                  {/* Report  */}
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
                <div className="overflow-auto" style={{maxHeight:'80vh'}}>
                {/* <iframe src="https://embed.lottiefiles.com/animation/97930"></iframe> */}
                {/* <Lottie options={defaultOptions} width={'200px'} /> */}
                <div style={{display:'flex',justifyContent:'center',fontSize:'2rem',color:'white'}}>under development sorry for the inconvenience...</div>
                <div style={{display:'flex'}}><Lottie options={defaultOptions} width={'500px'} /></div>

                </div>
              </Box>
              
          </Wrap>
        </div>
      </motion.div>
    </div>
  );
}
