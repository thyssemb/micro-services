import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Profile from './components/profile/profile.jsx';
import Tchat from './components/tchat/tchat.jsx';
import ProtectedRoute from './components/security/protectedRoute.jsx';

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Router>
                <div className="bg-[#18181b] min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tchat"
                            element={
                                <ProtectedRoute>
                                    <Tchat />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
