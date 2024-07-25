import React, { useState, useEffect } from "react";
import axios from "axios";
import { authorize, getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API}/login`, state)
      .then((response) => {
        authorize(response, () => navigate("/"));
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <div className="flex justify-center mb-6 text-4xl font-bold">
          <h1>เข้าสู่ระบบ</h1>
        </div>
        <label htmlFor="username">ชื่อผู้ใช้</label>
        <input
          type="text"
          id="username"
          value={state.username}
          onChange={inputValue("username")}
          style={{ marginBottom: "10px", padding: "8px" }}
          className="border"
          placeholder="ชื่อผู้ใช้"
        />
        <label htmlFor="password">รหัสผ่าน</label>
        <input
          type="password"
          id="password"
          value={state.password}
          onChange={inputValue("password")}
          style={{ marginBottom: "20px", padding: "8px" }}
          className="border"
          placeholder="รหัสผ่าน"
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          เข้าสู่ระบบ
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
