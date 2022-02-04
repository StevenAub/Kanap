//Lier les articles de la page index
const product = window.location.search.split('?=').join('');
const nameKanap = document.getElementById('title');
const descriptionKanap = document.getElementById('description');
const imageKanap = document.querySelector('.item__img');
const priceKanap = document.querySelector('#price');
productData = [];
//console.log(product);

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
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
    });
};

fetchProduit();
