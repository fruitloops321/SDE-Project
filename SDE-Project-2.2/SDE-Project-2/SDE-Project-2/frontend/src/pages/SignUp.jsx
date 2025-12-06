import React, { useState } from "react";
import "/src/styles/signup.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.jsx";

export default function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [pw, setPw] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: pw,

            });

            const result = response.data === true;

            if (result) {
                alert("Signup successful!");
                navigate("/login");
            } else {
                alert("Signup failed. Username or email already exists.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="aurora"></div>

            <div className="signup-card">
                <h1 className="signup-title">
                    Create your <span className="savlo-brand">Savlo</span> Account
                </h1>
                <p className="signup-subtitle">Join Savlo now!</p>

                {/* FORM */}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="name-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <label>First Name</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Username</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email address</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </div>

                    <button type="submit" className="signup-btn">
                        Join Savlo
                    </button>
                </form>

                <div className="signup-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}
