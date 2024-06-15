import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken} from "../services/authorize";
// import {  toast } from 'react-toastify';
import Swal from "sweetalert2";
const FormBlog = () => {
  const [state, setState] = useState({
    title: "",

    author: "",
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("API Url");

    axios
      .post(`${import.meta.env.VITE_API}/create`, { title, content, author },{
        headers: {
          "authorization": `Bearer ${getToken()} `,
        },
      })
      .then((response) => {
        // toast.success('Blog created successfully!');
        Swal.fire({
          title: "Warn!",
          text: "Successfully!",
          icon: "success",
        });
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        console.log(err);
        // If there's an error, display an error toast
        // toast.error();
        Swal.fire("Warn!", err.response.data.error, "error");
      });
  };

  return (
    <>
      <div className="container flex flex-col mx-auto px-4 uppercase gap-4">
        <h1 className="text-3xl uppercase font-bold">create a new blog</h1>
        <div>
          <form
            action=""
            className="flex flex-col border-solid border-2 border-gray-400 gap-4 p-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={inputValue("title")}
            />

            <label htmlFor="content">Content:</label>
            <ReactQuill 
            value={content}
            onChange={submitContent}
            theme="snow"
            className="mb-2 border-solid border border-gray-400"
            placeholder="เขียนรายละเอียดบทความของคุณ"
            />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={inputValue("author")}
            />

            <div className="flex justify-center">
              <button type="submit" className="bg-orange-400 p-3 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormBlog;
