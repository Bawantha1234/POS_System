const orderModel = (() => {
    const orders = [
        // Example order for initial data
        {
            orderId: 'O001',
            customerId: 'C001',
            date: '2024-06-12',
            discount: 10,
            total: 900,
            items: [
                { itemCode: 'I001', description: 'Item 1', unitPrice: 100, qty: 10, total: 1000 }
            ]
        }
    ];

    const generateOrderId = () => {
        const lastOrder = orders[orders.length - 1];
        if (!lastOrder) {
            return 'O001';
        }
        const lastOrderIdNumber = parseInt(lastOrder.orderId.substring(1));
        const newOrderIdNumber = lastOrderIdNumber + 1;
        return `O${newOrderIdNumber.toString().padStart(3, '0')}`;
    };

    const placeOrder = (order) => {
        orders.push(order);
    };

    const getOrders = () => {
        return orders;
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.orderId === orderId);
    };

    const updateOrder = (updatedOrder) => {
        const orderIndex = orders.findIndex(order => order.orderId === updatedOrder.orderId);
        if (orderIndex !== -1) {
            orders[orderIndex] = updatedOrder;
        }
    };

    const deleteOrder = (orderId) => {
        const orderIndex = orders.findIndex(order => order.orderId === orderId);
        if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
        }
    };

    return {
        generateOrderId,
        placeOrder,
        getOrders,
        getOrderById,
        updateOrder,
        deleteOrder
    };
})();

export { orderModel };
