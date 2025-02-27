import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im'
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { loginUser } from '../auth/service';
import { dologin } from '../auth/localstroage';
import { useAuth } from './context/ContextDetals';
import toast from 'react-hot-toast';

export default function LoginPage() {

    const [userData, setUserData] = useState({
        "userEmail": "",
        "userPass": ""
    });


    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false)


    const userDataHandel = (event) => {

        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const userLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        await loginUser(userData).then((resp) => {

            dologin(resp, () => {
                // Persist user data in the context as well
                setUser({
                    userId: resp?.user,       // Store the user data
                    userRole: resp?.userRole  // Store the user role data
                });

                // Navigate based on the role
                let redirectPath;
                switch (resp?.userRole) {
                    case 'Admin':
                        redirectPath = '/private/admin/dashboard';
                        break;
                    case 'User':
                        redirectPath = '/private/user/dashboard';
                        break;
                    default:
                        redirectPath = '/';
                        break;
                }
                navigate(redirectPath);
            });
        }).catch((err) => {
            if (err.message === 'Network Error') {
                toast.error("Server Problem");
            } else if (err.response.status === 404) {
                toast.error(err.response.data.msg);
            } else {
                toast.error("Something went wrong");
            }
        });

        setIsLoading(false);
    };



    return (
        <>
            <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('./assets/login.jpg')]">
                <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>

                    <form onSubmit={userLogin}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="userEmail" className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
                            <input
                                type="email"
                                id="userEmail"
                                name="userEmail"
                                value={userData.userEmail}
                                onChange={userDataHandel}
                                className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="userPass" className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
                            <div className="flex items-center border rounded-md">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    id="userPass"
                                    name="userPass"
                                    value={userData.userPass}
                                    onChange={userDataHandel}
                                    className="w-full px-2 py-2 focus:outline-none"
                                    placeholder="Enter your password"
                                    required
                                />
                                <div className="px-2 cursor-pointer" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <AiFillEyeInvisible className="text-xl" /> : <BsEyeFill className="text-xl" />}
                                </div>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                            >
                                {isLoading ? <ImSpinner9 className="animate-spin text-2xl" /> : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm">Create account? <Link to="/createAccount" className="text-blue-500">Sign Up</Link></p>
                    </div>
                </div>
            </div>

        </>
    )
}
