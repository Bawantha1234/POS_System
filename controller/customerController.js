import {Customer} from "../model/Customer.js";
import {customer_db} from "../db/db.js";


const customerIdPattern = /^[C]-\d{4}$/;
const namePattern = /^[a-zA-Z '.-]{4,}$/;
const addressPattern = /^[a-zA-Z0-9 ',.-]{5,}$/;
const salaryPattern = /^(?:[1-9]\d{0,5})(?:\.\d{1,2})?$/;
let row_index = null;

//save customer
$("#customer_btns>button[type='button']").eq(0).on("click", () => {
    let customer_id = $("#customer_id").val();
    let name = $("#customer_name").val();
    let address = $("#customer_address").val();
    let salary = $("#customer_salary").val();
    if(customer_id && name && address && salary) {
        if (customerIdPattern.test(customer_id)) {
            if(!isAvailableID(customer_id)) {
                if (namePattern.test(name)) {
                    if (addressPattern.test(address)) {
                        if (salaryPattern.test(salary)) {
                            let customer_obj = new Customer(customer_id, name, address, salary);
                            customer_db.push(customer_obj);
                            $("#customer_btns>button[type='button']").eq(3).click();
                            loadCustomerData();
                            Swal.fire({width: '225px', position: 'center', icon: 'success', title: 'Saved!', showConfirmButton: false, timer: 2000});
                        } else { showError('Invalid salary input!'); }
                    } else { showError('Invalid address input!'); }
                } else { showError('Invalid name input!'); }
            } else { showError('This ID is already exist!'); }
        } else { showError('Invalid customer ID format!'); }
    } else { showError('Fields can not be empty!'); }
});

//search customer
$('#customer_search_box').on('input', () => {
    let search_term = $('#customer_search_box').val();
    if(search_term){
        $('#customer_search_tbl_body').empty();
        let results = customer_db.filter((customer) =>
            customer.customer_id.toLowerCase().startsWith(search_term.toLowerCase()) ||
            customer.name.toLowerCase().startsWith(search_term.toLowerCase()) ||
            customer.address.startsWith(search_term.toLowerCase()));
        results.map((customer, index) => {
            let record = `<tr><td class="customer_id">${customer.customer_id}</td><td class="name">${customer.name}</td>
                      <td class="address">${customer.address}</td><td class="salary">${customer.salary}</td></tr>`;
            $("#customer_search_tbl_body").append(record);
        });
    }else{
        $('#customer_search_tbl_body').empty();
    }
});