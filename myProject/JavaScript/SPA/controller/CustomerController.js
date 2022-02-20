/*Table Data*/

enableBtn();


$("#custId").keydown(function (event) { // event data object

    if (event.key == "Enter") {
        if (cuId == 1) {
            $("#custName").focus();
        } else {
            alert("wrong Input");
        }
    }
});

$("#custName").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuName == 1) {
            $("#custAddress").focus();
        } else {
            alert("Wrong Input");
        }
    }
});

$("#custAddress").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuAddress == 1) {
            $("#custTP").focus();
        } else {
            alert("Wrong Input");
        }
    }
});

$("#custTP").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuTp == 1) {
            saveCus();
        } else {
            alert("Wrong Input");
        }
    }
});

function saveCustomer() {
    var cusTemp = new Customer($("#custId").val(), $("#custName").val(), $("#custAddress").val(), $("#custTP").val());

    var customerObject = {
        id: cusTemp.getCustomerID(),
        name: cusTemp.getCustomerName(),
        address: cusTemp.getCustomerAddress(),
        salary: cusTemp.getCustomerTp()
    };

    if(customerObject.name==""){
        return;
    }else {

        customerDB.push(customerObject);

    }

    for (var i=0;i<customerDB.length;i++) {
        let option = document.createElement("option");
        option.value = customerDB[i].id;
        option.text = customerDB[i].id;
        menu.add(option);
    }
}

function clearAll() {
    $('#custId,#custName,#custAddress,#custTP').val("");
    $('#custId,#custName,#custAddress,#custTP').css('border', '2px solid #ced4da');
    $('#custId').focus();
    $("#saveCustomer").attr('disabled', true);
    loadAllCustomers();
}

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $("#customerTable").append(row);
    }
}

$("#clearCustomer").click(function () {
    clearAll();
    saveCus();
});


$("#searchCustomer").click(function () {
    var searchID = $("#customerIdSearch").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#custId").val(response.id);
        $("#custName").val(response.name);
        $("#custAddress").val(response.address);
        $("#custTP").val(response.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
        }
    }
    loadAllCustomers();

}


function saveCus() {
    saveCustomer();
    clearAll();
    loadAllCustomers();

    $("#customerTable>tr").click(function () {
        var rIndex = this.rowIndex;
        let cusID = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusTP = $(this).children(":eq(3)").text();

        $("#custId").val(cusID);
        $("#custName").val(cusName);
        $("#custAddress").val(cusAddress);
        $("#custTP").val(cusTP);

        $("#updateCustomer").click(function () {

            if (cusID == document.getElementById("custId").value) {

                for (let i = 0; i < customerDB.length; i++) {
                    if (customerDB[i].id == cusID) {


                        var cusTemp = new Customer($("#custId").val(), $("#custName").val(), $("#custAddress").val(), $("#custTP").val());

                        var customerObject = {
                            id: cusTemp.getCustomerID(),
                            name: cusTemp.getCustomerName(),
                            address: cusTemp.getCustomerAddress(),
                            salary: cusTemp.getCustomerTp()
                        };


                        customerDB[i].name = customerObject.name;
                        customerDB[i].address = customerObject.address;
                        customerDB[i].salary = customerObject.salary;
                        loadAllCustomers();
                    }
                }
            }
        });
    });


    $("#customerTable>tr").dblclick(function () {
        let id = $(this).children(":eq(0)").text();
        let result = confirm("are you suwr?");
        if (result) {
            deleteCustomer(id);
        }
    });

}

$("#saveCustomer").click(function () {
    saveCus();
});

// validation Customer

var cuId = 0;
var regExCusID = /^(C00-)[0-9]{3,4}$/;
$("#custId").keyup(function () {
    let input = $("#custId").val();
    if (regExCusID.test(input)) {
        $("#custId").css('border', '2px solid green');
        cuId = 1;
        enableBtn();
        $("#error").text("Success");
    } else {
        $("#custId").css('border', '2px solid red');
        cuId = 0;
        enableBtn();
        $("#error").text("Wrong format : C00-001");
    }
});

var cuName = 0;
var regExCusName = /^[A-Za-z][A-Za-z_]{3,30}$/;
$("#custName").keyup(function () {
    let input = $("#custName").val();
    if (regExCusName.test(input)) {
        $("#custName").css('border', '2px solid green');
        cuName = 1;
        enableBtn();
        $("#error1").text("Success");
    } else {
        $("#custName").css('border', '2px solid red');
        cuName = 0;
        enableBtn();
        $("#error1").text("Wrong format : Kavinda");
    }
});

var cuAddress = 0;
var regExCusAddress = /^[a-zA-Z0-9]{4,}[ ][a-zA-Z]{4,}$/;
$("#custAddress").keyup(function () {
    let input = $("#custAddress").val();
    if (regExCusAddress.test(input)) {
        $("#custAddress").css('border', '2px solid green');
        cuAddress = 1;
        enableBtn();
        $("#error2").text("Success");
    } else {
        $("#custAddress").css('border', '2px solid red');
        cuAddress = 0;
        enableBtn();
        $("#error2").text("Wrong format : Galle Mapalagama");
    }
});

var cuTp = 0;
var regExCusTp = /^(077|071|078|075|076|072|074)[-]?[0-9]{7}$/;
$("#custTP").keyup(function () {
    let input = $("#custTP").val();
    if (regExCusTp.test(input)) {
        $("#custTP").css('border', '2px solid green');
        cuTp = 1;
        enableBtn();
        $("#error3").text("Success");
    } else {
        $("#custTP").css('border', '2px solid red');
        cuTp = 0;
        enableBtn();
        $("#error3").text("Wrong format : 0710000000");
    }
});

function enableBtn() {
    const saveCustomerBtn = document.getElementById("saveCustomer");
    const updateCustomerBtn = document.getElementById("updateCustomer");
    saveCustomerBtn.disabled = true;
    updateCustomerBtn.disabled = true;
    var isTrue = (cuId + cuName + cuAddress + cuTp) == 4;
    if (isTrue) {
        saveCustomerBtn.disabled = false;
        updateCustomerBtn.disabled = false;
    }
}
