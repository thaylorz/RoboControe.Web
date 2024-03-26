"use-client";

import Link from 'next/link'
import React from 'react'
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { auth, signOut } = useAuth();

    return (
        <nav className='bg-[#333] text-white p-5'>
            <div className="container mx-auto">
                <div className='flex justify-between items-center'>
                    <div><Link href="/">Robo controle</Link></div>
                    <ul className='flex'>
                        {auth?.userId
                            ? (
                                <li className='mx-3'><a onClick={signOut} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Sign out</a></li>
                            )
                            : (
                                <>
                                    <li className='mx-3'><Link href="/login">Sign In</Link></li>
                                    <li className='mx-3'><Link href="/register">Sign up</Link></li>
                                </>
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
