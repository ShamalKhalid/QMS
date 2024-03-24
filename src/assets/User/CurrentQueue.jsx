import { useState, useEffect } from "react";
import React from "react";
import { collection, getDocs, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { db, submitDataToFirestore } from "../firebase";

export default function CurrentQueue() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [userData, setUserData] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    // Ensure only numbers are entered
    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phone.length < 10) {
      alert("Please Enter a 10 digit Phone Number");
      return;
    }

    try {

      await submitDataToFirestore({
        name: name,
        phone: phone,
        service: service,
        date: serverTimestamp()
      });

      // Clear the form fields after submission
      setName("");
      setPhone("");
      setService("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requests"), orderBy("date","desc"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log("Fetched data:", data); // Add this line
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    

    const unsubscribe = onSnapshot(collection(db, "requests"), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => doc.data());
      const orderedData = updatedData.sort((a, b) => b.date - a.date);
      const reversedData = orderedData.reverse();
      setUserData(reversedData);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);


  return (
    <>
      <div className="h-3/4 w-3/4 mx-auto my-auto border-4 bg-tecnavis">
        <div className="grid grid-cols-2">
          <div className="font-poppins text-3xl m-12 ml-26 pr-8 text-white border-r-4 border-gray-600">
            <h1 className="pl-40">Current Queue</h1>
            <div className="bg-white rounded-xl shadow-md pt-6 pb-6 mt-6 h-P100 overflow-auto scrollbar-custom">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Sl. No</th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Name</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-4xl text-gray-900 w-1/3 border-r-2">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-4xl text-gray-900 ">{user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="font-poppins text-3xl m-12 ml-26 pr-8 text-white">
            <h1 className="pl-40">Create a Request</h1>
            <div className="h-P100 w-68 bg-white rounded-xl mt-6 text-black font-sansita">
              <form onSubmit={handleSubmit} className="p-4">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  autoComplete="off"
                  id="name"
                  className="h-12 w-formWidth border-4 mt-3 border-gray-400 rounded-md mb-3 pl-2"
                />
                <label htmlFor="phone">Phone</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter a 10-digit number"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  autoComplete="off"
                  id="phone"
                  className="h-12 w-formWidth border-4 mt-3 border-gray-400 rounded-md mb-3 pl-2"
                />
                <label htmlFor="service">Reason for Visit</label>
                <br />
                <textarea
                  rows={2}
                  cols={5}
                  placeholder="What Service do you need?"
                  value={service}
                  autoComplete="off"
                  onChange={handleServiceChange}
                  required
                  id="service"
                  className="h-40 w-formWidth border-4 mt-3 pb-32 pl-2 border-gray-400 rounded-md overflow-hidden"
                />
                <button
                  type="submit"
                  name="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded-full h-10 w-30 ml-left"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
