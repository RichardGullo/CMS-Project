// Globals - do not modify these variables
// You are only allowed to grab data from these. Do not actually point to it.

var global_row_index = 0;
var userEmail = "";
var userName = "";

let baseUrl = `http://192.168.86.34/jadar-api`;

var globalTableArray = [
    {
        "contactId": 0,
        "address": "4544 barrister drive,clermont fl,34711 USA",
        "firstName": "Michael",
        "lastName": "Scott",
        "contactEmail": "richard_gullo@knights.ucf.edu",
        "phone": "352-321-7117"
    },
    {
        "contactId": 1,
        "address": "4544 barrister drive,clermont fl,34711 USA",
        "firstName": "Dwight",
        "lastName": "Schrute",
        "contactEmail": "richard_gullo@knights.ucf.edu",
        "phone": "352-321-7117"
    }
];

var contactIds = globalTableArray.length;

var globalFilter = [];

// On keyup inside search bar, we run this function
$('#search-bar').on('keyup', function () {
    if (globalTableArray == undefined || globalTableArray.length < 1)
        return;

    var value = $(this).val();

    globalFilter = searchTable(value, globalTableArray);

    buildTable(globalFilter);
});

// Function that does search
function searchTable(value, data) {
    var filteredData = [];

    let str = value.toLowerCase().replace(/\s+/g, '');

    for (var i = 0; i < data.length; i++) {
        var fname = data[i].first_name.toLowerCase();
        var lname = data[i].last_name.toLowerCase();
        var name = fname + lname;

        if (name.includes(str)) {
            filteredData.push(data[i]);
            console.log(filteredData);
        }
    }

    return filteredData;
}


// IMPORTANT functions have to load before we use cookie(username, etc)
window.onload = function () {
    let cookieArray = document.cookie.split(';');

    // if(cookieArray.length < 2)
    //     window.location.href = "index.html";

    userName = cookieArray[0];
    userName = userName.split("=");
    userName = userName[1];
    if (userName != "")
        $("#usernameDisplay").text("Hi, " + userName);

    userEmail = cookieArray[1];
    userEmail = userEmail.split("=");
    userEmail = userEmail[1];

    if (userName == "")
        window.location.href = "index.html";

    // getDatabaseTable();
    requestTable();
    console.log(globalTableArray);
}

