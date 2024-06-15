// เก็ฐ token
import React from "react";

export const authorize = (response, next) => {
  if (window !== undefined) {
    // เก็บข้อมูลบลง seeion storage
    sessionStorage.setItem("authToken", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.username));
  }
  next();
};

// ดึงข้อมูล token
export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("authToken")) {
      return JSON.parse(sessionStorage.getItem("authToken"));
    } else {
      // กรณีไม่พบข้อมูล authToken ใน sessionStorage
      return false;
    }
  }
};

// ดึงข้อมูล user
export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      // กรณีไม่พบข้อมูล authToken ใน sessionStorage
      return false;
    }
  }
};

//logout
export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
  }
  next();
};
