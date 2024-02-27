import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Backdrop, Box, Fade, Button, Typography, Grow } from '@mui/material';
import { useAuth } from './ContextProvider/AuthContext';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
// import Typography from '@mui/joy/Typography';
import "./Sample.css"
import { Modal } from '@mui/material';

const AllPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const authContext = useAuth();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  const handleScroll = (e) => {
    const image = document.getElementById('modal-image');
    if (image) {
      const scrollValue = e.target.scrollTop;
      image.style.transform = `scale(${1 - scrollValue / 2000})`;
    }
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/getAllPosts`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} mt={10}>
      {blogs.map(blog => (
        <Card onClick={() => openModal(blog)} variant="outlined" sx={{ width: 350, height: 300, m: 3 }} className='zoom-effect'>
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
            <Typography level="body-sm" sx={{overflow:'hidden',textOverflow:"ellipsis",whiteSpace:'nowrap'}}>{blog.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non tempore officia accusamus quo harum itaque quos eius ratione velit exercitationem iure ex illo, illum, numquam repellendus fugit voluptatem ipsum delectus impedit nisi cupiditate eaque sequi mollitia. Natus iste reprehenderit sunt sint repellendus sit, culpa veritatis id pariatur. Earum illum cum officiis molestias eum nesciunt beatae rem ratione maxime architecto, odit saepe provident eius ex facere. Culpa vitae ut totam pariatur eveniet veniam vel debitis labore at illum asperiores provident et voluptatem accusantium architecto, aut, numquam dolorem similique, quos non quam quas. Commodi dolorem harum culpa reprehenderit iusto quaerat temporibus modi suscipit, laudantium consectetur cupiditate, error aperiam doloribus, debitis porro! Earum, quo sunt consectetur labore, at sequi soluta iusto, dolor perspiciatis velit facilis reprehenderit nisi eos ratione dolorum totam obcaecati? Aliquam magni expedita illo explicabo ratione minus doloribus quod rerum fugiat ut esse distinctio, tempore temporibus vitae consequatur non facere deserunt consectetur nulla dolores quia numquam. Ipsam eveniet quos nam repellat pariatur exercitationem quia omnis quidem hic nostrum dolorem sed quibusdam voluptatum dicta vel qui quod veniam iste earum, autem, veritatis eaque dolorum! Delectus dignissimos nulla obcaecati. Ab delectus nisi numquam assumenda error deleniti asperiores nostrum fuga id, harum nihil? Nemo?</Typography>
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
      
      <Modal
        open={selectedBlog !== null}
        onClose={closeModal}
        onScroll={handleScroll}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1500,
        }}
      >
        <Grow in={selectedBlog !== null}>
          <Box sx={{ position: 'relative',  display:"flex", justifyContent:"center",alignItems:"center", mt:'30px'}}>
            {selectedBlog && (
              <Card sx={{ width: '80vw', height: '90vh' }}>
                <CardOverflow>
            <AspectRatio ratio="4">
              <img
                src={selectedBlog.imageUrl}
                srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                loading="lazy"
                alt=""
                id='modal-image'
              />
            </AspectRatio>
          </CardOverflow>
                <Box p={2} overflow={"scroll"} >
                  <Typography  fontSize={80} fontFamily={'serif'}>{selectedBlog.title}</Typography>
                  <Typography variant="subtitle1" fontFamily={'fantasy'}>{selectedBlog.category}</Typography>

                  <Typography sx={{marginTop:"20px"}} variant="body3">{selectedBlog.description
                  }Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non tempore officia accusamus quo harum itaque quos eius ratione velit exercitationem iure ex illo, illum, numquam repellendus fugit voluptatem ipsum delectus impedit nisi cupiditate eaque sequi mollitia. Natus iste reprehenderit sunt sint repellendus sit, culpa veritatis id pariatur. Earum illum cum officiis molestias eum nesciunt beatae rem ratione maxime architecto, odit saepe provident eius ex facere. Culpa vitae ut totam pariatur eveniet veniam vel debitis labore at illum asperiores provident et voluptatem accusantium architecto, aut, numquam dolorem similique, quos non quam quas. Commodi dolorem harum culpa reprehenderit iusto quaerat temporibus modi suscipit, laudantium consectetur cupiditate, error aperiam doloribus, debitis porro! Earum, quo sunt consectetur labore, at sequi soluta iusto, dolor perspiciatis velit facilis reprehenderit nisi eos ratione dolorum totam obcaecati? Aliquam magni expedita illo explicabo ratione minus doloribus quod rerum fugiat ut esse distinctio, tempore temporibus vitae consequatur non facere deserunt consectetur nulla dolores quia numquam. Ipsam eveniet quos nam repellat pariatur exercitationem quia omnis quidem hic nostrum dolorem sed quibusdam voluptatum dicta vel qui quod veniam iste earum, autem, veritatis eaque dolorum! Delectus dignissimos nulla obcaecati. Ab delectus nisi numquam assumenda error deleniti asperiores nostrum fuga id, harum nihil? Nemo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatem vero dicta, recusandae eligendi architecto pariatur obcaecati possimus autem ad cumque laborum, minus debitis. Explicabo exercitationem provident animi deleniti voluptatem dolore eum ipsam, suscipit temporibus eveniet, hic voluptas nam eius officiis fugiat non dolorum praesentium distinctio molestias totam, earum a aspernatur cupiditate architecto? Natus, dignissimos cupiditate velit vel placeat rem suscipit repellat odit labore, iure assumenda. Odio vero, magni recusandae eius, natus magnam labore iste, consequatur dolores et minus? Deserunt officia architecto temporibus nobis ullam! Fugiat fugit omnis maiores cupiditate eum iure! Et accusamus officiis cupiditate adipisci nam, exercitationem nobis excepturi vel necessitatibus inventore dolorem, molestias aspernatur? Repellendus delectus rerum perspiciatis deleniti, sunt dolores quam impedit qui consectetur? Excepturi nihil deleniti ex vitae, quam, nemo soluta nulla aliquam dignissimos quo totam ut odit, velit tempore expedita debitis amet eum aspernatur dicta neque nisi possimus cupiditate! Illo, nobis doloribus inventore pariatur doloremque odit eaque soluta eveniet aliquid cum voluptate tempora sunt consectetur repellat mollitia laborum quasi. Tenetur, ratione molestias. Accusantium suscipit perspiciatis officia ullam amet aperiam consectetur molestias sed consequatur vitae obcaecati asperiores nihil deleniti accusamus, nostrum sint voluptatibus ducimus praesentium. Rem, quia. Modi et placeat ducimus hic dicta facere molestias architecto fugit iure, adipisci, consequuntur omnis nulla optio expedita ratione delectus cupiditate laborum impedit dignissimos suscipit eum. Cumque, error, eaque veritatis magni quos, eum sapiente voluptatum autem molestias expedita tempora maxime illo adipisci. Tenetur similique iusto nam beatae molestiae soluta corrupti optio iure nesciunt repellendus error veritatis facilis deserunt necessitatibus velit ullam excepturi enim, a ipsam quisquam inventore ea? Doloribus illum facere debitis ab repudiandae commodi accusamus voluptatum unde error, amet enim dolorum voluptatibus laudantium neque iure est sequi impedit! Esse impedit autem quidem optio voluptatem, facilis dolore recusandae nam doloremque sit quaerat! Nihil reprehenderit ipsum praesentium cupiditate, suscipit maiores odit enim qui laudantium, quasi totam ut dolorem eius, eum et quis architecto dolores aspernatur ea? Quod, asperiores, voluptas quaerat aperiam, tempora iure praesentium repudiandae tenetur fuga commodi dolore cumque expedita esse odit exercitationem totam iusto soluta pariatur suscipit accusantium dolores illo vero sint? Deleniti, explicabo ipsum sequi eveniet libero dicta quisquam eius illo corrupti perspiciatis voluptas, ab architecto vitae nesciunt fuga incidunt quasi harum consequuntur voluptates magni consequatur? Aliquam commodi sequi, voluptates error possimus nam magni rem asperiores voluptatibus corrupti delectus! Facilis, facere, vel molestiae mollitia rem perspiciatis autem voluptates voluptatibus pariatur voluptas, tenetur omnis saepe voluptate eos et.
                  </Typography>
                  <Box>
                  <Button onClick={closeModal} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Close
                  </Button>
                  </Box>
                </Box>
              </Card>
            )}
          </Box>
        </Grow>
      </Modal>
    </Box>
  );
}

export default AllPosts;
