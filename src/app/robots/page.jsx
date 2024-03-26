'use client';

import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Dashboard() {
    const [robots, setRobots] = useState([]);
    const [newRobotName, setNewRobotName] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()


    useEffect(() => {
        const controller = new AbortController();

        const listRobots = async function() {
            try {
                const response = await axiosPrivate.get('/robots',
                    { signal: controller.signal }
                );
                setRobots(response.data);
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

        listRobots();
    }, []);

    const handleAddRobot = async () => {
        try {
            const response = await axiosPrivate.post('/robots', {
                name: newRobotName
            });
            setRobots([...robots, response.data]);
            setNewRobotName('');
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

    const handleViewRobot = (id) => {
        router.push(`/robots/${id}`);
    }

    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <h3 className='text-3x1 my-3'>Meus robôs</h3>
                <hr className='my-3' />
                <div className="flex items-center justify-between py-2">
                    <input
                        value={newRobotName}
                        onChange={(e) => setNewRobotName(e.target.value)}
                        className='block bg-gray-300 p-2 my-2 rounded-md '
                        placeholder="Nome do robô"
                        type="text"
                        name="newRobotName"
                    />
                    <button onClick={handleAddRobot} className='bg-green-500 p-2 rounded-md text-white'>Adicionar</button>
                </div>
                <ul>
                    {robots.map(robot => (
                        <li key={robot.robotId} className="flex items-center justify-between py-2">
                            <Link href={`/robots/${robot.robotId}`}>{robot.name}</Link>
                            <div>
                                <button onClick={() => handleViewRobot(robot.robotId)} className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard
