import React, { useState, useEffect } from "react";
import Header from "../Header.jsx";
import SideBar from "../SideBar.jsx";
import { collection, getDocs ,onSnapshot} from "firebase/firestore";
import { db } from "../firebase";

export default function AdminHome() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    const unsubscribe = onSnapshot(collection(db, "requests"), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => doc.data());
      setUserData(updatedData);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);


  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full">
          <Header />

          <div className="h-height m-32 mb-34 border-8">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-xl w-1/5">Sl.No</th>
                  <th className="px-4 py-2 text-xl w-1/5">Name</th>
                  <th className="px-4 py-2 text-xl w-1/5">Date</th>
                  <th className="px-4 py-2 text-xl w-1/5">Phone</th>
                  <th className="px-4 py-2 text-xl w-1/5">Reason for Visit</th>
                </tr>
              </thead>
              <tbody className="overflow-auto">
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-xl w-1/5 font-medium font-sansita">{index + 1}.</td>
                    <td className="border px-4 py-2 text-xl w-1/5 font-medium font-sansita">{user.name}</td>
                    <td className="border px-4 py-2 text-xl w-1/5 font-medium font-sansita">{user.date ? new Date(user.date.seconds * 1000).toLocaleString() : ''}</td>
                    <td className="border px-4 py-2 text-lg w-1/5 font-medium font-sansita">{user.phone}</td>
                    <td className="border px-4 py-2 text-lg w-1/5 font-medium font-sansita">{user.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
