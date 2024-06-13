class Order {
    constructor(id, date, customerId, customerName, total) {
        this.id = id;
        this.date = date;
        this.customerId = customerId;
        this.customerName = customerName;
        this.total = total;
    }

    // Static method to validate an order object
    static validateOrder(order) {
        const { id, date, customerId, customerName, total } = order;
        if (!id || !date || !customerId || !customerName || isNaN(total)) {
            return false;
        }
        return true;
    }

    // Static method to create an Order object from JSON data
    static fromJson(json) {
        const { id, date, customerId, customerName, total } = json;
        return new Order(id, date, customerId, customerName, total);
    }

    // Method to convert Order object to JSON format
    toJson() {
        return {
            id: this.id,
            date: this.date,
            customerId: this.customerId,
            customerName: this.customerName,
            total: this.total
        };
    }
}

// Export Order class for use in other modules
export default Order;
