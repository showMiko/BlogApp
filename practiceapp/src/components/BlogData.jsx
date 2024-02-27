import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useAuth } from './ContextProvider/AuthContext';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

const BlogData = () => {
  const [blogs, setBlogs] = useState([]);
  const authContext=useAuth();
  useEffect(() => {
    // console.log("From the Blog Data Page "+authContext.email)
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${authContext.email}/blogs`);
        // console.log(response)
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [blogs]);

  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} mt={10}>
      {blogs.map(blog => (
        <Card variant="outlined" sx={{ width: 350,height:300,m:3 }} className='zoom-effect' >
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src={blog.imageUrl}
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{blog.title}</Typography>
          <Typography level="body-sm">{blog.category}</Typography>
          <Typography level="body-sm">{blog.description}</Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              6.3k views
            </Typography>
            <Divider orientation="vertical" />
            <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              1 hour ago
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
      ))}
    </Box>
  );
};

export default BlogData;


{/* <Card key={blog.id} className='zoom-effect' style={{ margin: '20px', padding: '10px',width:"400px",height:'400px', borderRadius:"10px", boxShadow:"3px 2px 5px white", backgroundColor:"rgb(255,255,200,0.2)"}}>
          <CardContent sx={{color:"black"}}>
          <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%',boxShadow:"2px 2px 5px " , height: '250px',borderRadius:"10px",marginBottom:"20px", objectFit: 'cover' }} />
            <Typography variant="h5" sx={{fontFamily:'Varela Round'}}>{blog.title}</Typography>
            <Typography variant="subtitle1" sx={{fontFamily:'Varela Round'}}>Category: {blog.category}</Typography>
            <Typography variant="body1" sx={{fontFamily:'Varela Round'}}>{blog.description}</Typography>
          </CardContent>
        </Card> */}