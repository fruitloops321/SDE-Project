import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/login.css";
import api from "../utils/api.jsx";

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await api.post("/auth/login", {
                username: username,
                password: pw,
            });

            const isAuthenticated = response.data === true;

            if (isAuthenticated) {
                localStorage.setItem("username", username);
                onLogin?.();
                navigate("/dashboard");
            } else {
                setError("Invalid username or password.");
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="aurora-wrapper">
                <div className="aurora"></div>
            </div>

            <div className="login-content">
                <div className="login-panel">
                    <div className="login-header">
                        <div className="login-title">Welcome to Savlo</div>
                        <div className="login-subtitle">
                            Please enter your username and password to login
                        </div>
                    </div>

                    {/* Floating inputs */}
                    <div className="floating-group">
                        <input
                            className="floating-input"
                            type="username"
                            value={username}
                            placeholder=" "
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="floating-label">Username</label>
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


                    {/* Error text */}
                    {error && <div className="login-error">{error}</div>}

                    {/* Login button */}
                    <button
                        className="login-button"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="login-footer">
                        New to Savlo? <a>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
