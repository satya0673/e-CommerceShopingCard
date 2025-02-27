import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import toast from 'react-hot-toast';
import { getItemUsingUserId, getOrderListUsingHotelId } from '../../../auth/service';
import { useAuth } from '../../context/ContextDetals';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [todayOrders, setTodayOrders] = useState([]);
    const [receivedOrdersCount, setReceivedOrdersCount] = useState(0);
    const [isLoadding, setIsLoading] = useState(false)

    const { user } = useAuth();



    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            try {
                const itemsResponse = await getItemUsingUserId(user?.userId);

                setItems(itemsResponse?.allPost);

                const ordersResponse = await getOrderListUsingHotelId(user?.userId);
                const filter = ordersResponse.filter((data) => data.receive !== 'Delivered')
                setOrders(filter);

                const today = new Date().toISOString().slice(0, 10);
                const filteredTodayOrders = ordersResponse.filter(order => order.createdAt.slice(0, 10) === today);
                setTodayOrders(filteredTodayOrders);

                const countReceived = ordersResponse.filter(order => order.receive).length;
                setReceivedOrdersCount(countReceived);
            } catch (error) {
                toast.error('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        }

        if (user) {
            fetchData();
        }
    }, [user, isLoadding]); // Run effect when user changes


    //console.log("list of order" + items);


    return (
        <PrivateMainPage>
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <h2 className="text-lg font-semibold text-gray-700">List of Items</h2>
                        <p className="text-2xl font-bold text-gray-800">{items.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <h2 className="text-lg font-semibold text-gray-700">List of Orders</h2>
                        <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <h2 className="text-lg font-semibold text-gray-700">Today's Orders</h2>
                        <p className="text-2xl font-bold text-gray-800">{todayOrders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                        <h2 className="text-lg font-semibold text-gray-700">Received Orders</h2>
                        <p className="text-2xl font-bold text-gray-800">{receivedOrdersCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Orders List</h2>
                    {
                        orders.length !== 0 ?
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border px-4 py-2">Order ID</th>
                                        <th className="border px-4 py-2">Item Name</th>
                                        <th className="border px-4 py-2">Quantity</th>
                                        <th className="border px-4 py-2">Payment Method</th>
                                        <th className="border px-4 py-2">Received</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        orders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-100">
                                                <td className="border px-4 py-2">{order._id}</td>
                                                <td className="border px-4 py-2">{order.itemName}</td>
                                                <td className="border px-4 py-2">{order.quantity}</td>
                                                <td className="border px-4 py-2">{order.paymentMethod}</td>
                                                <td className="border px-4 py-2">{order.receive}</td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>
                            :
                            <p className='text-center font-semibold text-blue-500 text-xl'>No order data</p>
                    }
                </div>
            </div>
        </PrivateMainPage>
    );
}

