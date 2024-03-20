import React from "react";
import logo from "./User/tecnavis.jpg";

export default function Header() {
  return (
    <>
      <div className="h-20 border-b-2 bg-tecnavis flex flex-2">
        <img src={logo} alt="" className="w-14 h-14 rounded-full ml-4 my-2" />
        <h1 className="font-surfer ml-4 my-6 mb-2 text-2xl text-white">
          Queue Management System
        </h1>
      </div>
      
    </>
  );
}
