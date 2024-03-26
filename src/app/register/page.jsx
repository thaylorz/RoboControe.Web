'use client';

import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import axios from '../api/axios';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const REGISTER_URL = '/users/register';

function RegisterPage() {
    const userRef = useRef();
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName, lastName, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            router.push('/login');
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
                <h3>Register</h3>
                <hr className='my-3' />
                <form onSubmit={handleSubmit}>
                    {error && <div className='bg-red-500 text-white p-2 my-2 rounded-md'>{error}</div>}

                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        ref={userRef}
                        required
                        className='block bg-gray-300 p-2 my-2 rounded-md'
                        placeholder='First name'
                        type="text"
                        name="name"
                        id="name"
                    />

                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className='block bg-gray-300 p-2 my-2 rounded-md'
                        placeholder='Last name'
                        type="text"
                        name="lastName"
                        id="lastName"
                    />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='block bg-gray-300 p-2 my-2 rounded-md '
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='block bg-gray-300 p-2 my-2 rounded-md '
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                    />

                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='block bg-gray-300 p-2 my-2 rounded-md '
                        placeholder="Conform your password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />

                    <button
                        type="submit"
                        className='bg-green-500 p-2 rounded-md text-white'>
                        Register
                    </button>
                </form>
                <hr className='my-3' />
                <div>
                    <p>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Sign in</a></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
