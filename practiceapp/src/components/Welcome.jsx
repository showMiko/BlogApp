import React from 'react';
import { useAuth } from './ContextProvider/AuthContext';
import Navbar from './Navbar';
import BlogData from './BlogData';
// import bg from "../assets/bgI.jpeg"
import bg from "../assets/bg3.jpg";
import styled from '@emotion/styled';


const imageURL = bg;
const Background = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${imageURL})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});

const Welcome = () => {
  const authContext = useAuth();
  console.log(authContext.email);
  return (
    <Background
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh', // Adjust height as needed
      }}
    >
      <Navbar position="fixed" />
      <BlogData />
    </Background>
  );
};

export default Welcome;
