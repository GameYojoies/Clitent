import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
function SingleComponent() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/blog/${slug}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {blog ? (
        <div className="flex justify-center my-8">
        <div className=" shadow w-[80%] p-5">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{blog.title}</h3>
          <p className="flex gap-1 truncate text-sm sm:text-base md:text-lg lg:text-xl py-2">
            Content: {parse(blog.content.substring(0, 200))}
          </p>
          <p className="flex gap-1 truncate text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
            Author: {blog.author} Published: {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default SingleComponent;
