function saveCart(cart) {
  localStorage.setItem('produit', JSON.stringify(cart));
}
function getCart() {
  let cart = localStorage.getItem('produit');
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
//ajouter des produit
function addCart(product) {
  let cart = getCart();

  let foundProduct = cart.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    console.log(foundProduct.color);
  } else {
    product.quantity = quantity++;
    cart.push(product);
  }

  saveCart(cart);
}
//retirer des produit
function removeProduct(product) {
  let cart = getCart();
  cart = cart.filter((p) => p.id != product.id);
  saveCart(cart);
}
function changeQuantityProduct(product, quantity) {
  let cart = getCart();
  let foundProduct = cart.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeProduct(foundProduct);
    } else {
      saveCart(cart);
    }
  }
}
// nombre de produit
function getNumberProduct() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  return number;
}
//Calcul du prix
function getTotalPrice() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity * product.price;
  }
  return number;
}
