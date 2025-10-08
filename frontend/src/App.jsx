import {Box,useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";

function App() {
  return (
    <>
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}> 
            {/* 100 for light 900 for dark */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={<Createpage/>}/>
      </Routes>
    </Box>
    </>
  );
}

export default App;
