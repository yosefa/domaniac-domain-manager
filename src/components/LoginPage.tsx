import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
    onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationEnabled, setRegistrationEnabled] = useState(false);

    useEffect(() => {
        // Fetch settings to check if registration is enabled
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => setRegistrationEnabled(data.registrationEnabled))
            .catch(() => setRegistrationEnabled(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <i className="fas fa-network-wired text-white text-xl"></i>
                        </div>
                        <span className="font-bold text-3xl tracking-tight text-white">Domaniac</span>
                    </div>
                    <p className="text-gray-400 text-sm">Sign in to manage your domains</p>
                </div>

                {/* Login Form */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                                <i className="fas fa-exclamation-circle"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <i className="fas fa-envelope absolute left-4 top-3.5 text-gray-500"></i>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <i className="fas fa-lock absolute left-4 top-3.5 text-gray-500"></i>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt"></i>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {registrationEnabled && (
                        <div className="mt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{' '}
                                <button
                                    onClick={onSwitchToRegister}
                                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    Create one
                                </button>
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    Secure domain management powered by Cloudflare
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
