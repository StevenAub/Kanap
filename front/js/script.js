//Lien vers l'API
const fetchProduct = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((elements) => {
      //recuperation des données
      for (let post of elements) {
        //Creation des elements
        let p = document.getElementById('items');
        for (i = 0; i < 1; i++) {
          let e = document.createElement('div');
          e.innerHTML = `<a href="./product.html?id=42">
  <article>
    <img src=${post.imageUrl} alt="photo du cannapé ${post.name}">
    <h3 class="productName">${post.name}</h3>
    <p class="productDescription">${post.description}</p>
  </article>
</a>  `;
          p.appendChild(e);
        }
      }
    });
};

fetchProduct();