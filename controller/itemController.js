import { itemModel } from '../model/Item.js';

$(document).ready(function () {
    loadTable();
    populateItemDropdown();

    $('#item-save').on('click', function () {
        saveItem();
    });

    $('#item-update').on('click', function () {
        updateItem();
    });

    $('#item-delete').on('click', function () {
        deleteItem();
    });

    $('#item-reset').on('click', function () {
        resetForm();
    });

    $('#item_search_box').on('keyup', function () {
        filterDropdown();
    });

    $('#item_search_dropdown').on('click', '.dropdown-item', function () {
        const selectedId = $(this).text();
        $('#item_search_box').val(selectedId);
        searchItemById(selectedId);
    });

    function searchItemById(searchId) {
        const item = itemModel.getItemById(searchId.toUpperCase());
        if (item) {
            populateForm(item);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Item ID not found. Please enter a correct item ID.'
            });
        }
    }

    function loadTable() {
        const items = itemModel.getAllItems();
        let rows = '';
        items.forEach(item => {
            rows += `
                <tr data-id="${item.id}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.qty}</td>
                </tr>
            `;
        });
        $('#item_tbl_body').html(rows);

        // Add click event to table rows
        $('#item_tbl_body tr').on('click', function () {
            const id = $(this).data('id');
            const item = itemModel.getItemById(id);
            if (item) {
                populateForm(item);
            }
        });
    }

    function validateItem(id, name, price, qty, isUpdate = false) {
        const idRegex = /^I\d{3}$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        const qtyRegex = /^\d+$/;

        if (!id || !idRegex.test(id)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid ID',
                text: 'Item ID must start with "I" followed by 3 digits and must be unique.'
            });
            return false;
        }

        if (!isUpdate && itemModel.getItemById(id)) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate ID',
                text: 'Item ID already exists. Please enter a unique ID.'
            });
            return false;
        }

        if (!name || !nameRegex.test(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Name',
                text: 'Item name must contain only letters.'
            });
            return false;
        }

        if (!price || !priceRegex.test(price)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Price',
                text: 'Price must be a positive number.'
            });
            return false;
        }

        if (!qty || !qtyRegex.test(qty)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Quantity',
                text: 'Quantity must be a positive integer.'
            });
            return false;
        }

        return true;
    }

    function saveItem() {
        const id = $('#item_id').val().trim().toUpperCase();
        const name = $('#item_name').val().trim();
        const price = $('#item_price').val().trim();
        const qty = $('#item_qty').val().trim();

        if (!validateItem(id, name, price, qty)) {
            return;
        }

        const newItem = { id, name, price: parseFloat(price), qty: parseInt(qty) };
        itemModel.addItem(newItem);
        loadTable();
        populateItemDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Item Saved',
            text: 'Item has been saved successfully.'
        });
    }

    function updateItem() {
        const id = $('#item_id').val().trim().toUpperCase();
        const name = $('#item_name').val().trim();
        const price = $('#item_price').val().trim();
        const qty = $('#item_qty').val().trim();

        if (!validateItem(id, name, price, qty, true)) {
            return;
        }

        const item = itemModel.getItemById(id);
        if (!item) {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Item ID not found. Please enter a correct item ID.'
            });
            return;
        }

        const updatedItem = { id, name, price: parseFloat(price), qty: parseInt(qty) };
        itemModel.updateItem(updatedItem);
        loadTable();
        populateItemDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Item Updated',
            text: 'Item has been updated successfully.'
        });
    }

    function deleteItem() {
        const id = $('#item_id').val().trim().toUpperCase();

        if (!id) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please enter an item ID.'
            });
            return;
        }

        const item = itemModel.getItemById(id);
        if (!item) {
            Swal.fire({
                icon: 'error',
                title: 'Not Found',
                text: 'Item ID not found. Please enter a correct item ID.'
            });
            return;
        }

        itemModel.deleteItem(id);
        loadTable();
        populateItemDropdown();
        resetForm();
        Swal.fire({
            icon: 'success',
            title: 'Item Deleted',
            text: 'Item has been deleted successfully.'
        });
    }

    function resetForm() {
        $('#item_id').val('');
        $('#item_name').val('');
        $('#item_price').val('');
        $('#item_qty').val('');
    }

    function populateForm(item) {
        $('#item_id').val(item.id);
        $('#item_name').val(item.name);
        $('#item_price').val(item.price);
        $('#item_qty').val(item.qty);
    }

    function populateItemDropdown() {
        const items = itemModel.getAllItems();
        let dropdownItems = '';
        items.forEach(item => {
            dropdownItems += `
                <li><a class="dropdown-item" href="#">${item.id}</a></li>
            `;
        });
        $('#item_search_dropdown').html(dropdownItems);

        $('.dropdown-item').on('click', function () {
            const selectedId = $(this).text();
            $('#item_search_box').val(selectedId);
            searchItemById(selectedId);
        });
    }

    function filterDropdown() {
        const searchText = $('#item_search_box').val().toUpperCase();
        const items = itemModel.getAllItems();
        let filteredItems = items.filter(item => item.id.includes(searchText));
        let dropdownItems = '';
        filteredItems.forEach(item => {
            dropdownItems += `
                <li><a class="dropdown-item" href="#">${item.id}</a></li>
            `;
        });
        $('#item_search_dropdown').html(dropdownItems);
    }
});
