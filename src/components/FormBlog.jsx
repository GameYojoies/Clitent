import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const FormBlog = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
  });

  const { title, author } = state;
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // สถานะสำหรับเก็บไฟล์รูปภาพ

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // เก็บไฟล์ที่อัปโหลด
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("image", image); // เพิ่มไฟล์รูปภาพลงใน FormData

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getToken()}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Blog created successfully!",
        icon: "success",
      });
      setState({ title: "", author: "" });
      setContent("");
      setImage(null); // รีเซ็ตไฟล์รูปภาพ
      navigate("/"); // Redirect to desired path
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", err.response?.data?.error || "An error occurred", "error");
    }
  };

  return (
    <>
      <div className="container flex flex-col mx-auto px-4 uppercase gap-4">
        <h1 className="text-3xl uppercase font-bold">Create a New Blog</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border-solid border-2 border-gray-400 gap-4 p-3"
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
              placeholder="Write your blog content here"
            />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={inputValue("author")}
            />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              accept="image/*" // กำหนดให้รับเฉพาะไฟล์รูปภาพ
              onChange={handleImageChange}
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
