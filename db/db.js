
export var customer_db = [];

export function searchItem(id){
    let item = localStorage.getItem(itemDb);
    let parse = JSON.parse(item);
    return parse.find(obj=>obj.itemCode==id)
}

export function getAllItem(){
    return JSON.parse(localStorage.getItem(itemDb));
}

export function searchCustomer(id){
    let item = localStorage.getItem(customerDb);
    let parse = JSON.parse(item);
    return parse.find(obj=>obj._id==id)
}

export function getAllCustomers(){
    return JSON.parse(localStorage.getItem(customerDb));
}