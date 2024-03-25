import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/Auth/Login';
import Signup from './assets/Auth/SignUp';
import UserHome from "./assets/User/UserHome"
import AdminHome from "./assets/Admin/AdminHome"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userhome" element={<UserHome />} /> 
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/adminhome" element={<AdminHome />}></Route>
            </Routes>
        </Router>
    );
};

export default App;
