import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken} from "../services/authorize";
const EditComponent = () => {
  const navigate = useNavigate(); // ใช้ useNavigate hook

  const { slug } = useParams();
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const submitContent = (event) => {
    setContent(event);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/blog/${slug}`)
      .then((res) => {
        const { title,content, author, slug } = res.data;
        setState({...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => alert(err));
  }, [slug]);

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_API}/blog/${slug}`, {
        title,
        content,
        author,
      }, {  // ย้ายวงเล็บที่เป็น parameter ของ axios.patch() มาต่อจากการส่งข้อมูล
        headers: {
          "authorization": `Bearer ${getToken()}`,
        }
      })
      
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ title, author, slug });
        setContent(content);
        Swal.fire({
          title: "Updated!",
          text: "The blog post has been updated.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าแรก
        });
      })
      .catch((err) => Swal.fire("Error", err.response.data.error, "error"));
  };;

  const showUpdateForm = () => (
    <form
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
          Update
        </button>
      </div>
    </form>
  );

  return (
    <div className="container flex flex-col mx-auto px-4 uppercase gap-4">
      <h1 className="text-3xl uppercase font-bold">Edit blog</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
