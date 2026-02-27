import React from 'react';
import OrderList from './OrderList';  // Make sure this path is correct

function App() {
    return (
        <div className="App">
            <h1>Order Management</h1>
            <OrderList />  {/* This renders the OrderList component */}
        </div>
    );
}

export default App;