// Function that populates table with json data
async function requestTable() {
    let formData = new FormData();
    formData.append('userEmail', userEmail);

    let response = await fetch(`${baseUrl}/populate.php`, {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if (result['error'] != '') {
        console.log(result['error']);
        return;
    }

    let data = result['data'];
    globalTableArray = data;

    var table = document.getElementById('myTable');
    table.innerHTML = "";

    // Add icon set to each row but hide them
    for (let i = 0; i < data.length; i++) {
        // street, city state, zip country
        let addressSet1 = globalTableArray[i].address.split(",");
        // city state
        let addressSet2 = addressSet1[1].split(" ");

        let zip = addressSet1[2].substring(0, addressSet1[2].indexOf(" "));

        let fullAddress = `${addressSet1[0]}
           <p>${addressSet2[0] + ", " + addressSet2[1] + " " + zip}</p>`
        let row = `<tr>
                       <td>
                        <div class="accordion">
                          <div class = "card-transparent border-0">
                              <div class="card-header info-card" id="contactName">
                                ${data[i].first_name + " " + data[i].last_name}
                              </div>
                              <div id="collapseInfo" class="collapse hide" aria-labelledby="contactName" data-parent="#showHide">
                              <div class="card-body">
                                <div id = "address-block">
                                <i class="fas fa-home fa-lg text-dark"></i>
                                  ${fullAddress}
                                </div>
                                <div id = "phone-email-block">
                                <i class="fas fa-phone-alt fa-lg text-dark"></i>
                                  ${data[i].phone}
                              <br>
                              <i class="fas fa-envelope fa-lg text-dark"></i>
                                  ${data[i].contactEmail}
                                  </br>
                                  </div>
                                </div>
                                </div>
                          </div>
                         </div>
                        </td>
                        <td>
                            <div class="iconSet" style = "visibility: hidden;">
                                <i id="edit-button" class="fas fa-edit fa-lg text-dark" data-action="edit"></i>
                                <i id="info-button" class="fas fa-info-circle fa-lg text-dark" data-action="info"></i>
                                <i id="delete-button" class="fas fa-trash fa-lg text-dark" data-action="delete"></i>
                            </div>
                        </td>
                        </tr>`
        table.innerHTML += row;

    }
    // Add hover event to each row
    $("#myTable tr").hover(
        function () {
            $(this).find(".iconSet").css("visibility", "visible");
        },
        function () {
            $(this).find(".iconSet").css("visibility", "hidden");
        }
    );
}

function buildTable(data) {
    console.log(data);

    var table = document.getElementById('myTable');
    table.innerHTML = "";

    // Add icon set to each row but hide them
    for (let i = 0; i < data.length; i++) {
        // street, city state, zip country
        let addressSet1 = globalTableArray[i].address.split(",");
        // city state
        let addressSet2 = addressSet1[1].split(" ");

        let zip = addressSet1[2].substring(0, addressSet1[2].indexOf(" "));

        let fullAddress = `${addressSet1[0]}
           <p>${addressSet2[0] + ", " + addressSet2[1] + " " + zip}</p>`
        let row = `<tr>
                       <td>
                        <div class="accordion">
                          <div class = "card-transparent border-0">
                              <div class="card-header info-card" id="contactName">
                                ${data[i].first_name + " " + data[i].last_name}
                              </div>
                              <div id="collapseInfo" class="collapse hide" aria-labelledby="contactName" data-parent="#showHide">
                              <div class="card-body">
                                <div id = "address-block">
                                <i class="fas fa-home fa-lg text-dark"></i>
                                  ${fullAddress}
                                </div>
                                <div id = "phone-email-block">
                                <i class="fas fa-phone-alt fa-lg text-dark"></i>
                                  ${data[i].phone}
                              <br>
                              <i class="fas fa-envelope fa-lg text-dark"></i>
                                  ${data[i].contactEmail}
                                  </br>
                                  </div>
                                </div>
                                </div>
                          </div>
                         </div>
                        </td>
                        <td>
                            <div class="iconSet" style = "visibility: hidden;">
                                <i id="edit-button" class="fas fa-edit fa-lg text-dark" data-action="edit"></i>
                                <i id="info-button" class="fas fa-info-circle fa-lg text-dark" data-action="info"></i>
                                <i id="delete-button" class="fas fa-trash fa-lg text-dark" data-action="delete"></i>
                            </div>
                        </td>
                        </tr>`
        table.innerHTML += row;

    }
    // Add hover event to each row
    $("#myTable tr").hover(
        function () {
            $(this).find(".iconSet").css("visibility", "visible");
        },
        function () {
            $(this).find(".iconSet").css("visibility", "hidden");
        }
    );


}

function handleClick(evt) {

    var { action } = evt.target.dataset;

    if (action) {
        if (action == "edit") {
            // Grabs current row index
            global_row_index = evt.target.closest("tr").rowIndex;

            let myModal = $("#edit-contact");

            let inputs = myModal.find("input");

            // Store array element contents into input fields
            inputs[0].value = globalTableArray[global_row_index].first_name; // firstname
            inputs[1].value = globalTableArray[global_row_index].last_name; // lastname
            inputs[2].value = globalTableArray[global_row_index].phone; // phone
            inputs[3].value = globalTableArray[global_row_index].contactEmail; // email

            // street, city state, zip country
            let addressSet1 = globalTableArray[global_row_index].address.split(",");
            // city state
            let addressSet2 = addressSet1[1].split(" ");

            let zip = addressSet1[2].substring(0, addressSet1[2].indexOf(" "));
            let country = addressSet1[2].substring(addressSet1[2].indexOf(" ") + 1);

            inputs[4].value = addressSet1[0]; // street
            inputs[5].value = addressSet2[0]; // city
            inputs[6].value = addressSet2[1]; // state
            inputs[7].value = zip; // zip
            inputs[8].value = country; // country

            console.log("inside edit icon");

            $('.edit-sidebar').addClass('active');
            $('.overlay').addClass('active');
        }
        else if (action == "info") {
            global_row_index = evt.target.closest("tr").rowIndex;
            // selects the current row
            let clickedRow = $(evt.target).closest("tr");

            clickedRow.find(".collapse").toggle();
        }
        else if (action == "delete") {
            // stores the row index
            global_row_index = evt.target.closest("tr").rowIndex;

            let inputs = $("#deleteContactInfo div");
            let address = globalTableArray[global_row_index].address.split(",");
            let street = address[0];
            let cityState = address[1];
            let zipCountry = address[2];

            console.log(address);
            console.log(street);
            console.log(inputs);

            $(inputs[0]).text(globalTableArray[global_row_index].first_name + " " + globalTableArray[global_row_index].last_name);

            $(inputs[1]).text(street + ", " + cityState + ", " + zipCountry);

            $(inputs[2]).text(globalTableArray[global_row_index].phone);

            $(inputs[3]).text(globalTableArray[global_row_index].contactEmail);

            // opening the sidebar
            $('.delete-sidebar').addClass('active');
            $('.overlay').addClass('active');
        }
    }
}


// Edit Confirm button - updates contact in database and table
$("#confirm-edit").click(async function () {
    let myModal = $("#edit-contact");

    let inputs = myModal.find("input");

    // Remove white space from both sides of input
    $(inputs).each(function (index, element) {
        $(this).val($.trim($(this).val()));
    });

    let formData = new FormData();

    formData.append('firstName', inputs[0].value);
    formData.append('lastName', inputs[1].value);
    formData.append('contactEmail', inputs[3].value);
    formData.append('address', `${inputs[4].value},${inputs[5].value} ${inputs[6].value},${inputs[7].value} ${inputs[8].value}`);
    formData.append('phone', inputs[2].value);
    formData.append('userEmail', userEmail);
    formData.append('id', globalTableArray[global_row_index].id);

    let response = await fetch(`${baseUrl}/editContact.php`, {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if(result['error'] != ''){
        console.log(`Error: ${result['error']}`);
        return;
    }

    requestTable();

    // closing sidebar menu
    $('.edit-sidebar').removeClass('active');
    $('.overlay').removeClass('active');


});


// Toggle between sorting in ascending order first name and last name
$("#firstLastName").click(function () {
    if (globalTableArray == undefined || globalTableArray.length < 1)
        return;

    let order = $(this).data('order');

    // Search bar empty or has content?
    let flag = ($("#search-bar").val() == "") ? 1 : 0;

    if (order == 'first') {
        $(this).data('order', 'last')

        if (flag) {
            globalTableArray = globalTableArray.sort((a, b) => a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : (a.last_name.toLowerCase() == b.last_name.toLowerCase() ? (a.first_name.toLowerCase() >= b.first_name.toLowerCase() ? 1 : -1) : -1));
        }
        else {
            globalFilter = globalFilter.sort((a, b) => a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : (a.last_name.toLowerCase() == b.last_name.toLowerCase() ? (a.first_name.toLowerCase() >= b.first_name.toLowerCase() ? 1 : -1) : -1));
        }
    }
    else {
        $(this).data('order', 'first')

        if (flag) {
            globalTableArray = globalTableArray.sort((a, b) => a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : (a.first_name.toLowerCase() == b.first_name.toLowerCase() ? (a.last_name.toLowerCase() >= b.last_name.toLowerCase() ? 1 : -1) : -1));
        }
        else {
            globalFilter = globalFilter.sort((a, b) => a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : (a.first_name.toLowerCase() == b.first_name.toLowerCase() ? (a.last_name.toLowerCase() >= b.last_name.toLowerCase() ? 1 : -1) : -1));
        }

        console.log(globalTableArray);
    }

    // If search is empty use global array else use global filter
    if (flag)
        buildTable(globalTableArray);
    else
        buildTable(globalFilter);
});

// addContact button- clears out form fields
$("#addContact").click(function () {
    // Grabs input from each form field
    $(".add-info .form-control").each(function (index) {
        $(this).val('');
        $(this).css("background-color", "");
    })
});

// recentlyAdded button - sorts users by recently added
$("#recentlyAdded").click(function () {
    if (globalTableArray == undefined || globalTableArray.length < 1)
        return;

    var flag = ($("#search-bar").val() == "") ? 1 : 0;

    if (flag) {
        globalTableArray = globalTableArray.sort((a, b) => {
            let dateA = new Date(a.dateCreated);
            let dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
    }
    else {
        globalFilter = globalFilter.sort((a, b) => {
            let dateA = new Date(a.dateCreated);
            let dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
    }

    if (flag)
        buildTable(globalTableArray);
    else
        buildTable(globalFilter);
})

// confirm add button - modal button that adds user to database

$("#confirm-add").click( async function () {
    let myModal = $("#add-contact");

    let inputs = myModal.find("input");

    let formData = new FormData();

    $(inputs).each(function (index, element) {
        $(this).val($.trim($(this).val()));
    });

    console.log(inputs);

    formData.append('firstName', inputs[0].value);
    formData.append('lastName', inputs[1].value);
    formData.append('contactEmail', inputs[3].value);
    formData.append('address', `${inputs[4].value},${inputs[5].value} ${inputs[6].value},${inputs[7].value} ${inputs[8].value}`);
    formData.append('phone', inputs[2].value);
    formData.append('userEmail', userEmail);

    let response = await  fetch(`${baseUrl}/addContact.php`, {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if(result['error'] != ''){
        console.log(`Error: ${result['error']}`);
        return;
    }

    requestTable();

    $('.add-sidebar').removeClass('active');
    $('.overlay').removeClass('active');

});

$('#confirm-cancel-add').click(function () {

    $("#add-contact p").css("display", "none");

    $('.add-sidebar').removeClass('active');
    $('.overlay').removeClass('active');
});

$('#confirm-cancel-edit').click(function () {
    $('.edit-sidebar').removeClass('active');
    $('.overlay').removeClass('active');
});


$("#confirm-delete").click(async function () {
    // deleteContact(globalTableArray[global_row_index].contactId);

    let formData = new FormData();

    formData.append('id', globalTableArray[global_row_index].id);

    let response = await fetch(`${baseUrl}/deleteContact.php`, {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if(result['error'] != ''){
        console.log(`Error: ${result['error']}`);
        return;
    }

    requestTable();

    // closing the delete sidebar
    $('.delete-sidebar').removeClass('active');
    $('.overlay').removeClass('active');

});

$('#confirm-cancel-delete').click(function () {
    $('.delete-sidebar').removeClass('active');
    $('.overlay').removeClass('active');
});



// show/hide button - This will Show and hide the table
$("#showHide").click(function () {
    if (globalTableArray == undefined || globalTableArray.length < 0)
        return;

    $(".collapse").toggle();

})

// Sidebar menu
$('#addContact').on('click', function () {
    $('.add-sidebar').addClass('active');
    $('.overlay').addClass('active');

    $(".form-control").each(function (index) {
        $(this).val('');
    })
});


/* ---Edit Validation events--*/

// Phone
$("#add-phone").on('input', function (evt) {
    let phone = this;
    console.log(this);
    $(phone).val(phoneFormat(phone, "#error-add-phone"));
});

function emailValidation(sel, id) {
    let input = $(sel).val();
    let $error = $(id);
    let testExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    console.log("after trim:" + $(sel).val());
    $(sel).val($(sel).val().replace(/^\s+/, ""));
    console.log("before trim:" + $(sel).val());

    if (!testExp.test(input)) {
        $error.show();
        $error.text("Invalid email");
        $(sel).css("background-color", "pink");
    }
    else {
        $error.hide();
        $(sel).css("background-color", "");
    }
}

function phoneFormat(phone, error) {

    let input = $(phone).val();

    input = input.replace(/\D/g, '');

    input = input.substring(0, 10);

    if (input.length == 0) {
        input = input;
        $(error).show();
        $(error).text("Field is required");
    } else if (input.length < 4) {
        input = '(' + input;
        $(error).hide();
    } else if (input.length < 7) {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
        $(error).hide();
    } else {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
        $(error).hide();
    }
    return input;
}

document.addEventListener("click", handleClick);




