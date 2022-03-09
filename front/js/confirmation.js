//recuper OrderId de l'url
const orderIdURL = window.location.search;

<<<<<<< HEAD
//extraire L'id de l'url
const commandId = orderIdURL.slice(7);

function commandValid() {
  const idDisplay = document.getElementById('orderId');
  idDisplay.innerHTML = `<br>${commandId}`;
  localStorage.removeItem('produits');
}
commandValid();
=======
let form = document.querySelector('form');
var firstNameValid, lastNameValid, addressValid, cityValid, emailValid;
//-----------------------------------------------------------------------
form.firstName.addEventListener('change', async function () {
    validFirstName(this);
    console.log(form.firstName.defaultChecked);
    firstNameValid = form.firstName.defaultChecked;
});
const validFirstName = async function (inputName) { //RZF validLastName & validFirstName are verry similar. It could be refactor in one function
    valid = false;
    let nameRegExp = new RegExp('^[a-zA-Z]{2,20}$');
    let testName = nameRegExp.test(inputName.value);
    let errorMessage = inputName.nextElementSibling;

    if (testName === true) {
        form.firstName.style.border = '2px green solid';  //RZF create a function to remove redundant code
        errorMessage.innerHTML = '';  //RZF create a function to remove redundant code
        form.firstName.defaultChecked = true;  //RZF create a function to remove redundant code
    } else {
        errorMessage.innerHTML = 'Prénom non valide';  //RZF create a function to remove redundant code
        form.firstName.style.border = '2px red solid';  //RZF create a function to remove redundant code
        form.firstName.defaultChecked = false;  //RZF create a function to remove redundant code
    }
};

//-----------------------------------------------------------------------
form.lastName.addEventListener('change', function () {
    validLastName(this);
    lastNameValid = form.lastName.defaultChecked;
});
const validLastName = function (inputLastName) { //RZF validLastName & validFirstName are verry similar. It could be refactor in one function
    let lastNameRegExp = new RegExp('^[a-zA-Z]{2,20}$');
    let testName = lastNameRegExp.test(inputLastName.value);
    let errorMessage = inputLastName.nextElementSibling;
    if (testName === true) {
        form.lastName.style.border = '2px green solid';  //RZF create a function to remove redundant code
        errorMessage.innerHTML = '';  //RZF create a function to remove redundant code
        form.lastName.defaultChecked = true;  //RZF create a function to remove redundant code
    } else {
        errorMessage.innerHTML = 'Nom non valide';  //RZF create a function to remove redundant code
        form.lastName.style.border = '2px red solid';  //RZF create a function to remove redundant code
        form.lastName.defaultChecked = false;  //RZF create a function to remove redundant code
    }
};
//-----------------------------------------------------------------------
form.address.addEventListener('change', function () {
    validAddress(this);
    addressValid = form.address.defaultChecked;
});
const validAddress = function (inputAddress) {
    let adressRegExp = new RegExp('^[a-zA-Z0-9- /]{2,30}$');
    let testAddress = adressRegExp.test(inputAddress.value);
    let errorMessage = inputAddress.nextElementSibling;
    if (testAddress === true) {
        form.address.style.border = '2px green solid'; //RZF create a function to remove redundant code
        errorMessage.innerHTML = '';  //RZF create a function to remove redundant code
        form.address.defaultChecked = true;  //RZF create a function to remove redundant code
    } else {
        errorMessage.innerHTML = 'Addresse non valide';  //RZF create a function to remove redundant code
        form.address.style.border = '2px red solid';  //RZF create a function to remove redundant code
        form.address.defaultChecked = false;  //RZF create a function to remove redundant code
    }
};
//-----------------------------------------------------------------------
form.city.addEventListener('change', function () {
    validCity(this);
    cityValid = form.city.defaultChecked;
});
const validCity = function (inputCity) {
    let cityRegExp = new RegExp('^[a-zA-Z- éè/]{2,30}$');
    let testCity = cityRegExp.test(inputCity.value);
    let errorMessage = inputCity.nextElementSibling;
    if (testCity === true) {
        form.city.style.border = '2px green solid';  //RZF create a function to remove redundant code
        errorMessage.innerHTML = '';   //RZF create a function to remove redundant code
        form.city.defaultChecked = true;  //RZF create a function to remove redundant code
    } else {
        errorMessage.innerHTML = 'Ville non valide';  //RZF create a function to remove redundant code
        form.city.style.border = '2px red solid';  //RZF create a function to remove redundant code
        form.city.defaultChecked = false;  //RZF create a function to remove redundant code
    }
};

//------------------------------------------------------------------------
form.email.addEventListener('change', function () {
    console.log('coucou');
    validEmail(this);
    emailValid = form.email.defaultChecked;
});
const validEmail = function (inputEmail) {
    //Creation de l'expession réguliere pour email
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9._-]{1,20}[@]{1}[a-zA-Z0-9]{1,20}[.]{1}[a-z]{1,10}$',
        'g'
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    let errorMessage = inputEmail.nextElementSibling;
    if (testEmail === true) {
        form.email.style.border = '2px green solid';  //RZF create a function to remove redundant code
        errorMessage.innerHTML = '';  //RZF create a function to remove redundant code
        form.email.defaultChecked = true;  //RZF create a function to remove redundant code
    } else {
        errorMessage.innerHTML = 'Adresse e-mail non valide';  //RZF create a function to remove redundant code
        form.email.style.border = '1px red solid';  //RZF create a function to remove redundant code + RZF Why 1px when all other are 2px
        form.email.defaultChecked = false;  //RZF create a function to remove redundant code
    }
};

//-------------------------------------------------------------------------------------------------------------------
//Recuperer les infos client + infos commande
const command = document.getElementById('order');
command.addEventListener('click', (e) => {
    e.preventDefault();
    if (
        firstNameValid === true &&
        lastNameValid === true &&
        addressValid === true &&
        emailValid === true &&
        cityValid === true
    ) {
        //RZF create contact object
        //const contact = {
        //    lastName: document.getElementById('lastName').value,
        //    firstName: document.getElementById('firstName').value,
        //    address: document.getElementById('address').value;,
        //    ...
        //}

        lastNameId = document.getElementById('lastName').value;
        firstNameId = document.getElementById('firstName').value;
        addressId = document.getElementById('address').value;
        cityId = document.getElementById('city').value;
        emailId = document.getElementById('email').value;
        // localStorage.removeItem('produits');
        // alert('Commande validée.');
        const infoClient = {
            lastNameId,
            firstNameId,
            addressId,
            cityId,
            emailId
        };
        //RZF Give a callbck to user when the command is register and catch error
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoClient)
        })

        //location.reload();
    } else {
        alert('Veuillez remplir correctement les champs.');
    }
});
>>>>>>> 137693f8fa5a312a4f2acdc02f028befb8bda209
