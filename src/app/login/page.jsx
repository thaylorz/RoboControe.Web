'use client';

import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const LOGIN_URL = '/users/login';

function LoginPage() {
    const { setAuth } = useAuth();

    const router = useRouter()
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }), {
                headers: { 'Content-Type': 'application/json' },
            });

            const accessToken = response?.data?.token;
            const userId = response?.data?.userId;
            const userEmail = response?.data?.email;

            setAuth({ userId, password, userEmail, accessToken });
            setEmail('');
            setPassword('');

            router.push('/robots');
        } catch (error) {
            if (typeof error.response.data.errors === 'object') {
                const { errors } = error.response.data;

                Object.keys(errors).forEach(key => {
                    errors[key].forEach(errorMessage => {
                        toast.error(`${key}: ${errorMessage}`);
                    });
                });
                return;
            }

            if (typeof error.response.data === 'object') {
                toast.error(`${error.response.data.title}`);
                return;
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='container max-auto py-5'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h3>Entrar</h3>
                <hr className='my-3' />
                <form onSubmit={handleSubmit}>
                    <input required value={email} ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md ' placeholder="Email" type="email" name="email" id="email" />
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md ' placeholder="Senha" type="password" name="password" id="password" />
                    <button type="submit" className='bg-green-500 p-2 rounded-md text-white'>Entrar</button>
                </form>
                <hr className='my-3' />
                <div>
                    <p>Não tem uma conta? <a href="/register" className='text-blue-500 hover:underline'>registre-se</a></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
