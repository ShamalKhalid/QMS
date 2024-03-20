import React from "react";

export default function CurrentQueue() {
  return (
    <>
      <div className="h-3/4 w-3/4 mx-auto my-auto border-4 bg-tecnavis">
        <div className="grid grid-cols-2 ">
          <div className="font-poppins text-3xl m-12 ml-26 pr-8 text-white border-r-4 border-gray-600">
            <h1 className="pl-40">Current Queue</h1>
            <div className="h-P100 w-68 bg-white rounded-xl mt-6 text-black font-sansita">
              <h2 className="p-6">138: Shibu</h2>
            </div>
          </div>
          <div className="font-poppins text-3xl m-12 ml-26 pr-8 text-white">
            <h1 className="pl-40">Create a Request</h1>
            <div className="h-P100 w-68 bg-white rounded-xl mt-6 text-black font-sansita"></div>
          </div>
        </div>
      </div>
    </>
  );
}
