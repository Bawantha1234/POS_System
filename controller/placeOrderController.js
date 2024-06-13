// Order controller to manage order data and interactions
// Import the customerModel (assuming it's defined in 'Customer.js')
import { customerModel } from '../model/Customer.js';

class OrderController {
    constructor() {
        // Initialize with empty array or retrieve from local storage
        this.orders = []; // Array to store order objects
        this.customers = JSON.parse(localStorage.getItem('customers')) || []; // Array to store customer objects
    }

    // Save customers array to local storage
    saveCustomersToLocalStorage() {
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    // Initialize form with existing orders and customers
    initializeForm() {
        // Populate customer select dropdown with customer IDs
        const customerSelect = document.getElementById('customer_select');
        customerSelect.innerHTML = '<option value="-1">-Select Customer-</option>';
        this.customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = customer.id; // Display customer ID
            customerSelect.appendChild(option);
        });

        // Set current date in the date field
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        document.getElementById('date').value = currentDate;

        // Attach event listener for customer selection change
        customerSelect.addEventListener('change', () => {
            const selectedCustomerId = parseInt(customerSelect.value);
            if (selectedCustomerId !== -1) {
                const selectedCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
                if (selectedCustomer) {
                    document.getElementById('order_customer_name').value = selectedCustomer.name;
                }
            } else {
                document.getElementById('order_customer_name').value = '';
            }
        });

        // Attach event listeners for buttons
        document.getElementById('order_btns').addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-primary')) {
                this.updateOrder();
            } else if (event.target.classList.contains('btn-danger')) {
                this.deleteOrder();
            } else if (event.target.classList.contains('fa-arrows-rotate')) {
                // Handle rotate button click
            }
        });

        // Auto-generate Order ID
        this.generateOrderId();
    }

    // Generate a new Order ID (O001, O002, ...)
    generateOrderId() {
        const orderIdField = document.getElementById('order_id');
        // Find the maximum ID in existing orders
        const maxId = this.orders.reduce((max, order) => {
            const orderIdNum = parseInt(order.id.slice(1)); // Extract numeric part
            return orderIdNum > max ? orderIdNum : max;
        }, 0);
        // Generate new ID with leading zeros
        const newId = `O${(maxId + 1).toString().padStart(3, '0')}`;
        orderIdField.value = newId;
    }

    // Update order or add new order
    updateOrder() {
        const orderId = document.getElementById('order_id').value.trim();
        const date = document.getElementById('date').value.trim();
        const customerId = parseInt(document.getElementById('customer_select').value);
        const customerName = document.getElementById('order_customer_name').value.trim();
        const total = parseFloat(document.getElementById('order_total').value.trim());

        // Basic validation
        if (!date || !customerId || isNaN(total)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Check if updating existing order or adding new one
        if (orderId.startsWith('O') && orderId.length === 4) {
            // Update existing order
            const index = this.orders.findIndex(order => order.id === orderId);
            if (index !== -1) {
                this.orders[index].date = date;
                this.orders[index].customerId = customerId;
                this.orders[index].customerName = customerName;
                this.orders[index].total = total;
            }
        } else {
            // Add new order
            this.orders.push({ id: orderId, date: date, customerId: customerId, customerName: customerName, total: total });
            // Update the displayed Order ID
            document.getElementById('order_id').value = orderId;
        }

        // Optionally, update the UI or refresh the table if there's one
    }

    // Delete order by ID
    deleteOrder() {
        const orderId = document.getElementById('order_id').value.trim();
        if (orderId && orderId.startsWith('O') && orderId.length === 4) {
            this.orders = this.orders.filter(order => order.id !== orderId);

            // Reset form fields
            document.getElementById('order_id').value = '';
            document.getElementById('date').value = '';
            document.getElementById('customer_select').value = '-1';
            document.getElementById('order_customer_name').value = '';
            document.getElementById('order_total').value = '';

            // Optionally, update the UI or refresh the table if there's one
        } else {
            alert('Please select an order to delete.');
        }
    }
}

// Usage of OrderController
const orderController = new OrderController();

// Initialize form on page load
document.addEventListener('DOMContentLoaded', () => {
    orderController.initializeForm();
});

// Export OrderController for use in other modules if needed
export { OrderController };
