import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost/SinglePost";

const PostCard = () => {
  const [alldata, setData] = useState([])

  useEffect(() => {
    axios.get('https://nonbe.vercel.app/allPosts')
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  return (
    <>
      {alldata.length > 0 && 
        alldata.map((data) => <SinglePost val = {data} key={data._id} />)
       }
    </>
  );
};

export default PostCard;
