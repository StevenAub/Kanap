//Lier les articles de la page index
const productId = window.location.search.split('?=').join('');
const nameKanap = document.getElementById('title');
const descriptionKanap = document.getElementById('description');
const imageKanap = document.querySelector('.item__img');
const priceKanap = document.querySelector('#price');

async function fetchProduit() {
  await fetch(`http://localhost:3000/api/products/` + productId)
    .then((res) => res.json())
    .then((e) => {
      productData = e;
      //donne le titre a la page
      document.title = productData.name;
      //envoi les données de l'api sur ma page produit
      descriptionKanap.innerHTML = productData.description;
      nameKanap.innerHTML = productData.name;
      imageKanap.innerHTML = `<img src="${productData.imageUrl}"></img>`;
      priceKanap.innerHTML = productData.price;
      //Option de couleurs
      //Je selectionne mon element html
      const colorKanap = document.querySelector('select');
      //Je découpe mon array de couleurs
      let colorChoice = productData.colors;
      //Je découpe mon array des couleurs
      colorChoice.forEach((value, index) => {
        const newOption = new Option(colorChoice.slice(index, index + 1));

        colorKanap[colorKanap.length] = newOption;
      });
    })
    .catch((err) => alert('Oups, il y a une erreur! ', err));
}
fetchProduit();

const addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click', () => {
  const color = document.getElementById('colors').value;
  const quantity = document.getElementById('quantity').value;

  const optionCart = {
    id: productId,
    color: color,
    quantity: Number(quantity)
  };
  let productInLocalStorage = JSON.parse(localStorage.getItem('produits'));
  if (color === '' || quantity === '0') {
    alert('Veuillez remplir les champs');
  } else if (productInLocalStorage === null) {
    productInLocalStorage = [];
    productInLocalStorage.push(optionCart);
    localStorage.setItem('produits', JSON.stringify(productInLocalStorage));
    const message =
      quantity === '1'
        ? quantity + ' produit a été ajouté dans votre panier.'
        : quantity + ' produits ont été ajoutés dans votre panier';
    alert(message);
  } else if (productInLocalStorage !== null) {
    let add = true;
    for (let i of productInLocalStorage) {
      if (optionCart.id === i.id && optionCart.color === i.color) {
        add = false;
        i.quantity = i.quantity += optionCart.quantity;
        alert('Votre panier a été mis à jour.');
        localStorage.setItem('produits', JSON.stringify(productInLocalStorage));
      }
    }

    if (add) {
      const message =
        quantity === '1'
          ? quantity + ' produit a été ajouté dans votre panier.'
          : quantity + ' produits ont été ajoutés dans votre panier';
      alert(message);
      productInLocalStorage.push(optionCart);
      localStorage.setItem('produits', JSON.stringify(productInLocalStorage));
    }
  }
});
