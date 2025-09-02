import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const { login, loading, error } = useLogin();

    const validate = () => {
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('Please, enter a valid email.');
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (password.trim().length < 6) {
            setPasswordError('The password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await login(email, password);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/bg.png')" }}
        >
            <div className="bg-white rounded-2xl shadow-lg p-10 w-[320px] text-center">
                <h1 className="text-3xl font-bold mb-8">
                    Decor<span className="text-yellow-400">AR</span>
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            className={`w-full border-b p-2 outline-none placeholder-gray-400 ${emailError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`w-full border-b p-2 outline-none placeholder-gray-400 ${passwordError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-black text-white py-2 rounded-full hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
