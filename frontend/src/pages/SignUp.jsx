import React, { useState } from "react";
import "/src/styles/signup.css";

export default function SignUp() {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <div className="signup-container">
            {/* Aurora Background */}
            <div className="aurora"></div>

            {/* SIGNUP CARD */}
            <div className="signup-card">
                <h1 className="signup-title">Create your <span className="savlo-brand">Savlo</span> Account</h1>
                <p className="signup-subtitle">Join Savlo now!</p>

                <form className="signup-form">
                    {/* First + Last Name in one row */}
                    <div className="name-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                required
                            />
                            <label>First Name</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            required
                        />
                        <label>Username</label>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email address</label>
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                        <label>Password</label>
                    </div>

                    {/* Submit Button */}
                    <button className="signup-btn">Join Savlo</button>
                </form>

                <div className="signup-footer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}
