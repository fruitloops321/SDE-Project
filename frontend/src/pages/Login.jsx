// src/pages/LoginPage.jsx
import { useState } from "react";
import "/src/styles/login.css";


export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    return (
        <div className="login-page">
            <div className="aurora-wrapper">
                <div className="aurora"></div>
            </div>

            {/* Right-aligned login card */}
            <div className="login-content">
                <div className="login-panel">

                    <div className="login-header">
                        <div className="login-title">Welcome to Savlo</div>
                        <div className="login-subtitle">Please enter your email and password to login</div>
                    </div>


                    {/* Floating inputs */}
                    <div className="floating-group">
                        <input
                            className="floating-input"
                            type="email"
                            value={email}
                            placeholder=" "
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="floating-label">Email address</label>
                    </div>

                    <div className="floating-group">
                        <input
                            className="floating-input"
                            type="password"
                            value={pw}
                            placeholder=" "
                            onChange={(e) => setPw(e.target.value)}
                        />
                        <label className="floating-label">Password</label>
                    </div>

                    {/* Options */}
                    <div className="login-options">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">&nbsp; Remember Me</label>
                        </div>
                        <a>Forgot Password</a>
                    </div>

                    {/* Login button */}
                    <button
                        className="login-button"
                        onClick={() => onLogin?.()}
                    >
                        Login
                    </button>

                    <div className="login-footer">
                        New to Savlo? <a>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
