import {Customer} from "../model/customer";
import {getAllCustomers} from "../db/db";

const customerDb = 'CUSTOMERDATA';

const customerIdPattern = /^[C]-\d{4}$/;
const namePattern = /^[a-zA-Z '.-]{4,}$/;
const addressPattern = /^[a-zA-Z0-9 ',.-]{5,}$/;
const salaryPattern = /^(?:[1-9]\d{0,5})(?:\.\d{1,2})?$/;
let row_index = null;

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