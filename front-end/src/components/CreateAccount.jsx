import React, { useState } from 'react';
import { createUser } from '../auth/service';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPass: '',
        userPhNo: '',
        userRole: 'User', // Default to "User"
        hotelName: '',
        hotelAddress: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createUser(formData).then((resp) => {

            toast.success(resp.msg)

        }).catch((err) => {
            if (err?.status === 409 || err?.status === '409') {
                toast.error(err?.response?.data?.msg)
            } else {
                toast.error("Something wrong")
            }

        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('./assets/registration.jpg')] bg-cover bg-center">
            <form
                className="bg-white p-8 shadow-md rounded-lg w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">User Form</h2>

                {/* Username Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                        Username
                    </label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your username"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                        Email
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPass">
                        Password
                    </label>
                    <input
                        type="password"
                        name="userPass"
                        value={formData.userPass}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPhNo">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="userPhNo"
                        value={formData.userPhNo}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* User Role Dropdown */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userRole">
                        User Role
                    </label>
                    <select
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleChange}
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {
                    formData.userRole === 'Admin' && (
                        <>
                            {/* Hotel Name Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hotelName">
                                    Hotel Name
                                </label>
                                <input
                                    type="text"
                                    name="hotelName"
                                    value={formData.hotelName}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Hotel Name"
                                />
                            </div>

                            {/* Hotel Address Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hotelAddress">
                                    Hotel Address
                                </label>
                                <input
                                    type="text"
                                    name="hotelAddress"
                                    value={formData.hotelAddress}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Hotel Address"
                                />
                            </div>
                        </>
                    )
                }

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm">Don't have an account? <Link to="/" className="text-blue-500">Sign In</Link></p>
                </div>
            </form>
        </div>

    );
};

