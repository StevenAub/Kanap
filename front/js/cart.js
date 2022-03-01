let productInLocalStorage = JSON.parse(localStorage.getItem('produits'));
let article = document.getElementById('cart__items');
let priceProduct = [];
let priceTotal = [];

//Je recupere l'id et le prix du produit sur mon api
const url = 'http://localhost:3000/api/products';
async function recupererPrix() {
  const requete = await fetch(url, {
    method: 'GET'
  });
  if (!requete.ok) {
    alert('Un problème est survenu.');
  } else {
    donnees = await requete.json();
  }
}

if (productInLocalStorage === null) {
  const titre = document.querySelector('.cartAndFormContainer');
  const title = titre.childNodes;

  title[1].textContent = `Votre panier est vide`;
}

//affiche les produit de mon local storage dans panier
async function affichePrixSurPanier() {
  await recupererPrix();
  console.log(productInLocalStorage);
  if (productInLocalStorage !== null) {
    donnees.forEach((element) => {
      for (i = 0; i < productInLocalStorage.length; i++) {
        if (productInLocalStorage[i].id === element._id) {
          price = {
            prix: element.price,
            image: element.imageUrl,
            name: element.name
          };
          let priceCartProduct =
            element.price * productInLocalStorage[i].quantity;
          priceProduct.push(priceCartProduct);
          let e = document.createElement('article');
          e.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src=${price.image} alt="Photographie d'un canapé">
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
        }
      }
    });
  }
}
//------------------------------------------------------------------------------------------------------------------
//Modifier la quantitée d'un article dans le panier

//------------------------------------------------------------------------------------------------------------------
//Calucler la quantitée Total des articles
let QuantityTotalCalcul = [];
console.log(QuantityTotalCalcul);
function CalculerQuantitee() {
  for (let m = 0; m < productInLocalStorage.length; m++) {
    let quantiteProduitPanier = productInLocalStorage[m].quantity;
    //mettre les quantiter dans le tableau
    QuantityTotalCalcul.push(quantiteProduitPanier);
  }
}
CalculerQuantitee();
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const quantityTotal = QuantityTotalCalcul.reduce(reducer, 0);
console.log(quantityTotal);
document.getElementById('totalQuantity').textContent = quantityTotal;
//-------------------------------------------------------------------------------------------------------------------
//Calculer la somme Total des Produits
let sumTotalCalcul = [];
console.log(sumTotalCalcul);
async function calculateSum() {
  await affichePrixSurPanier();
  console.log(priceProduct);
  priceProduct.forEach((e) => {
    sumTotalCalcul.push(e);
  });

  const sumTotalQuantity = sumTotalCalcul.reduce(reducer, 0);
  document.getElementById('totalPrice').textContent = sumTotalQuantity;
  console.log(sumTotalQuantity);
}

calculateSum();
//-------------------------------------------------------------------------------------------------------------------
//Supprimer Produits

const btnDelete = document.getElementsByClassName('deleteItem');
async function deleteItem() {
  // await affichePrixSurPanier();
  for (let i = 0; i < btnDelete.length; i++) {
    btnDelete[i].addEventListener('click', () => {});
  }
}
deleteItem();
