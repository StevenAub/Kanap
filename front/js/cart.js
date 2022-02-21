let productInLocalStorage = JSON.parse(localStorage.getItem('produits'));

async function fetchProduct() {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((elements) => {
      let article = document.getElementById('cart__items');
      if (productInLocalStorage !== null) {
        for (i = 0; i < productInLocalStorage.length; i++) {
          let e = document.createElement('article');

          e.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
          <div class="cart__item__img">
            <img src=${productInLocalStorage[i].image} alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productInLocalStorage[i].name}</h2>
              <p>${productInLocalStorage[i].color}</p>
              <p>${elements[i].price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : ${productInLocalStorage[i].quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[i].quantity}>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
          article.appendChild(e);
        }
      } else {
        const titre = document.querySelector('.cartAndFormContainer');
        const title = titre.childNodes;

        title[1].textContent = `Votre panier est vide`;
      }
    });
}
fetchProduct();
