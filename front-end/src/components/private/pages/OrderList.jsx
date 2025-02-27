import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { useAuth } from '../../context/ContextDetals';
import { getOrderListUsingHotelId, updateOrderUsingOrderId } from '../../../auth/service';
import toast from 'react-hot-toast';

export default function OrderListt() {
    const { user } = useAuth();
    const [allOrderBasedOnHotelId, setAllOrderBasedOnHotelId] = useState([]);
    const [editableOrderId, setEditableOrderId] = useState(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user?.userRole === 'Admin') {
            async function getAllData(hotelId) {
                await getOrderListUsingHotelId(hotelId)
                    .then((resp) => {
                        setAllOrderBasedOnHotelId(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            getAllData(user?.userId);
        }
    }, [user, isLoading]);

    const handleEditClick = (order) => {
        setEditableOrderId(order._id);
        setStatus(order.receive); // Set the current status for editing
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSave = async (orderId) => {
        // Here, you would typically send the updated status to your API
        setIsLoading(true)
        try {
            const resp = await updateOrderUsingOrderId(orderId, status);
            console.log(resp);

            toast.success(resp)
        } catch (error) {
            toast.error('Update status error')
        }
        setEditableOrderId(null); // Reset editable order ID
        setIsLoading(false)
    };

    return (
        <PrivateMainPage>
            <div className="overflow-x-auto my-5 mr-10">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600">
                            <th className="py-2 px-3 border-b">User ID</th>
                            <th className="py-2 px-3 border-b">Item Name</th>
                            <th className="py-2 px-3 border-b">Quantity</th>
                            <th className="py-2 px-3 border-b">Payment Method</th>
                            <th className="py-2 px-3 border-b">Address</th>
                            <th className="py-2 px-3 border-b">Status</th>
                            <th className="py-2 px-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrderBasedOnHotelId.length > 0 ? (
                            allOrderBasedOnHotelId.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-3 border-b">{order.userId}</td>
                                    <td className="py-2 px-3 border-b">{order.itemName}</td>
                                    <td className="py-2 px-3 border-b">{order.quantity}</td>
                                    <td className="py-2 px-3 border-b">{order.paymentMethod}</td>
                                    <td className="py-2 px-3 border-b">{order.address}</td>
                                    <td className="py-2 px-3 border-b">
                                        {editableOrderId === order._id ? (
                                            <select
                                                value={status}
                                                onChange={handleStatusChange}
                                                className="border border-gray-300 rounded p-1"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="On the way">On the way</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            order.receive
                                        )}
                                    </td>
                                    <td className="py-2 px-3 border-b cursor-pointer">
                                        {editableOrderId === order._id ? (
                                            <button
                                                onClick={() => handleSave(order._id)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(order)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="border border-gray-300 p-2 text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </PrivateMainPage>
    );
}
