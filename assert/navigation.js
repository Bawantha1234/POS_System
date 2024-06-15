$('#customer_main_section').css('display', 'none');
$('#item_main_section').css('display', 'none');
$('#order_main_section').css('display', 'none');

$("#brand, #home_nav").on('click', () => {
    $('#home_section').css('display', 'block');
    $('#customer_main_section').css('display', 'none');
    $('#item_main_section').css('display', 'none');
    $('#order_main_section').css('display', 'none');
});
$("#customer_nav, #customer_nav_btn").on('click', () => {
    $('#home_section').css('display', 'none');
    $('#customer_main_section').css('display', 'block');
    $('#item_main_section').css('display', 'none');
    $('#order_main_section').css('display', 'none');
    if(!$("#customer_id").val()){
        $("#customer_btns>button[type='button']").eq(3).click();
    }
});
$("#item_nav, #item_nav_btn").on('click', () => {
    $('#home_section').css('display', 'none');
    $('#customer_main_section').css('display', 'none');
    $('#item_main_section').css('display', 'block');
    $('#order_main_section').css('display', 'none');
    if(!$("#description").val()){
        $("#item_btns>button[type='button']").eq(3).click();
    }
});
$("#order_nav, #order_nav_btn").on('click', () => {
    $('#home_section').css('display', 'none');
    $('#customer_main_section').css('display', 'none');
    $('#item_main_section').css('display', 'none');
    $('#order_main_section').css('display', 'block');
    if(!$("#order_customer_name").val()){
        $("#order_btns>button[type='button']").eq(2).click();
        $("#cart_btns>button[type='reset']").eq(0).click();
    }
});
document.getElementById("home_nav").addEventListener("click", function() {
    showSection("home_section");
});
document.getElementById("customer_nav").addEventListener("click", function() {
    showSection("customer_main_section");
});
document.getElementById("item_nav").addEventListener("click", function() {
    showSection("item_main_section");
});
document.getElementById("order_nav").addEventListener("click", function() {
    showSection("Order_main_section");
});

function showSection(sectionId) {
    // Hide all sections
    document.getElementById("home_section").style.display = "none";
    document.getElementById("customer_main_section").style.display = "none";
    document.getElementById("item_main_section").style.display = "none";
    document.getElementById("Order_main_section").style.display = "none";

    // Show the selected section
    document.getElementById(sectionId).style.display = "block";
}

// Initially show the home section and hide others
document.addEventListener("DOMContentLoaded", function() {
    showSection("home_section");
});
