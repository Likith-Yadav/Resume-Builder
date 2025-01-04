import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaRegEnvelope, FaRocket, FaUserTie, FaCheck, FaMagic, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { BiCustomize } from 'react-icons/bi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { MdSecurity } from 'react-icons/md';

const Landing = () => {
    const features = [
        {
            icon: FaRegFileAlt,
            title: "ATS-Friendly Templates",
            description: "Professionally designed templates that pass Applicant Tracking Systems."
        },
        {
            icon: FaMagic,
            title: "AI-Powered Writing",
            description: "Smart suggestions to enhance your content and highlight key achievements."
        },
        {
            icon: BiCustomize,
            title: "Easy Customization",
            description: "Intuitive drag-and-drop interface for perfect resume formatting."
        },
        {
            icon: FaRegEnvelope,
            title: "Cover Letter Builder",
            description: "Match your resume with compelling cover letters that stand out."
        },
        {
            icon: MdSecurity,
            title: "Privacy First",
            description: "Your data is encrypted and secure. Download anytime, delete anytime."
        },
        {
            icon: AiOutlineThunderbolt,
            title: "Quick Export",
            description: "Export to PDF, Word, or plain text in seconds, ready to apply."
        }
    ];

    const benefits = [
        "Increased interview chances with ATS-optimized formats",
        "Save hours with smart content suggestions",
        "Professional templates designed by HR experts",
        "Real-time preview as you type",
        "Multiple format export options",
        "24/7 customer support"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative">
            {/* Subtle Corner Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right Gradient */}
                <div 
                    className="absolute top-0 right-0 w-[500px] h-[500px] 
                    bg-gradient-to-bl from-blue-400/10 via-indigo-500/10 to-purple-600/10 
                    rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"
                />

                {/* Bottom Left Gradient */}
                <div 
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] 
                    bg-gradient-to-tr from-purple-400/10 via-pink-500/10 to-blue-600/10 
                    rounded-full blur-3xl opacity-40 transform -translate-x-1/2 translate-y-1/2"
                />

                {/* Optional: Smaller Accent Gradients */}
                <div 
                    className="absolute top-1/4 left-1/4 w-[300px] h-[300px] 
                    bg-gradient-to-br from-blue-300/5 to-indigo-400/5 
                    rounded-full blur-2xl opacity-30"
                />

                <div 
                    className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] 
                    bg-gradient-to-tl from-purple-300/5 to-pink-400/5 
                    rounded-full blur-2xl opacity-20"
                />
            </div>

            {/* Ultra Vibrant Glowing Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Intense Glowing Gradient Circles */}
                <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] 
                    bg-gradient-to-br from-blue-500/30 via-purple-600/30 to-pink-500/30 
                    rounded-full animate-pulse-slow blur-3xl" />
                
                <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] 
                    bg-gradient-to-tr from-indigo-500/30 via-blue-600/30 to-purple-500/30 
                    rounded-full animate-pulse-slow-reverse blur-3xl" />
                
                {/* Dynamic Floating Gradient Shapes */}
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] 
                    bg-gradient-to-tl from-blue-400/20 via-indigo-500/20 to-purple-600/20 
                    rounded-full animate-float-slow opacity-80 blur-2xl" />
                
                <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] 
                    bg-gradient-to-br from-purple-500/20 via-pink-600/20 to-blue-400/20 
                    rounded-full animate-float-slow-reverse opacity-80 blur-2xl" />
                
                {/* Vibrant Glowing Lines */}
                <div className="absolute top-0 left-0 w-full h-2 
                    bg-gradient-to-r from-blue-500/50 via-purple-600/50 to-pink-500/50 
                    animate-shimmer" />
                
                <div className="absolute bottom-0 right-0 w-full h-2 
                    bg-gradient-to-l from-indigo-500/50 via-blue-600/50 to-purple-500/50 
                    animate-shimmer-reverse" />
                
                {/* Additional Sparkling Elements */}
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute bg-white/30 rounded-full animate-ping"
                        style={{
                            width: `${Math.random() * 10 + 2}px`,
                            height: `${Math.random() * 10 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Content with z-index to appear above background */}
            <div className="relative z-10">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                </div>

                {/* Add custom animations to Tailwind CSS */}
                <style jsx>{`
                    @keyframes pulse-slow {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes shimmer {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 0.8; }
                    }
                `}</style>

                {/* Hero Section */}
                <div className="relative">
                    <div className="container mx-auto px-4 pt-24 pb-20">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-block animate-float">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-600 text-sm font-medium mb-6">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                                    Professional Resume Builder
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                                Create Your Perfect
                                <span className="relative">
                                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent px-4">
                                        Resume
                                    </span>
                                    <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-200/30 -z-10 transform -rotate-1"></span>
                                </span>
                                in Minutes
                            </h1>
                            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Professional templates, AI-powered content suggestions, and expert guidance 
                                to help you <span className="text-blue-600 font-semibold">land your dream job faster</span>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                                <Link 
                                    to="/signup" 
                                    className="group inline-flex items-center px-8 py-4 text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <FaRocket className="mr-2 transform group-hover:rotate-12 transition-transform" />
                                    Get Started Free
                                </Link>
                                <Link 
                                    to="/login" 
                                    className="group inline-flex items-center px-8 py-4 text-lg text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <FaUserTie className="mr-2 transform group-hover:rotate-12 transition-transform" />
                                    Sign In
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                                {['Free Templates', 'No Credit Card', 'Cancel Anytime'].map((item, index) => (
                                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <FaCheck className="text-green-500 mr-2" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="relative">
                    <div className="container mx-auto px-4 py-20">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Everything You Need for the Perfect Resume
                            </h2>
                            <p className="text-xl text-gray-600">
                                Our comprehensive tools and features make resume building a breeze
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                >
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-bl-full opacity-50 -mr-16 -mt-16 transition-transform duration-300 group-hover:scale-110" />
                                    
                                    {/* Icon */}
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6 transform transition-transform group-hover:-rotate-6">
                                            {React.createElement(feature.icon, { className: "w-8 h-8" })}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 w-0 group-hover:w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="relative">
                    <div className="container mx-auto px-4 py-20">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                            
                            <div className="relative grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                        Why Choose Our Resume Builder?
                                    </h2>
                                    <div className="space-y-4">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center">
                                                <FaCheck className="text-green-400 mr-3 text-xl" />
                                                <span className="text-white text-lg">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10">
                                        <Link 
                                            to="/signup" 
                                            className="inline-flex items-center px-8 py-3 text-lg text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            Start Building Now
                                            <FaRocket className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                                        <div className="space-y-6">
                                            <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md">
                                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                    <FaCheck className="text-blue-600 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">ATS Optimization</h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Ensure your resume passes automated screening systems
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md">
                                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                                    <FaRocket className="text-green-600 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">AI-Powered Suggestions</h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Get intelligent recommendations to improve your resume
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-md">
                                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                                    <BiCustomize className="text-purple-600 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Easy Customization</h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Drag-and-drop interface for seamless editing
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pl-20">
                            <div className="col-span-1">
                                <h4 className="text-xl font-semibold mb-6">Get Started</h4>
                                <Link to="/login" className="block mb-2 text-gray-400 hover:text-white transition">Login</Link>
                                <Link to="/create-resume" className="block mb-2 text-gray-400 hover:text-white transition">Create Resume</Link>
                                <Link to="/create-cover-letter" className="block mb-2 text-gray-400 hover:text-white transition">Create Cover Letter</Link>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-xl font-semibold mb-6">Features</h4>
                                <Link to="/dashboard" className="block mb-2 text-gray-400 hover:text-white transition">Dashboard</Link>
                                <a href="#" className="block mb-2 text-gray-400 hover:text-white transition">Resume Templates</a>
                                <a href="#" className="block mb-2 text-gray-400 hover:text-white transition">Goal Tracking</a>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-xl font-semibold mb-6">Resources</h4>
                                <a href="#" className="block mb-2 text-gray-400 hover:text-white transition">Career Advice</a>
                                <a href="#" className="block mb-2 text-gray-400 hover:text-white transition">Help Center</a>
                                <a href="#" className="block mb-2 text-gray-400 hover:text-white transition">Blog</a>
                            </div>
                            <div className="col-span-1">
                                <h4 className="text-xl font-semibold mb-6">Connect</h4>
                                <div className="flex space-x-4 mt-4">
                                    <a 
                                        href="https://github.com/Likith-Yadav" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                                    >
                                        <FaGithub className="w-6 h-6" />
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/likithyadavgn" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                                    >
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-gray-400 mt-8 pt-6 border-t border-gray-700">
                            <p>Made with ❤️ by Likith Yadav</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Landing;