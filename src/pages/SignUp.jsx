import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/signup.css";


export default function SignUp() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            {/* Aurora background */}
            <div className="aurora-wrapper">
                <div className="aurora"></div>
            </div>

            {/* Right-side sign up card */}
            <div className="signup-card">
                <div className="login-title">Create your <span>Savlo</span> Account</div>
                <div className="login-subtitle">
                    Start your reading journey with us today!
                </div>

                <form className="login-form">

                    {/* First Name */}
                    <div className="input-group small-label">
                        <input type="text" required />
                        <label>First Name</label>
                    </div>

                    {/* Last Name */}
                    <div className="input-group small-label">
                        <input type="text" required />
                        <label>Last Name</label>
                    </div>

                    {/* Username */}
                    <div className="input-group small-label">
                        <input type="text" required />
                        <label>Username</label>
                    </div>

                    {/* Email */}
                    <div className="input-group small-label">
                        <input type="email" required />
                        <label>Email address</label>
                    </div>

                    {/* Password */}
                    <div className="input-group small-label">
                        <input type="password" required />
                        <label>Password</label>
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Join Savlo now!
                    </button>
                </form>

                <div className="login-footer">
                    Already a Savlo member?{" "}
                    <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
                </div>
            </div>
        </div>
    );
}
