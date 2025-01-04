import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import CreateCoverLetter from './pages/CreateCoverLetter';
import CareerInsights from './pages/CareerInsights';
import GoalTracking from './pages/GoalTracking';
import Landing from './pages/Landing';
import './App.css';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <PublicRoute>
                                <Landing />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/signup" 
                        element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        } 
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <Dashboard />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-resume"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <CreateResume />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-cover-letter"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <CreateCoverLetter />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/career-insights"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <CareerInsights />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/goal-tracking"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Navbar />
                                    <GoalTracking />
                                </>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;