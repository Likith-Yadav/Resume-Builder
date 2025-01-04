import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    FaChartLine, 
    FaSignOutAlt,
    FaFileAlt, 
    FaEnvelope, 
    FaClipboardList,
    FaChartPie,
    FaBullseye,
    FaLightbulb 
} from 'react-icons/fa';

export default function Dashboard() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const dashboardCards = [
        {
            title: 'Resume Templates',
            description: 'Explore professional resume designs',
            icon: <FaFileAlt className="text-blue-600 text-4xl" />,
            link: '/create-resume',
            bgGradient: 'from-blue-400 to-indigo-500',
            color: 'blue'
        },
        {
            title: 'Cover Letter Wizard',
            description: 'Craft compelling cover letters',
            icon: <FaEnvelope className="text-purple-600 text-4xl" />,
            link: '/create-cover-letter',
            bgGradient: 'from-purple-400 to-pink-500',
            color: 'purple'
        },
        {
            title: 'Career Insights',
            description: 'Personalized career growth tips',
            icon: <FaChartPie className="text-green-600 text-4xl" />,
            link: '/career-insights',
            bgGradient: 'from-green-400 to-teal-500',
            color: 'green'
        },
        {
            title: 'Goal Tracking',
            description: 'Set and monitor career goals',
            icon: <FaBullseye className="text-red-600 text-4xl" />,
            link: '/goal-tracking',
            bgGradient: 'from-red-400 to-orange-500',
            color: 'red'
        }
    ];

    const quickTips = [
        {
            icon: <FaLightbulb className="text-yellow-500 text-2xl mr-3" />,
            tip: 'Tailor your resume to each job application for better results.'
        },
        {
            icon: <FaClipboardList className="text-green-500 text-2xl mr-3" />,
            tip: 'Highlight your achievements with quantifiable metrics.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute top-0 right-0 w-[500px] h-[500px] 
                    bg-gradient-to-bl from-blue-400/10 via-indigo-500/10 to-purple-600/10 
                    rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"
                />
                <div 
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] 
                    bg-gradient-to-tr from-purple-400/10 via-pink-500/10 to-blue-600/10 
                    rounded-full blur-3xl opacity-40 transform -translate-x-1/2 translate-y-1/2"
                />
            </div>

            {/* Dashboard Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Logout */}
                <div className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                            <FaChartLine className="mr-4 text-indigo-600" />
                            Dashboard
                        </h1>
                        <p className="mt-2 text-xl text-gray-600">Welcome, {user?.email?.split('@')[0] || 'Professional'}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-300 bg-white rounded-md group-hover:bg-opacity-0 flex items-center">
                            <FaSignOutAlt className="mr-2 group-hover:text-white" />
                            Logout
                        </span>
                    </button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {dashboardCards.map((card, index) => (
                        <Link 
                            to={card.link} 
                            key={index}
                            className="block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div 
                                className={`bg-gradient-to-r ${card.bgGradient} text-white rounded-3xl p-6 relative overflow-hidden shadow-xl h-full flex flex-col justify-between`}
                            >
                                <div className="absolute top-0 right-0 opacity-10 text-9xl">
                                    {card.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-xl font-bold mb-2">{card.title}</div>
                                    <p className="text-white/80 text-sm">{card.description}</p>
                                </div>
                                <div className="mt-4 self-start">
                                    <div className="inline-flex items-center text-sm font-medium bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all">
                                        Explore
                                        <svg 
                                            className="ml-2 w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Career Tips */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Career Growth Tips</h2>
                    {quickTips.map((tip, index) => (
                        <div 
                            key={index} 
                            className="flex items-center bg-gray-100 rounded-xl p-4 mb-4 transform transition-all hover:scale-[1.02]"
                        >
                            {tip.icon}
                            <p className="text-gray-700">{tip.tip}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
