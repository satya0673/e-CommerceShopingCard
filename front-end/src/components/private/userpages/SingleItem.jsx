import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder, getItemUsingItemId } from '../../../auth/service';
import { ImSpinner9 } from 'react-icons/im';
import { IoMdCloseCircle } from 'react-icons/io'
export default function SingleItem() {
    const data = useParams();
    const [item, setItem] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: 1,
        paymentMethod: '',
        hotelName: '',
        hotelId: '',
        phoneNumber: '',
        address: ''
    });
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resp = await createOrder(formData);
            toast.success(resp?.message)
        } catch (error) {
            toast.error('Submission error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const itemData = await getItemUsingItemId(data._id);
                console.log(itemData);

                setItem(itemData?.singlePost);

                // Update hotelId in formData based on fetched item
                if (itemData?.singlePost) {
                    setFormData((prevData) => ({
                        ...prevData,
                        itemName: itemData.singlePost.itemName,
                        hotelId: itemData.singlePost.hotelId,
                        hotelName: itemData.singlePost.hotelName
                    }));
                }
            } catch (error) {
                if (error.status === 404)
                    setError('Admin delete the product')
                else
                    toast.error('Getting item error');
            }
        }
        fetchData();
    }, [data._id]); // Added data._id to dependency array

    return (
        <PrivateMainPage>

            {
                error && (
                    <div className="flex justify-center items-center h-screen font-semibold text-xl text-red-500">
                        {error}
                    </div>
                )
            }

            {
                !error && (
                    <div className="bg-white rounded-lg overflow-hidden my-5 mr-10">
                        <div className="grid grid-cols-12">
                            {/* Item Image */}
                            <div className='col-span-5'>
                                <img
                                    className="w-full h-full brightness-75 hover:brightness-100 transition-all duration-300"
                                    src={item?.itemImageUrl}
                                    alt={item?.itemName}
                                />
                            </div>

                            {/* Item Details */}
                            <div className="col-span-7 p-4 bg-gradient-to-b from-blue-500 to-blue-700 text-white ">
                                <h2 className="text-2xl font-bold">{item?.itemName}</h2>
                                <p className="text-lg mt-2">Price: ₹{item?.itemPrice}</p>
                                <p className="mt-2">Category: {item?.itemCategory}</p>
                                <p className="mt-2">Hotel: {item?.hotelName}</p>
                                <p className="mt-2 text-sm">
                                    Description: {item?.itemDesc}
                                </p>

                                <div className="mt-4">
                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300" data-bs-toggle="modal" data-bs-target="#orderfood">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }



            {/* modal for food order */}
            <div className="modal fade" id="orderfood" tabIndex="-1" aria-labelledby="orderfoodLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-blue-500 flex justify-between items-center text-white">
                            <div className="text-xl font-bold" id="orderfoodLabel">Order Food</div>


                            <IoMdCloseCircle className='text-2xl cursor-pointer' data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">

                            <form onSubmit={handleSubmit}>
                                {/* Item Name */}
                                <div className="mb-4 hidden">
                                    <label htmlFor="itemName" className="block text-gray-700 font-semibold mb-2">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        id="itemName"
                                        value={formData.itemName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter item name"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>


                                {/* hotel Name */}
                                <div className="mb-4 hidden">
                                    <label htmlFor="hotelName" className="block text-gray-700 font-semibold mb-2">
                                        Hotel Name
                                    </label>
                                    <input
                                        type="text"
                                        name="hotelName"
                                        id="hotelName"
                                        value={formData.hotelName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter item name"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <label htmlFor="paymentMethod" className="block text-gray-700 font-semibold mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        id="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="PayPal">PayPal</option>
                                    </select>
                                </div>

                                {/* Hotel ID */}
                                <div className="mb-4 hidden">
                                    <label htmlFor="hotelId" className="block text-gray-700 font-semibold mb-2">
                                        Hotel ID
                                    </label>
                                    <input
                                        type="text"
                                        name="hotelId"
                                        id="hotelId"
                                        value={formData.hotelId}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter hotel ID"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="mb-4">
                                    <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter phone number"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Address */}
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter address"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        {isLoading ? <ImSpinner9 className="animate-spin text-2xl" /> : "Submit"}
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>


        </PrivateMainPage>
    );
}
