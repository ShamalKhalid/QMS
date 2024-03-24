import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user_icon from "../Auth/person.jpg";
import email_icon from '../Auth/email.jpg';
import password_icon from '../Auth/password.jpg';
import { signUpWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from '../firebase'; // Import resetPassword function

export default function LogInAuth() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            if (action === "Sign Up") {
                // Check if password and retype password match
                if (password !== retypePassword) {
                    setError("Passwords do not match");
                    return;
                }

                const user = await signUpWithEmailAndPassword(email, password);
                // Handle successful sign-up, e.g., redirect to another page
                console.log("User signed up:", user);
                navigate("/dashboard"); // Redirect to dashboard upon successful sign-up using useNavigate
            } else {
                // Login functionality
                const user = await signInWithEmailAndPassword(email, password);
                // Handle successful login, e.g., redirect to another page
                console.log("User logged in:", user);
                navigate("/dashboard"); // Redirect to dashboard upon successful login using useNavigate
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(email); // Call the resetPassword function with the user's email
            alert("Password reset email sent. Please check your inbox."); // Notify the user that the reset email has been sent
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === "Login" ? null : (
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input placeholder="Name" type="text" />
                        </div>
                    )}

                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input placeholder="Email Id" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input placeholder=" Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {action === "Login" ? null : (
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input placeholder="Retype Password" type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
                        </div>
                    )}
                    <button className="submit-button" type="submit">Submit</button>

                    {action === "Sign Up" ? null : (
                        <div className="forgot-password">Lost Password? <Link to="#" onClick={handleResetPassword}>Click Here!</Link></div>
                    )}
                    <div className="submit-container">
                        <button type="button" className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</button>
                        <button type="button" className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
