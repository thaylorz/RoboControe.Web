'use client'

import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedAuth = localStorage.getItem('auth');
            return storedAuth ? JSON.parse(storedAuth) : {};
        } else {
            return {};
        }
    });

    const router = useRouter();

    const signOut = () => {
        setAuth({});
        localStorage.removeItem('auth');
        router.push('/login');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth', JSON.stringify(auth));
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;