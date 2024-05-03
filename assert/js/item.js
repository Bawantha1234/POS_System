

var items =[];
var recordIndex;

function loadTable() {

    $("#item-table").empty();

    items.map((item, index) => {
        let record = `<tr>
                <td class="item-code-value">${item.Id}</td>
                <td class="item-name-value">${item.Name}</td>
                <td class="item-price-value">${item.Price}</td>
                <td class="item-qty-value">${item.Qty}</td>
            </tr>`;
        $("#item-table").append(record);
    });
}


//item Add
$('#item-add').on('click',()=>{

    //item id
    var itemCode = $('#item-id').val();

    //item name
    var itemName = $('#item-name').val();

    //item price
    var itemPrice = $('#item-price').val();

    //item qty
    var itemQty = $('#item-qty').val();


    console.log("itemId :",itemCode);
    console.log("itemName :",itemName);
    console.log("itemPrice :",itemPrice);
    console.log("itemQty :",itemQty);


    // create an object
    let item = {
        Id: itemCode,
        Name: itemName,
        Price: itemPrice,
        Qty: itemQty

    }
    // push to the array
    items.push(item);

    loadTable();
    $("#item-reset").click();


});

//item update
$("#item-update").on('click', () => {
    var itemCode = $('#item-id').val();
    var itemName = $('#item-name').val();
    var itemPrice = $('#item-price').val();
    var itemQty = $('#item-qty').val();


    let itemObj = items[recordIndex];
    // let itemObj = {...items[recordIndex]}; // clone object
    itemObj.Id = itemCode;
    itemObj.Name = itemName;
    itemObj.Price = itemPrice;
    itemObj.Qty = itemQty;

    loadTable();
    $("#item-reset").click();
});

//item Delete
$("#item-delete").on('click', () => {
    items.splice(recordIndex, 1);
    loadTable();
    $("#item-reset").click();
});


$("#item-table").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    console.log("index: ", index);

    let id = $(this).find(".item-code-value").text();
    let name = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text();
    let qty = $(this).find(".item-qty-value").text();


    $("#item-id").val(id);
    $("#item-name").val(name);
    $("#item-price").val(price);
    $("#item-qty").val(qty);


})


