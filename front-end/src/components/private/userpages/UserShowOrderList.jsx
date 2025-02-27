import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { useAuth } from '../../context/ContextDetals';
import toast from 'react-hot-toast';
import { getOrderListUsingUserId, updateOrderUsingOrderId } from '../../../auth/service'; // Make sure you have the updateOrderUsingOrderId function

export default function UserShowOrderList() {
  const { user } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null); // Track which order is being edited
  const [newStatus, setNewStatus] = useState(''); // Store new status for the order

  useEffect(() => {
    async function getData(userId) {
      try {
        const data = await getOrderListUsingUserId(userId);
        setOrderList(data);
      } catch (error) {
        toast.error('Getting order list error');
      }
    }
    getData(user?.userId);
  }, [user]);

  const handleEditClick = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = async (orderId) => {
    try {
      await updateOrderUsingOrderId(orderId, newStatus); // Update the order status
      setOrderList(prevList =>
        prevList.map(order =>
          order._id === orderId ? { ...order, receive: newStatus } : order
        )
      );
      setEditingOrderId(null); // Exit editing mode
      toast.success('Order status updated successfully!');
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  return (
    <PrivateMainPage>
      <div className="overflow-x-auto my-5 mr-10">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-3 border-b">Hotel Name</th>
              <th className="py-2 px-3 border-b">Item Name</th>
              <th className="py-2 px-3 border-b">Quantity</th>
              <th className="py-2 px-3 border-b">Payment Method</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 ? (
              orderList.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border-b">{order.hotelName}</td>
                  <td className="py-2 px-3 border-b">{order.itemName}</td>
                  <td className="py-2 px-3 border-b">{order.quantity}</td>
                  <td className="py-2 px-3 border-b">{order.paymentMethod}</td>
                  <td className="py-2 px-3 border-b">
                    {editingOrderId === order._id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg"
                      >
                        <option value="On the way">On the way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                        {/* Add more statuses as needed */}
                      </select>
                    ) : (
                      order.receive
                    )}
                  </td>
                  <td className="py-2 px-3 border-b">
                    {editingOrderId === order._id ? (
                      <button
                        onClick={() => handleStatusChange(order._id)}
                        className="text-green-500 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(order._id, order.receive)}
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
                <td colSpan="6" className="border border-gray-300 p-2 text-center">
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
