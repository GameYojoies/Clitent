import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FromBlog from "./components/FormBlog";
import SingleComponent from "./components/SingleComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import EditComponent from "./components/EditComponent";
import Login from "./components/Login";
import Navbar from './components/Navbar';
import AdminRoute from "./AdminRoute"; // นำเข้า AdminRoute

const MyRoute = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<AdminRoute element={<FromBlog />} />} />
        <Route path="/blog/:slug" element={<SingleComponent />} />
        <Route path="/blog/edit/:slug" element={<AdminRoute element={<EditComponent />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
