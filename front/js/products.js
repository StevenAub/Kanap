//Lier les articles de la page index
const productId = window.location.search.split('?=').join('');
const nameKanap = document.getElementById('title');
const descriptionKanap = document.getElementById('description');
const imageKanap = document.querySelector('.item__img');
const priceKanap = document.querySelector('#price');

//console.log(product);
//----------------------------------------------------------------------------------------------------------------------------
async function fetchProduit() {
  await fetch(`http://localhost:3000/api/products/` + productId)
    .then((res) => res.json())
    .then((e) => {
      productData = e;

      //donne le titre a la page
      document.title = productData.name;
      //console.log(productData);
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
  color = document.getElementById('colors').value;
  quantity = document.getElementById('quantity').value;
  quantity = Number(quantity);
  console.log(typeof quantity);

  addCart({ id: productId, color: color, quantity: quantity });
  getCart(quantity);
});
