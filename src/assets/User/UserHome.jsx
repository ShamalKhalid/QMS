import React from "react";
import SideBar from "../SideBar";
import Header from "../Header";
import CurrentQueue from "./CurrentQueue";
export default function UserHome() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full">
          <Header />
          <CurrentQueue />
        </div>
      </div>
    </>
  );
}
