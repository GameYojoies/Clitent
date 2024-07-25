import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser, getToken } from "./services/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการจะลบบทความหรือไม่!",
      text: "Warning!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${import.meta.env.VITE_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        fetchData();
        Swal.fire({
          title: "Warn!",
          text: "Successfully!",
          icon: "success",
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 my-5 w-[95%]">
          <div className="flex flex-wrap gap-5 w-full justify-center">
            {blogs.map((blog, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="border p-4 my-2 rounded shadow w-[100%]">
                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                        {parse(blog.title)}
                      </h3>
                    </Link>
                    <img src={blog.image} alt="image" />
                    <div className="flex gap-1 truncate text-sm sm:text-base md:text-lg lg:text-xl">
                      Content:
                      {parse(blog.content.substring(0, 200))}
                    </div>
                    <div className="flex gap-1 truncate text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
                      Author:
                      <p className="">{blog.author}</p> เผยแพร่:
                      <p className="truncate">
                        {new Date(blog.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {getUser() && (
                      <div className="flex gap-5 my-3 justify-end">
                        <Link
                          to={`/blog/edit/${blog.slug}`}
                          className=" bg-blue-400 mp-2 rounded-md p-2"
                        >
                          อัพเดตบทความ
                        </Link>
                        <button
                          className=" bg-red-500 p-2 rounded-md"
                          onClick={() => confirmDelete(blog.slug)}
                        >
                          ลบบทความ
                        </button>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
