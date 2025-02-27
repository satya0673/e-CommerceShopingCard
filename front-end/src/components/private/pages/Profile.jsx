import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { useAuth } from '../../context/ContextDetals';
import { getUserUsingUserId } from '../../../auth/service';
import toast from 'react-hot-toast';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }

        async function getData(userId) {
            try {
                const data = await getUserUsingUserId(userId);
                setUserData(data?.user); // Update the state with the user data
            } catch (error) {
                toast.error('Something went wrong');
            }
        }

        getData(user?.userId);
    }, [user]);

    return (
        <PrivateMainPage>
            {userData ? (
                <div className="max-w-4xl mx-auto my-5 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Profile</h1>

                    {/* Profile Image Section */}
                    <div className="flex items-center justify-center mb-6">
                        <img
                            src={userData.profileImageUrl || 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'} // Replace with actual image URL or a default image
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">User Information</h2>
                            <p className="text-gray-600"><strong>Name:</strong> {userData.userName}</p>
                            <p className="text-gray-600"><strong>Email:</strong> {userData.userEmail}</p>
                            <p className="text-gray-600"><strong>Phone Number:</strong> {userData.userPhNo}</p>
                            <p className="text-gray-600"><strong>Role:</strong> {userData.userRole}</p>
                        </div>

                        {
                            userData.hotelName && (
                                <div className="bg-gray-100 p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Hotel Information</h3>
                                    <p className="text-gray-600"><strong>Hotel Name:</strong> {userData.hotelName}</p>
                                    <p className="text-gray-600"><strong>Hotel Address:</strong> {userData.hotelAddress}</p>
                                </div>
                            )
                        }


                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Details</h3>
                        <p className="text-gray-600"><strong>Account Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
                        <p className="text-gray-600"><strong>Last Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-700">Loading...</p>
            )}
        </PrivateMainPage>
    );
}
