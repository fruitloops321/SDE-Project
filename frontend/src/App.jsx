// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// PAGES
import Dashboard from './pages/Dashboard.jsx';
import {LoginPage} from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import FPSuccessful from './pages/FPSucessful.jsx';
import RecommendPage from './pages/RecommendPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import Saved from './pages/Saved.jsx';

import './index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Routes>

                {/* Default PATH → Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<LoginPage onLogin={handleLoginSuccess} />}
                />

                {/* SIGNUP */}
                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                {/* FORGET PASSWORD */}
                <Route
                    path="/forgot-password"
                    element={<ForgetPassword />}
                />

                {/* RESET SUCCESS PAGE */}
                <Route
                    path="/forgot-password/success"
                    element={<FPSuccessful />}
                />

                {/* PROTECTED Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated
                            ? <Dashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* EXTRA PAGES & ROUTES */}
                <Route path="/recommended" element={<RecommendPage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="/saved" element={<Saved />} />

                {/* CATCH-ALL → LOGIN */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
