import React from "react";

export default function SideBar() {
  return (
    <>
        {/* sidebar */}
        <div className="flex-none font-serif w-16 bg-custom-blue-sideBar py-3 flex flex-col h-screen">
          <div className="w-12 h-12 mx-2 my-2 bg-white rounded-full">
            <h1 className="px-2 py-2 font-sans text-black size-2">User</h1>
          </div>
          <div>
            <span className="material-symbols-outlined text-white px-4 py-4">
              menu
            </span>
          </div>
          <div>
            <span className="material-symbols-outlined text-white px-4 py-4">
              schedule
            </span>
          </div>
          <div className="mt-auto">
            <div className="mx-4 my-2 text-white">
              <span className="material-symbols-outlined">tune</span>
            </div>
            <div className="mx-4 text-white">
              <span className="material-symbols-outlined">help</span>
            </div>
          </div>
        </div>
    </>
  );
}
