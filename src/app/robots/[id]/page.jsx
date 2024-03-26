'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function RobotDetails({ params: { id } }) {
    const [robotName, setRobotName] = useState('');
    const [headInclination, setHeadInclination] = useState(2);
    const [headRotation, setHeadRotation] = useState(3);
    const [rightElbow, setRightElbow] = useState(1);
    const [rightWrist, setRightWrist] = useState(3);
    const [leftElbow, setLeftElbow] = useState(1);
    const [leftWrist, setLeftWrist] = useState(3);

    const axiosPrivate = useAxiosPrivate();
    const router = useRouter()

    const SIDE = {
        "Right": 1,
        "Left": 2,
    }

    useEffect(() => {
        const fetchRobotData = async () => {
            try {
                const response = await axiosPrivate.get(`/robots/${id}`, { withCredentials: true });
                const { name, headInclination, headRotation, leftElbowRotation, leftWristRotation, rightElbowRotation, rigthWristRotation } = response.data;

                setRobotName(name);
                setHeadInclination(headInclination);
                setHeadRotation(headRotation);
                setRightElbow(rightElbowRotation);
                setRightWrist(rigthWristRotation);
                setLeftElbow(leftElbowRotation);
                setLeftWrist(leftWristRotation);
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
        };

        fetchRobotData();
    }, [axiosPrivate, id]);

    const handleSelectheadInclinationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeHeadInclination`,
                JSON.stringify({ Inclination: value }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setHeadInclination(value);
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

    const handleSelectheadRotationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeHeadRotation`,
                JSON.stringify({ Rotation: value }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setHeadRotation(value);
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

    const handleSelectRightElbowRotationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeElbowRotation`,
                JSON.stringify({ Rotation: value, Side: SIDE.Right }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setRightElbow(value);
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

    const handleSelectLeftElbowRotationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeElbowRotation`,
                JSON.stringify({ Rotation: value, Side: SIDE.Left }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setLeftElbow(value);
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

    const handleSelectRightWristRotationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeWristRotation`,
                JSON.stringify({ Rotation: value, Side: SIDE.Right }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setRightWrist(value);
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

    const handleSelectLeftWristRotationChange = async (value, field) => {
        try {
            const response = await axiosPrivate.put(`/robots/${id}/ChangeWristRotation`,
                JSON.stringify({ Rotation: value, Side: SIDE.Left }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setLeftWrist(value);
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
            <div className='container mx-auto'>
                <h3 className='text-3x1 my-3'>{robotName}</h3>
                <FiArrowLeft className="mr-2 cursor-pointer" onClick={() => router.back()} />
                <hr className='my-3' />
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="headInclination">Inclinação da cabeça:</label>
                            <select
                                id="headInclination"
                                value={headInclination}
                                typeof='number'
                                onChange={(e) => handleSelectheadInclinationChange(parseInt(e.target.value), 'headInclination')}
                            >
                                <option value="1">Para cima</option>
                                <option value="2">Em repouso</option>
                                <option value="3">Para baixo</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="headRotation">Rotação da cabeça:</label>
                            <select
                                id="headRotation"
                                value={headRotation}
                                onChange={(e) => handleSelectheadRotationChange(parseInt(e.target.value), 'headRotation')}
                            >
                                <option value="1">Rotação para -90º</option>
                                <option value="2">Rotação para -45º</option>
                                <option value="3">Em repouso</option>
                                <option value="4">Rotação para 45º</option>
                                <option value="5">Rotação para 90º</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="RightElbowRotation">Rotação do braço direito:</label>
                            <select
                                id="RightElbowRotation"
                                value={rightElbow}
                                onChange={(e) => handleSelectRightElbowRotationChange(parseInt(e.target.value), 'RightElbowRotation')}
                            >
                                <option value="1">Em repouso</option>
                                <option value="2">Levemente contraído</option>
                                <option value="3">Contraído</option>
                                <option value="4">Fortemente contraído</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="LeftElbowRotation">Rotação do braço esquerdo:</label>
                            <select
                                id="LeftElbowRotation"
                                value={leftElbow}
                                onChange={(e) => handleSelectLeftElbowRotationChange(parseInt(e.target.value), 'LeftElbowRotation')}
                            >
                                <option value="1">Em repouso</option>
                                <option value="2">Levemente contraído</option>
                                <option value="3">Contraído</option>
                                <option value="4">Fortemente contraído</option>
                            </select>
                        </div >
                        <div>
                            <label htmlFor="RightWristRotation">Rotação do pulso direito:</label>
                            <select
                                id="RightWristRotation"
                                value={rightWrist}
                                onChange={(e) => handleSelectRightWristRotationChange(parseInt(e.target.value), 'RightWristRotation')}
                            >
                                <option value="1">Rotação para -90º</option>
                                <option value="2">Rotação para -45º</option>
                                <option value="3">Em repouso</option>
                                <option value="4">Rotação para 45º</option>
                                <option value="5">Rotação para 90º</option>
                                <option value="6">Rotação para 135º</option>
                                <option value="7">Rotação para 180º</option>
                            </select>
                        </div >
                        <div>
                            <label htmlFor="LeftWristRotation">Rotação do pulso esquerdo:</label>
                            <select
                                id="LeftWristRotation"
                                value={leftWrist}
                                onChange={(e) => handleSelectLeftWristRotationChange(parseInt(e.target.value), 'LeftWristRotation')}
                            >
                                <option value="1">Rotação para -90º</option>
                                <option value="2">Rotação para -45º</option>
                                <option value="3">Em repouso</option>
                                <option value="4">Rotação para 45º</option>
                                <option value="5">Rotação para 90º</option>
                                <option value="6">Rotação para 135º</option>
                                <option value="7">Rotação para 180º</option>
                            </select>
                        </div >
                    </div >
                </form >
            </div >
        </div >
    );
}

export default RobotDetails
