let productInLocalStorage = JSON.parse(localStorage.getItem('produits'));
let article = document.getElementById('cart__items');
let priceProduct = [];

//Je recupere l'id et le prix du produit sur mon api
const url = 'http://localhost:3000/api/products';
async function recupererPrix() {
  const requete = await fetch(url, {
    method: 'GET'
  });
  if (!requete.ok) {
    alert('Un problème est survenu.');
  } else {
    donnees = await requete.json(); //RZF everything in english or in french not both
  }
}
//Si mon LocalStorage est vide
if (productInLocalStorage === null || productInLocalStorage.length === 0) {
  const titre = document.querySelector('.cartAndFormContainer');
  const title = titre.childNodes;
  delete productInLocalStorage;  //RZF : Useless => remove
  title[1].textContent = `Votre panier est vide`;
}
//affiche les produit de mon local storage dans panier
async function affichePrixSurPanier() {  //RZF everything in english or in french not both
  await recupererPrix();

  if (productInLocalStorage !== null) {
    donnees.forEach((element) => {
      for (i = 0; i < productInLocalStorage.length; i++) {
        if (productInLocalStorage[i].id === element._id) {
          price = {  //RZF Missing const
            prix: element.price, //RZF everything in english or in french not both
            image: element.imageUrl,
            name: element.name
          };
          let priceCartProduct =
            element.price * productInLocalStorage[i].quantity;
          priceProduct.push(priceCartProduct);
          let e = document.createElement('article');
          //RZF Maybe the use of a HTML template is cleaner
          e.innerHTML = `<article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}">
    <div class="cart__item__img">
      <img src=${price.image} alt="Photographie du canapé ${price.name}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${price.name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p id="price">${price.prix}</p>
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

          //------------------------------------------------------------------------------------------------------------------  //RZF Useless
        }
      }
    });

    deleteProductInCart();
    changeQuantityCart();
  }
}
//-----------------------------------------------------------------------------------------------------------------------------  //RZF Useless
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
//------------------------------------------------------------------------------------------------------------------  //RZF Useless
//Changer la quantité d'un produit depuis la page panier avec l'input
function changeQuantityCart() {
  const inputQuantity = document.querySelectorAll('#itemQuantity');
  inputQuantity.forEach((e) => {
    e.addEventListener('change', () => {
      valueInput = Number(e.value); // RZF missing const
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
          console.log(productInLocalStorage);
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

//------------------------------------------------------------------------------------------------------------------  //RZF Useless
//Calucler la quantitée Total des articles
const reducer = (accumulator, currentValue) => accumulator + currentValue;  //RZF reducer isn't explicit => rename sum

let QuantityTotalCalcul = [];
async function CalculerQuantitee() {  // RZF Why CalculerQuantitEE with 2 'e'
  for (let m = 0; m < productInLocalStorage.length; m++) {
    let quantiteProduitPanier = productInLocalStorage[m].quantity;
    //mettre les quantiter dans le tableau
    QuantityTotalCalcul.push(quantiteProduitPanier);
  }
}
CalculerQuantitee();
const quantityTotal = QuantityTotalCalcul.reduce(reducer, 0); // RZF Inline
document.getElementById('totalQuantity').textContent = quantityTotal;

//-------------------------------------------------------------------------------------------------------------------  //RZF Useless
//Calculer la somme Total des Produits
let sumTotalCalcul = [];
async function calculateSum() {
  await affichePrixSurPanier();
  priceProduct.forEach((e) => {
    sumTotalCalcul.push(e);
  });

  const sumTotalQuantity = sumTotalCalcul.reduce(reducer, 0); //RZF Inline
  document.getElementById('totalPrice').textContent = sumTotalQuantity;
}

calculateSum();
