//--------------------------------------------------------------------------------------------------------------------
//Regex pour formulaire

let form = document.querySelector('form');
var firstNameValid, lastNameValid, addressValid, cityValid, emailValid;
//-----------------------------------------------------------------------
form.firstName.addEventListener('change', async function () {
  validFirstName(this);
  console.log(form.firstName.defaultChecked);
  firstNameValid = form.firstName.defaultChecked;
});
const validFirstName = async function (inputName) {
  valid = false;
  let nameRegExp = new RegExp('^[a-zA-Z]{2,20}$');
  let testName = nameRegExp.test(inputName.value);
  let errorMessage = inputName.nextElementSibling;

  if (testName === true) {
    form.firstName.style.border = '2px green solid';
    errorMessage.innerHTML = '';
    form.firstName.defaultChecked = true;
  } else {
    errorMessage.innerHTML = 'Prénom non valide';
    form.firstName.style.border = '2px red solid';
    form.firstName.defaultChecked = false;
  }
};

//-----------------------------------------------------------------------
form.lastName.addEventListener('change', function () {
  validLastName(this);
  lastNameValid = form.lastName.defaultChecked;
});
const validLastName = function (inputLastName) {
  let lastNameRegExp = new RegExp('^[a-zA-Z]{2,20}$');
  let testName = lastNameRegExp.test(inputLastName.value);
  let errorMessage = inputLastName.nextElementSibling;
  if (testName === true) {
    form.lastName.style.border = '2px green solid';
    errorMessage.innerHTML = '';
    form.lastName.defaultChecked = true;
  } else {
    errorMessage.innerHTML = 'Nom non valide';
    form.lastName.style.border = '2px red solid';
    form.lastName.defaultChecked = false;
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
    form.address.style.border = '2px green solid';
    errorMessage.innerHTML = '';
    form.address.defaultChecked = true;
  } else {
    errorMessage.innerHTML = 'Addresse non valide';
    form.address.style.border = '2px red solid';
    form.address.defaultChecked = false;
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
    form.city.style.border = '2px green solid';
    errorMessage.innerHTML = '';
    form.city.defaultChecked = true;
  } else {
    errorMessage.innerHTML = 'Ville non valide';
    form.city.style.border = '2px red solid';
    form.city.defaultChecked = false;
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
    form.email.style.border = '2px green solid';
    errorMessage.innerHTML = '';
    form.email.defaultChecked = true;
  } else {
    errorMessage.innerHTML = 'Adresse e-mail non valide';
    form.email.style.border = '1px red solid';
    form.email.defaultChecked = false;
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
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoClient)
    });

    //location.reload();
  } else {
    alert('Veuillez remplir correctement les champs.');
  }
});
