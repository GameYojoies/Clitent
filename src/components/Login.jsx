import React, { useState,useEffect } from "react";
import axios from "axios";
import { authorize,getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook instead of withRouter

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Handle login logic here
    axios
      .post(`${import.meta.env.VITE_API}/login`, state)
      .then((response) => {
        authorize(response, () => navigate("/")); // Use navigate function instead of props.history
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
useEffect(()=>{
  getUser()
},[])
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
    </div>
  );
};

export default Login;
