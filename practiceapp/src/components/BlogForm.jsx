import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Input,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "./ContextProvider/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref as imageRef,
  uploadBytes,
} from "firebase/storage";
import app from "../FirebaseConfig";
const BackgroundContainer = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled(Card)`
  width: 90%; /* Set initial width to take up 90% of the screen width */
  max-width: 500px; /* Set a maximum width for larger screens */
  border-radius: 10px;
  opacity: 1; /* Make the card translucent */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Add a subtle box shadow effect */
  background-color: rgba(255, 255, 255, 0.8);

  @media (min-width: 768px) {
    width: 70%; /* Adjust width for tablets and larger devices */
  }

  @media (min-width: 1024px) {
    width: 50%; /* Adjust width for desktop screens */
  }
`;

const FormContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent; /* Set the opacity of the white portion to 20% */
`;

const Title = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const CategoryField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const TextArea = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const BlogForm = () => {
  const [randomImage, setRandomImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: null,
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setSelectedImage(file);
      setFormData({
        ...formData,
        imageUrl: selectedImage,
      });
    }
  };
  const imageUpload = async () => {
    await uploadImage().then(console.log(formData));
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      fetch(`https://source.unsplash.com/2560x1440/?${value}`) // Update image resolution
        .then((response) => {
          setRandomImage(response.url);
        });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const authContext = useAuth();
  useEffect(() => {
    fetch("https://source.unsplash.com/2560x1440/?nature") // Update image resolution
      .then((response) => {
        setRandomImage(response.url);
      });
    // console.log(formData);
  }, [selectedImage]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    // const newFileName=formData.title;
    const imageName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    const storageRef = imageRef(
      storage,
      `${authContext.email}/blogs/${imageName}`
    );
    await uploadBytes(storageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(storageRef).then((downloadUrl) => {
          setFormData({
            ...formData,
            imageUrl: downloadUrl,
          });
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async () => {
    // await uploadImage().then(console.log(formData))

    await axios
      .post(`http://localhost:8080/users/${authContext.email}/blogs`, formData)
      .then(navigate("/welcome"));
  };

  return (
    <BackgroundContainer imageUrl={randomImage}>
      <Navbar />
      <FormCard>
        <FormContent>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            width={"100%"}
            height="50px"
            style={{
              width: "100%",
              marginBottom: "10px",
              background: "transparent",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
            }}
          >
            <Box style={{ cursor: "pointer" }}>
              <label htmlFor="filePicker">Upload Image For Your Blog</label>
              <Input
                id="filePicker"
                onChange={handleImageChange}
                sx={{ display: "none" }}
                type="file"
              />
              <Button variant="flushed" onClick={imageUpload}>
                Upload{" "}
              </Button>
            </Box>
            {/* } */}
          </Box>
          <Title
            id="blog-title"
            label="Title of the Blog"
            variant="outlined"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
          <CategoryField
            id="blog-category"
            select
            label="Category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
            name="category"
          >
            <MenuItem value="Nature">Nature</MenuItem>
            <MenuItem value="Architecture">Architecture</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
          </CategoryField>
          <TextArea
            id="blog-content"
            label="Blog Content"
            multiline
            rows={10}
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </SubmitButton>
        </FormContent>
      </FormCard>
    </BackgroundContainer>
  );
};

export default BlogForm;
