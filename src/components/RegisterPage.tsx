import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterPageProps {
    onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin }) => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getPasswordStrength = (pass: string): { strength: number; label: string; color: string } => {
        if (pass.length === 0) return { strength: 0, label: '', color: '' };
        if (pass.length < 8) return { strength: 25, label: 'Weak', color: 'bg-red-500' };

        let strength = 25;
        if (pass.length >= 12) strength += 25;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 25;
        if (/[0-9]/.test(pass)) strength += 12.5;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 12.5;

        if (strength <= 25) return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 50) return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 75) return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);

        try {
            await register(email, password);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <i className="fas fa-network-wired text-white text-xl"></i>
                        </div>
                        <span className="font-bold text-3xl tracking-tight text-white">Domaniac</span>
                    </div>
                    <p className="text-gray-400 text-sm">Create your account to get started</p>
                </div>

                {/* Register Form */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-400">Password strength</span>
                                        <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all ${passwordStrength.color}`}
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <i className="fas fa-lock absolute left-4 top-3.5 text-gray-500"></i>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus"></i>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    Secure domain management powered by Cloudflare
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
