

    var customers =[];
    var recordIndex;

    $('#dashboard-section').css({display: 'block'});
    $('#managecustomer-section').css({display: 'none'});
    $('#manageitem-section').css({display: 'none'});
    $('#placeorder-section').css({display: 'none'});

    //Dashboard
    $('#nav-Dashboard').on('click',()=>{
    $('#dashboard-section').css({display: 'block'});
    $('#managecustomer-section').css({display: 'none'});
    $('#manageitem-section').css({display: 'none'});
    $('#placeorder-section').css({display: 'none'});
});

    //Manage Customer
    $('#nav-CustomerMan').on('click',()=>{
    $('#dashboard-section').css({display: 'none'});
    $('#managecustomer-section').css({display: 'block'});
    $('#manageitem-section').css({display: 'none'});
    $('#placeorder-section').css({display: 'none'});
});

    //Manage Items
    $('#nav-ItemMan').on('click',()=>{
    $('#dashboard-section').css({display: 'none'});
    $('#managecustomer-section').css({display: 'none'});
    $('#manageitem-section').css({display: 'block'});
    $('#placeorder-section').css({display: 'none'});
});

    //Place Order
    $('#nav-PlaceOrder').on('click',()=>{
    $('#dashboard-section').css({display: 'none'});
    $('#managecustomer-section').css({display: 'none'});
    $('#manageitem-section').css({display: 'none'});
    $('#placeorder-section').css({display: 'block'});
});


    function loadTable() {

    $("#cust-table").empty();

    customers.map((item, index) => {
    let record = `<tr>
                <td class="customer-id-value">${item.Id}</td>
                <td class="customer-name-value">${item.Name}</td>
                <td class="customer-mobile-value">${item.Mobile}</td>
                <td class="customer-address-value">${item.Address}</td>
                <td class="customer-birthday-value">${item.Birthday}</td>
                <td class="student-program-value">${item.Program}</td>
            </tr>`;
    $("#cust-table").append(record);
});
}


    //customer Add
    $('#customer-add').on('click',()=>{

    //customer id
    var customerId = $('#cust-id').val();

    //customer name
    var customerName = $('#cust-name').val();

    //customer adress
    var customerAddress = $('#cust-address').val();

    //customer mobile
    var customerMobile = $('#cust-contact').val();

    //customer birthday
    var customerBirthday = $('#cust-birthDay').val()

    //Male/Female
    var customerProgram = $('input[name="radio"]:checked').val();


    console.log("custId :",customerId);
    console.log("custName :",customerName);
    console.log("custAddress:",customerAddress);
    console.log("custMobile:",customerMobile);
    console.log("custBirthday :",customerBirthday);
    console.log("Male/Female :",customerProgram);

    // create an object
    let customer = {
    Id: customerId,
    Name: customerName,
    Mobile: customerMobile,
    Address: customerAddress,
    Birthday: customerBirthday,
    Program: customerProgram
}
    // push to the array
    customers.push(customer);

    loadTable();
    $("#customer-reset").click();


});

    //customer update
    $("#customer-update").on('click', () => {
    var customerId = $('#cust-id').val();
    var customerName = $('#cust-name').val();
    var customerAddress = $('#cust-address').val();
    var customerMobile = $('#cust-contact').val();
    var customerBirthday = $('#cust-birthDay').val()
    var customerProgram = $('input[name="radio"]:checked').val();

    let customerObj = customers[recordIndex];
    // let customerObj = {...customers[recordIndex]}; // clone object
    customerObj.Id = customerId;
    customerObj.Name = customerName;
    customerObj.Mobile = customerMobile;
    customerObj.Address = customerAddress;
    customerObj.Birthday = customerBirthday;
    customerObj.Program = customerProgram;

    // console.log("S1: ", studentObj);
    // console.log("S2: ", students[recordIndex]);

    loadTable();
    $("#customer-reset").click();
});

    //customer Delete
    $("#customer-delete").on('click', () => {
    customers.splice(recordIndex, 1);
    loadTable();
    $("#customer-reset").click();
});


    $("#cust-table").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    console.log("index: ", index);

    let id = $(this).find(".customer-id-value").text();
    let name = $(this).find(".customer-name-value").text();
    let mobile = $(this).find(".customer-mobile-value").text();
    let address = $(this).find(".customer-address-value").text();
    let birthday = $(this).find(".customer-birthday-value").text();
    let program = $(this).find(".student-program-value").text();


    $("#cust-id").val(id);
    $("#cust-name").val(name);
    $("#cust-contact").val(mobile);
    $("#cust-birthDay").val(birthday);
    $("#cust-address").val(address);
    $(input[name="radio"][value = {program}]).prop('checked', true);

})


