import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Backend API URL

// CRUD operations for customers
export const createCustomer = async (customer: { name: string }) => {
    return axios.post(`${API_URL}/customers/`, customer);
};

export const getCustomers = async () => {
    return axios.get(`${API_URL}/customers/`);
};

export const updateCustomer = async (id: number, customer: { name: string }) => {
    return axios.put(`${API_URL}/customers/${id}/`, customer);
};

export const deleteCustomer = async (id: number) => {
    return axios.delete(`${API_URL}/customers/${id}/`);
};

// CRUD operations for products
export const createProduct = async (product: { name: string, price: number }) => {
    return axios.post(`${API_URL}/products/`, product);
};

export const getProducts = async () => {
    return axios.get(`${API_URL}/products/`);
};

export const updateProduct = async (id: number, product: { name: string, price: number }) => {
    return axios.put(`${API_URL}/products/${id}/`, product);
};

export const deleteProduct = async (id: number) => {
    return axios.delete(`${API_URL}/products/${id}/`);
};

// CRUD operations for orders
export const createOrder = async (order: { order_date: string, customer: number }) => {
    return axios.post(`${API_URL}/orders/`, order);
};

export const getOrders = async () => {
    return axios.get(`${API_URL}/orders/`);

};

export const deleteOrder = async (orderId: number) => {
    return axios.delete(`${API_URL}/orders/${orderId}/`);
};