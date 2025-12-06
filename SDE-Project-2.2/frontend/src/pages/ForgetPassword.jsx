import React, { useState } from "react";
import "/src/styles/forgetPassword.css";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");

    return (
        <div className="fp-container">
            {/* Aurora Background */}
            <div className="fp-aurora"></div>

            {/* Right Card */}
            <div className="fp-card">
                <div className="fp-header">
                    <h2 className="fp-title">
                        Reset your <br />
                        <span>Password</span>
                    </h2>

                    <p className="fp-subtitle">
                        Enter your email address and press ‘Reset my Password’. A link will
                        be sent to your email address to reset your password.
                    </p>
                </div>

                {/* Email Input */}
                <div className="fp-input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="fp-input"
                        placeholder="Email address"
                    />
                </div>

                {/* Submit Button */}
                <button className="fp-button">Reset my password</button>

                {/* Footer Link */}
                <p className="fp-footer">
                    Don’t have a Savlo account yet?{" "}
                    <span className="fp-link">Sign Up</span>
                </p>
            </div>
        </div>
    );
}
