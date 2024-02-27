import React from 'react';
import { useAuth } from './ContextProvider/AuthContext';
import Navbar from './Navbar';
import bg from "../assets/bg3.jpg";
import styled from '@emotion/styled';
import AllPosts from './AllPosts';


const imageURL = bg;
const Background = styled("div")({
  position: "absolute",
  width: "100%",
  // height: "100%",
  minHeight:'100vh',
  backgroundImage: `url(${imageURL})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
});

const HomePage = () => {
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
      }}
    >
      <Navbar position="fixed" />
      <AllPosts />
    </Background>
  );
};

export default HomePage;
