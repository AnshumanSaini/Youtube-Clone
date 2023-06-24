import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [video, setvideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async ()=>{
        console.log("this is running...");
        const res = await axios.get(`video/${type}`);
        setvideos(res.data);
    }
    fetchVideos();
  },[type]);

  return (
    <Container>
      {video.map(video=>(
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Home;
