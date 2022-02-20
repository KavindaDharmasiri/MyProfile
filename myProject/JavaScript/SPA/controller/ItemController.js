/*item*/

$("#itemCode").keydown(function (event) { // event data object

    if (event.key == "Enter") {
        $("#itemName").focus();
    }
});

$("#itemName").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        $("#itemQty").focus();
    }
});

$("#itemQty").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        $("#itemPrice").focus();
    }
});

$("#itemPrice").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        saveItemNow();
    }
});

$("#saveItem").click(function () {

    saveItemNow();
});

$("#clearItem").click(function () {
    clearAllItems();
    saveItemNow();
});


function saveItem() {
    var itemTemp = new Item($("#itemCode").val(), $("#itemName").val(), $("#itemQty").val(),$("#itemPrice").val());

    var itemObject = {
        code: itemTemp.getItemCode(),
        name: itemTemp.getItemName(),
        qty: itemTemp.getItemQty(),
        price: itemTemp.getItemPrice()
    };

    if(itemObject.name==""){
        return;
    }else {
        itemDB.push(itemObject);
    }

    for (var i=0;i<itemDB.length;i++) {
        let option = document.createElement("option");
        option.value = itemDB[i].code;
        option.text = itemDB[i].code;
        itemMenu.add(option);
    }

}

function clearAllItems() {
    $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    $('#itemCode,#itemName,#itemQty,#itemPrice').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#saveItem").attr('disabled', true);
    loadAllItems();
}

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.price}</td></tr>`;
        $("#itemTable").append(row);
    }
}

$("#searchItem").click(function () {
    var searchID = $("#exampleInputEmail11").val();

    var response = searchItem(searchID);
    if (response) {
        $("#itemCode").val(response.code);
        $("#itemName").val(response.name);
        $("#itemQty").val(response.qty);
        $("#itemPrice").val(response.price);
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }
}

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            itemDB.splice(i,1);
        }
    }
    loadAllItems();
    return;
}

function saveItemNow() {
    saveItem();
    clearAllItems();
    loadAllItems();


    $("#itemTable>tr").click(function () {
        var rIndex2 = this.rowIndex;
        let itemCode = $(this).children(":eq(0)").text(); // select first td and get text
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();

        $("#itemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemQty").val(itemQty);
        $("#itemPrice").val(itemPrice);

        $("#updateItem").click(function () {
            if(itemCode==document.getElementById("itemCode").value) {
                for (let i = 0; i < itemDB.length; i++) {
                    if (itemDB[i].code == itemCode) {

                        var itemTemp = new Item($("#itemCode").val(), $("#itemName").val(), $("#itemQty").val(),$("#itemPrice").val());

                        var itemObject = {
                            code: itemTemp.getItemCode(),
                            name: itemTemp.getItemName(),
                            qty: itemTemp.getItemQty(),
                            price: itemTemp.getItemPrice()
                        };


                        itemDB[i].name= itemObject.name;
                        itemDB[i].qty= itemObject.qty;
                        itemDB[i].price= itemObject.price;
                        loadAllItems();
                    }
                }
            }
        });
    });

    $("#itemTable>tr").dblclick(function () {
        let itemCode = $(this).children(":eq(0)").text();
        let result = confirm("are you suwr?");
        if (result) {
            deleteItem(itemCode);
        }
    });
}

// validation Item

var itemCod = 0;
var regExItemCode = /^(I00-)[0-9]{3,4}$/;
$("#itemCode").keyup(function () {
    let input = $("#itemCode").val();
    if (regExItemCode.test(input)) {
        $("#itemCode").css('border', '2px solid green');
        itemCod = 1;
        enableItemBtn();
        $("#error5").text("Success");
    } else {
        $("#itemCode").css('border', '2px solid red');
        itemCod = 0;
        enableItemBtn();
        $("#error5").text("Wrong format : I00-001");
    }
});

var itemNam = 0;
var regExItemName = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
$("#itemName").keyup(function () {
    let input = $("#itemName").val();
    if (regExItemName.test(input)) {
        $("#itemName").css('border', '2px solid green');
        itemNam = 1;
        enableItemBtn();
        $("#error6").text("Success");
    } else {
        $("#itemName").css('border', '2px solid red');
        itemNam = 0;
        enableItemBtn();
        $("#error6").text("Wrong format : redRice");
    }
});

var itemQt = 0;
var regExItemQty = /^[1-9][0-9]{0,2}$/;
$("#itemQty").keyup(function () {
    let input = $("#itemQty").val();
    if (regExItemQty.test(input)) {
        $("#itemQty").css('border', '2px solid green');
        itemQt = 1;
        enableItemBtn();
        $("#error7").text("Success");
    } else {
        $("#itemQty").css('border', '2px solid red');
        itemQt = 0;
        enableItemBtn();
        $("#error7").text("Wrong format : 98");
    }
});

var itemPric = 0;
var regExItemPrice = /^[1-9][0-9]{1,3}([.][0-9]{2})?$/;
$("#itemPrice").keyup(function () {
    let input = $("#itemPrice").val();
    if (regExItemPrice.test(input)) {
        $("#itemPrice").css('border', '2px solid green');
        itemPric = 1;
        enableItemBtn();
        $("#error8").text("Success");
    } else {
        $("#itemPrice").css('border', '2px solid red');
        itemPric = 0;
        enableItemBtn();
        $("#error8").text("Wrong format : 100 / 100.00");
    }
});

function enableItemBtn() {
    const saveItemBtn = document.getElementById("saveItem");
    const updateItemBtn = document.getElementById("updateItem");

    saveItemBtn.disabled = true;
    updateItemBtn.disabled=true;
    var isTrue = (itemCod + itemNam + itemQt + itemPric) == 4;
    if (isTrue) {
        saveItemBtn.disabled = false;
        updateItemBtn.disabled=false;
    }
}
