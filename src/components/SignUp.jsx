import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaUserPlus, FaCheck } from 'react-icons/fa';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp, googleSignIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account');
            console.error(err);
        }
        setLoading(false);
    }

    async function handleGoogleSignIn(e) {
        e.preventDefault();
        try {
            setError('');
            await googleSignIn();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign in with Google');
            console.error(err);
        }
    }

    // If user is already logged in, don't show signup page
    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
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

            {/* Existing signup form content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200 p-10 space-y-8 animate-float">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6 shadow-lg">
                            <FaUserPlus className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Create Your Account
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Start your professional journey
                        </p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative flex items-center">
                            <FaCheck className="mr-2 text-red-500" />
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Email address"
                            />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Password"
                            />
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Confirm Password"
                            />
                        </div>

                        <div className="flex items-center">
                            <FaCheck className="mr-2 text-green-500" />
                            <span className="text-sm text-gray-600">
                                By signing up, you agree to our Terms of Service
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full flex items-center justify-center py-3 px-6 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <FcGoogle className="mr-3 text-2xl" />
                            Sign up with Google
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
