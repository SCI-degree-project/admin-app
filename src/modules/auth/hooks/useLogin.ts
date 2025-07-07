import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/authService';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { user, token } = await loginWithEmail(email, password);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/products');
            return user;
        } catch (err: any) {
            if (
                err.message?.includes('auth/invalid-credential') ||
                err.message?.includes('auth/wrong-password') ||
                err.message?.includes('auth/user-not-found') ||
                err.message?.includes('Invalid email or password')
            ) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
