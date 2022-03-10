let productInLocalStorage = JSON.parse(localStorage.getItem('produits'));
let article = document.getElementById('cart__items');
let priceProduct = [];
//Je recupere l'id et le prix du produit sur mon api
const url = 'http://localhost:3000/api/products';
async function retrievePrice() {
  const requete = await fetch(url, {
    method: 'GET'
  });
  if (!requete.ok) {
    alert('Un problème est survenu.');
  } else {
    data = await requete.json();
  }
}
//Si mon LocalStorage est vide
if (productInLocalStorage === null || productInLocalStorage.length === 0) {
  const titre = document.querySelector('.cartAndFormContainer');
  const title = titre.childNodes;
  title[1].textContent = `Votre panier est vide`;
}
//affiche les produit de mon local storage dans panier
async function displayPrice() {
  await retrievePrice();
  if (productInLocalStorage !== null) {
    data.forEach((element) => {
      for (i = 0; i < productInLocalStorage.length; i++) {
        if (productInLocalStorage[i].id === element._id) {
          const price = {
            price: element.price,
            image: element.imageUrl,
            name: element.name
          };
          let priceCartProduct =
            element.price * productInLocalStorage[i].quantity;
          priceProduct.push(priceCartProduct);
          let e = document.createElement('article');
          e.innerHTML = `<article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}">
    <div class="cart__item__img">
      <img src=${price.image} alt="Photographie du canapé ${price.name}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${price.name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p id="price">${price.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${productInLocalStorage[i].quantity}</p>
          <input type="number" id="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[i].quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
          article.appendChild(e);
        }
      }
    });

    deleteProductInCart();
    changeQuantityCart();
  }
}
//Suppression des article depuis la page panier
function deleteProductInCart() {
  const btnDelete = document.querySelectorAll('.deleteItem');
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', () => {
      const article = btn.closest('article');
      const articleID = article.dataset.id;
      const articleColor = article.dataset.color;
      for (let i = 0; i < productInLocalStorage.length; i++) {
        if (
          articleID === productInLocalStorage[i].id &&
          articleColor === productInLocalStorage[i].color
        ) {
          productInLocalStorage.splice(i, 1);
          localStorage.setItem(
            'produits',
            JSON.stringify(productInLocalStorage)
          );
          location.reload();
        }
      }
    });
  });
}
//Changer la quantité d'un produit depuis la page panier avec l'input
function changeQuantityCart() {
  const inputQuantity = document.querySelectorAll('#itemQuantity');
  inputQuantity.forEach((e) => {
    e.addEventListener('change', () => {
      const valueInput = Number(e.value);
      const article = e.closest('article');
      const articleID = article.dataset.id;
      const articleColor = article.dataset.color;
      console.log(valueInput);
      for (let i = 0; i < productInLocalStorage.length; i++) {
        if (
          articleID === productInLocalStorage[i].id &&
          articleColor === productInLocalStorage[i].color
        ) {
          productInLocalStorage[i].quantity = valueInput;
          localStorage.setItem(
            'produits',
            JSON.stringify(productInLocalStorage)
          );
          location.reload();
          if (productInLocalStorage[i].quantity === 0) {
            productInLocalStorage.splice(i, 1);
            console.log(productInLocalStorage);
            localStorage.setItem(
              'produits',
              JSON.stringify(productInLocalStorage)
            );
            location.reload();
          }
        }
      }
    });
  });
}
//Calucler la quantitée Total des articles
const sum = (accumulator, currentValue) => accumulator + currentValue;
let totalQuantityCalculation = [];
async function calculateQuantity() {
  {
    for (let m = 0; m < productInLocalStorage.length; m++) {
      let quantiteProduitPanier = productInLocalStorage[m].quantity;
      //mettre les quantiter dans le tableau
      totalQuantityCalculation.push(quantiteProduitPanier);
    }
  }
}
calculateQuantity();
const quantityTotal = totalQuantityCalculation.reduce(sum, 0);
document.getElementById('totalQuantity').textContent = quantityTotal;
//Calculer la somme Total des Produits
let sumTotalCalcul = [];
async function calculateSum() {
  await displayPrice();
  priceProduct.forEach((e) => {
    sumTotalCalcul.push(e);
  });

  const sumTotalQuantity = sumTotalCalcul.reduce(sum, 0);
  document.getElementById('totalPrice').textContent = sumTotalQuantity;
}
calculateSum();

const form = document.querySelector('form');
const input = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);
let firstName, lastName, address, city, email;

const errorDisplay = (tag, message, valid) => {
  const container = document.getElementsByName(tag);
  const messageError = document.getElementById(tag + 'ErrorMsg');
  if (!valid) {
    console.log(container);
    messageError.textContent = message;
    container[0].style.border = '3px red solid';
    validInput = false;
  } else {
    messageError.textContent = '';
    container[0].style.border = '3px green solid';

    validInput = true;
  }
};
const firstNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z-]*$/)) {
    errorDisplay('firstName', "Le prénom n'est pas valide");
    firstName = null;
  } else {
    errorDisplay('firstName', '', true);
    firstName = value;
  }
};
const lastNameChecker = (value) => {
  if (!value.match(/^[a-zA-Z-]*$/)) {
    errorDisplay('lastName', "Le nom n'est pas valide");
    lastName = null;
  } else {
    errorDisplay('lastName', '', true);
    lastName = value;
  }
};
const addressChecker = (value) => {
  if (!value.match(/^[a-zA-Z0-9- /]{2,30}$/)) {
    errorDisplay('address', "L'addresse n'est pas valide");
    address = null;
  } else {
    errorDisplay('address', '', true);
    address = value;
  }
};
const cityChecker = (value) => {
  if (!value.match(/^[a-zA-Z- éè/]{2,30}$/)) {
    errorDisplay('city', "La ville n'est pas valide");
    city = null;
  } else {
    errorDisplay('city', '', true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9._-]{1,20}[@]{1}[a-zA-Z0-9]{1,20}[.]{1}[a-z]{1,10}$/
    )
  ) {
    errorDisplay('email', "L'adresse email n'est pas valide");
    email = null;
  } else {
    errorDisplay('email', '', true);
    email = value;
  }
};

input.forEach((input) => {
  //on ecoute tous les inputs
  input.addEventListener('input', (e) => {
    switch (e.target.id) {
      case 'firstName':
        firstNameChecker(e.target.value);
        break;
      case 'lastName':
        lastNameChecker(e.target.value);
        break;
      case 'email':
        emailChecker(e.target.value);
        break;
      case 'city':
        cityChecker(e.target.value);
        break;
      case 'address':
        addressChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});

//Recuperer les infos client + infos commande

const command = document.getElementById('order');
let orderId = 0;

command.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(productInLocalStorage);
  if (productInLocalStorage === null) {
    alert('Aucun produit dans votre panier.');
  } else if (validInput === true) {
    let order = {
      contact: {
        lastName,
        firstName,
        address,
        city,
        email
      },
      products: [],
      productColor: [],
      productQuantity: []
    };
    productInLocalStorage.forEach((product) => {
      order.products.push(product.id);
      order.productColor.push(product.color);
      order.productQuantity.push(product.quantity);
    });

    fetch(`http://localhost:3000/api/products/order`, {
      method: 'POST',
      body: JSON.stringify(order),

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.orderId);
        document.location.href = `confirmation.html?order=${response.orderId}`;
      })
      .catch((err) => {
        alert('Une erreur est survenue ' + err);
      });
  } else {
    alert('Veuillez remplir correctement les champs.');
  }
});
