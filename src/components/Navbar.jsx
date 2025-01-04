import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    FaHome, 
    FaChartLine, 
    FaFileAlt, 
    FaEnvelope 
} from 'react-icons/fa';

export default function Navbar() {
    const { user } = useAuth();
    const location = useLocation();

    // Hide navbar on login and signup pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    const navItems = [
        { 
            icon: <FaChartLine className="mr-2" />, 
            text: 'Dashboard', 
            link: '/dashboard' 
        },
        { 
            icon: <FaFileAlt className="mr-2" />, 
            text: 'Create Resume', 
            link: '/create-resume' 
        },
        { 
            icon: <FaEnvelope className="mr-2" />, 
            text: 'Create Cover Letter', 
            link: '/create-cover-letter' 
        }
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white font-bold text-xl flex items-center">
                            <FaFileAlt className="mr-3 text-white" />
                            Resume Builder
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        {user ? (
                            navItems.map((item, index) => (
                                <Link 
                                    key={index} 
                                    to={item.link} 
                                    className={`text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 ${
                                        location.pathname === item.link 
                                            ? 'bg-white/20 shadow-md' 
                                            : ''
                                    }`}
                                >
                                    {item.icon}
                                    {item.text}
                                </Link>
                            ))
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
