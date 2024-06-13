// model/CustomerModel.js
import {customers } from '../db/db.js';

class CustomerModel {
    constructor() {
        this.customers = customers;
    }

    addCustomer(customer) {
        this.customers.push(customer);
    }

    updateCustomer(updatedCustomer) {
        const index = this.customers.findIndex(customer => customer.id === updatedCustomer.id);
        if (index !== -1) {
            this.customers[index] = updatedCustomer;
        }
    }

    deleteCustomer(customerId) {
        this.customers = this.customers.filter(customer => customer.id !== customerId);
    }

    getCustomerById(customerId) {
        return this.customers.find(customer => customer.id === customerId);
    }

    getAllCustomers() {
        return this.customers;
    }
}

export const customerModel = new CustomerModel();
