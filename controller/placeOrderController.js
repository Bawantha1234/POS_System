import { customerModel } from '../model/Customer.js';
import { itemModel } from '../model/Item.js';
import { orderModel } from "../model/Order";

$(document).ready(function () {
    populateCustomerDropdown();
    populateItemDropdown();
    setInitialDate();
    loadOrdersTable();

    $('#order-save').on('click', function () {
        saveOrder();
    });

    $('#order-calculate').on('click', function () {
        calculateTotal();
    });

    $('#customer-dropdown').on('change', function () {
        const customerId = $(this).val();
        const customer = customerModel.getCustomerById(customerId);
        if (customer) {
            $('#customer-details').val(`${customer.name}, ${customer.address}`);
            localStorage.setItem('selectedCustomerId', customerId); // Save selected customer ID
        }
    });

    $('#item-dropdown').on('change', function () {
        const itemId = $(this).val();
        const item = itemModel.getItemById(itemId);
        if (item) {
            $('#item-price').val(item.price);
            $('#item-qty').val(1); // default quantity to 1
            calculateTotal();
        }
    });

    function populateCustomerDropdown() {
        const customers = customerModel.getAllCustomers();
        let dropdownItems = '<option value="">Select Customer</option>';
        customers.forEach(customer => {
            dropdownItems += `<option value="${customer.id}">${customer.id}</option>`;
        });
        $('#customer-dropdown').html(dropdownItems);
    }

    function populateItemDropdown() {
        const items = itemModel.getAllItems();
        let dropdownItems = '<option value="">Select Item</option>';
        items.forEach(item => {
            dropdownItems += `<option value="${item.id}">${item.id}</option>`;
        });
        $('#item-dropdown').html(dropdownItems);
    }

    function setInitialDate() {
        const today = new Date().toISOString().split('T')[0];
        $('#order_date').val(today);
    }

    function calculateTotal() {
        const itemId = $('#item-dropdown').val();
        const itemQty = parseInt($('#item-qty').val(), 10);
        const discountRate = parseFloat($('#discount-rate').val(), 10) || 0;

        if (!itemId || !itemQty || itemQty <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please select an item and enter a valid quantity.'
            });
            return;
        }

        const item = itemModel.getItemById(itemId);
        if (!item) {
            Swal.fire({
                icon: 'error',
                title: 'Item Not Found',
                text: 'Selected item not found in the database.'
            });
            return;
        }

        const totalAmount = item.price * itemQty;
        const discountAmount = totalAmount * (discountRate / 100);
        const finalAmount = totalAmount - discountAmount;

        $('#total-amount').val(finalAmount.toFixed(2));
    }

    function saveOrder() {
        const customerId = $('#customer-dropdown').val();
        const itemId = $('#item-dropdown').val();
        const itemQty = parseInt($('#item-qty').val(), 10);
        const totalAmount = parseFloat($('#total-amount').val());
        const discountRate = parseFloat($('#discount-rate').val());

        if (!customerId || !itemId || !itemQty || !totalAmount) {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Order',
                text: 'Please complete all fields to save the order.'
            });
            return;
        }

        const order = {
            customerId,
            itemId,
            itemQty,
            totalAmount,
            discountRate,
            orderDate: $('#order_date').val()
        };

        orderModel.addOrder(order);
        Swal.fire({
            icon: 'success',
            title: 'Order Saved',
            text: 'Order has been saved successfully.'
        });

        resetForm();
        loadOrdersTable(); // Refresh the orders table
    }

    function resetForm() {
        $('#customer-dropdown').val('');
        $('#customer-details').val('');
        $('#item-dropdown').val('');
        $('#item-price').val('');
        $('#item-qty').val('');
        $('#discount-rate').val('');
        $('#total-amount').val('');
        setInitialDate();
    }

    function loadOrdersTable() {
        const orders = orderModel.getAllOrders();
        let tableContent = '';

        orders.forEach(order => {
            const customer = customerModel.getCustomerById(order.customerId);
            const item = itemModel.getItemById(order.itemId);

            tableContent += `
                <tr>
                    <td>${order.customerId}</td>
                    <td>${customer ? `${customer.name}, ${customer.address}` : ''}</td>
                    <td>${order.itemId}</td>
                    <td>${item ? item.price : ''}</td>
                    <td>${order.itemQty}</td>
                    <td>${order.discountRate || 0}</td>
                    <td>${order.totalAmount}</td>
                    <td>${order.orderDate}</td>
                </tr>
            `;
        });

        $('#orders-table tbody').html(tableContent);
    }
});
