import { customerModel } from '../model/Customer.js';

$(document).ready(function () {
    loadTable();
    populateCustomerDropdown();

    $('#customer-save').on('click', function () {
        saveCustomer();
    });

    $('#customer-update').on('click', function () {
        updateCustomer();
    });

    $('#customer-delete').on('click', function () {
        deleteCustomer();
    });

    $('#customer-reset').on('click', function () {
        resetForm();
    });

    $('#customer_search_box').on('keyup', function () {
        searchCustomer();
    });

    $('#close-search').on('click', function () {
        $('#customer_search_section').hide();
    });

    function searchCustomer() {
        const searchId = $('#customer_search_box').val().trim().toUpperCase();
        if (searchId === '') {
            return;
        }

        const customer = customerModel.getCustomerById(searchId);
        if (customer) {
            populateForm(customer);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Customer ID not found. Please enter a correct customer ID.'
            });
        }
    }

    function loadTable() {
        const customers = customerModel.getAllCustomers();
        let rows = '';
        customers.forEach(customer => {
            rows += `
                <tr data-id="${customer.id}">
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
        });
        $('#customer_tbl_body').html(rows);

        // Add click event to table rows
        $('#customer_tbl_body tr').on('click', function () {
            const id = $(this).data('id');
            const customer = customerModel.getCustomerById(id);
            if (customer) {
                populateForm(customer);
            }
        });
    }

    function saveCustomer() {
        const id = $('#customer_id').val().trim().toUpperCase();
        const name = $('#customer_name').val().trim();
        const address = $('#customer_address').val().trim();
        const salary = parseFloat($('#customer_salary').val().trim());

        if (!id || !name || !address || !salary) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all fields.'
            });
            return;
        }

        if (!/^C\d{3}$/.test(id)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid ID',
                text: 'Customer ID should start with "C" followed by 3 digits.'
            });
            return;
        }

        if (customerModel.getCustomerById(id)) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate ID',
                text: 'Customer ID already exists. Please enter a unique ID.'
            });
            return;
        }

        const newCustomer = { id, name, address, salary };
        customerModel.addCustomer(newCustomer);
        loadTable();
        populateCustomerDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Customer Saved',
            text: 'Customer has been saved successfully.'
        });
    }

    function updateCustomer() {
        const id = $('#customer_id').val().trim().toUpperCase();
        const name = $('#customer_name').val().trim();
        const address = $('#customer_address').val().trim();
        const salary = parseFloat($('#customer_salary').val().trim());

        if (!id || !name || !address || !salary) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all fields.'
            });
            return;
        }

        const customer = customerModel.getCustomerById(id);
        if (!customer) {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Customer ID not found. Please enter a correct customer ID.'
            });
            return;
        }

        const updatedCustomer = { id, name, address, salary };
        customerModel.updateCustomer(updatedCustomer);
        loadTable();
        populateCustomerDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Customer Updated',
            text: 'Customer has been updated successfully.'
        });
    }

    function deleteCustomer() {
        const id = $('#customer_id').val().trim().toUpperCase();

        if (!id) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please enter a customer ID.'
            });
            return;
        }

        const customer = customerModel.getCustomerById(id);
        if (!customer) {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Customer ID not found. Please enter a correct customer ID.'
            });
            return;
        }

        customerModel.deleteCustomer(id);
        loadTable();
        populateCustomerDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Customer Deleted',
            text: 'Customer has been deleted successfully.'
        });
    }

    function resetForm() {
        $('#customer_id').val('');
        $('#customer_name').val('');
        $('#customer_address').val('');
        $('#customer_salary').val('');
    }

    function populateForm(customer) {
        $('#customer_id').val(customer.id);
        $('#customer_name').val(customer.name);
        $('#customer_address').val(customer.address);
        $('#customer_salary').val(customer.salary);
    }

    function populateCustomerDropdown() {
        const customers = customerModel.getAllCustomers();
        let dropdownItems = '';
        customers.forEach(customer => {
            dropdownItems += `
                <li><a class="dropdown-item" href="#">${customer.id}</a></li>
            `;
        });
        $('#customer_search_dropdown').html(dropdownItems);

        $('.dropdown-item').on('click', function () {
            const selectedId = $(this).text();
            $('#customer_search_box').val(selectedId);
            searchCustomer();
        });
    }
});
function populateForm(customer) {
    $('#customer_id').val(customer.id);
    $('#customer_name').val(customer.name);
    $('#customer_address').val(customer.address);
    $('#customer_salary').val(customer.salary);

    // Save customer ID to local storage
    localStorage.setItem('selectedCustomerId', customer.id);
}
