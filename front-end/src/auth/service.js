import { exportAxios, privateAxios } from "./helper"

export const createUser = async (formData) => {

    const response = await exportAxios.post('/api/user/createUser', formData);

    return response.data;
}

export const loginUser = async (userData) => {

    const response = await exportAxios.post('/api/user/loginUser', userData);

    return response.data;
}

export const getUserUsingUserId = async (userId) => {
    const response = await privateAxios.get(`/api/user/getSingleUser/${userId}`);
    return response.data;
}

//item
export const createItem = async (customer) => {

    const response = await privateAxios.post(`/api/hotel/createItem`, customer);
    return response.data;
}

export const getAllItems = async () => {
    const response = await privateAxios.get(`/api/hotel/getAllItem`);
    return response.data;
}

export const getItemUsingUserId = async (userId) => {
    const response = await privateAxios.get(`/api/hotel/getItemUsingUserId/${userId}`);
    return response.data;
}


export const getItemUsingItemId = async (userId) => {
    const response = await privateAxios.get(`/api/hotel/getPostUsingItemId/${userId}`);
    return response.data;
}

export const deleteItemUsingUserId = async (id) => {
    const response = await privateAxios.delete(`/api/hotel/deleteItemUsingItemId/${id}`);
    return response.data;
}

//order data

///
export const createOrder = async (orderdata) => {

    const response = await privateAxios.post(`/api/order/orders`, orderdata);
    return response.data;
}
export const getOrderListUsingHotelId = async (hotelId) => {
    const response = await privateAxios.get(`/api/order/orders/hotel/${hotelId}`);
    return response.data;
}
export const getOrderListUsingUserId = async (userId) => {
    const response = await privateAxios.get(`/api/order/orders/${userId}`);
    return response.data;
}


export const updateOrderUsingOrderId = async (orderId, status) => {

    const response = await privateAxios.put(`/api/order/ordersUpdate/${orderId}/${status}`);
    return response.data;
}

//add to card
export const creteAddToCard = async (food) => {

    const response = await privateAxios.post(`/api/addToCard/add/${food?._id}`, food);
    return response.data;
}

//get add to card Product using user id
export const getAddToCardProductUsingUserId = async (userId) => {

    const response = await privateAxios.get(`/api/addToCard/getProduct/${userId}`);
    return response.data;
}

//delete add to card 
export const deleteProductItem = async (userId) => {
    const response = await privateAxios.delete(`/api/addToCard/ordersDelete/${userId}`);
    return response.data;
}