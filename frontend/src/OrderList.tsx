import React, { useState, useEffect } from 'react';
import { createCustomer, getCustomers, updateCustomer, deleteCustomer, deleteOrder } from './orderService';
import { createProduct, getProducts, updateProduct, deleteProduct } from './orderService';
import { createOrder, getOrders } from './orderService';

const CrudOperations: React.FC = () => {
    // Customers
    const [customers, setCustomers] = useState<any[]>([]);
    const [newCustomer, setNewCustomer] = useState<string>('');
    
    // Products
    const [products, setProducts] = useState<any[]>([]);
    const [newProductName, setNewProductName] = useState<string>('');
    const [newProductPrice, setNewProductPrice] = useState<number>(0);
    
    // Orders
    const [orders, setOrders] = useState<any[]>([]);
    const [orderDate, setOrderDate] = useState<string>('');
    const [customerId, setCustomerId] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Fetch Customers, Products, and Orders on load
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const customerResponse = await getCustomers();
                setCustomers(customerResponse.data);
                
                const productResponse = await getProducts();
                setProducts(productResponse.data);

                const orderResponse = await getOrders();
                setOrders(orderResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle Creating Customer
    const handleCreateCustomer = async () => {
        if (!newCustomer.trim()) {
            alert("Please enter a customer name.");
            return;
        }
        try {
            setIsLoading(true);
            await createCustomer({ name: newCustomer });
            const updatedCustomers = await getCustomers();
            setCustomers(updatedCustomers.data);
            setNewCustomer('');
        } catch (error) {
            alert("Error creating customer.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Creating Product
    const handleCreateProduct = async () => {
        if (!newProductName.trim() || newProductPrice <= 0) {
            alert("Please enter product name and price.");
            return;
        }
        try {
            setIsLoading(true);
            await createProduct({ name: newProductName, price: newProductPrice });
            const updatedProducts = await getProducts();
            setProducts(updatedProducts.data);
            setNewProductName('');
            setNewProductPrice(0);
        } catch (error) {
            alert("Error creating product.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Creating Order
    const handleCreateOrder = async () => {
        if (!orderDate || !customerId) {
            alert("Please enter order date and customer ID.");
            return;
        }
        try {
            setIsLoading(true);
            await createOrder({ order_date: orderDate, customer: customerId });
            const updatedOrders = await getOrders();
            setOrders(updatedOrders.data);
            setOrderDate('');
            setCustomerId(0);
        } catch (error) {
            alert("Error creating order.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Deleting Customer
    const handleDeleteCustomer = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                setIsLoading(true);
                await deleteCustomer(id);
                const updatedCustomers = await getCustomers();
                setCustomers(updatedCustomers.data);
            } catch (error) {
                alert("Error deleting customer.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle Deleting Product
    const handleDeleteProduct = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                setIsLoading(true);
                await deleteProduct(id);
                const updatedProducts = await getProducts();
                setProducts(updatedProducts.data);
            } catch (error) {
                alert("Error deleting product.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle Deleting Order
    const handleDeleteOrder = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                setIsLoading(true);
                await deleteOrder(id);
                const updatedOrders = await getOrders();
                setOrders(updatedOrders.data);
            } catch (error) {
                alert("Error deleting order.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {/* Customer Form */}
            <div>
                <h3>Create Customer</h3>
                <input 
                    type="text" 
                    placeholder="Enter customer name" 
                    value={newCustomer} 
                    onChange={(e) => setNewCustomer(e.target.value)} 
                />
                <button onClick={handleCreateCustomer} disabled={isLoading}>
                    {isLoading ? "Creating..." : "Add Customer"}
                </button>
            </div>

            {/* Product Form */}
            <div>
                <h3>Create Product</h3>
                <input 
                    type="text" 
                    placeholder="Enter product name" 
                    value={newProductName} 
                    onChange={(e) => setNewProductName(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Enter product price" 
                    value={newProductPrice} 
                    onChange={(e) => setNewProductPrice(parseFloat(e.target.value))} 
                />
                <button onClick={handleCreateProduct} disabled={isLoading}>
                    {isLoading ? "Creating..." : "Add Product"}
                </button>
            </div>

            {/* Order Form */}
            <div>
                <h3>Create Order</h3>
                <input 
                    type="date" 
                    value={orderDate} 
                    onChange={(e) => setOrderDate(e.target.value)} 
                />
                <select 
                    value={customerId} 
                    onChange={(e) => setCustomerId(parseInt(e.target.value))}
                >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.customer_id} value={customer.customer_id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleCreateOrder} disabled={isLoading}>
                    {isLoading ? "Creating..." : "Add Order"}
                </button>
            </div>

            {/* Display Customers */}
            <h3>Existing Customers</h3>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.customer_id}>
                        {customer.name} (ID: {customer.customer_id})
                        <button onClick={() => handleDeleteCustomer(customer.customer_id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Display Products */}
            <h3>Existing Products</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.product_id}>
                        {product.name} - ${product.price} (ID: {product.product_id})
                        <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Display Orders */}
            <h3>Existing Orders</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order.order_id}>
                        Order Date: {order.order_date} (Customer ID: {order.customer})
                        <button onClick={() => handleDeleteOrder(order.order_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CrudOperations;