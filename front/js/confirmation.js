//recuper OrderId de l'url
const orderIdURL = window.location.search;

//extraire L'id de l'url
const commandId = orderIdURL.slice(7);

function commandValid() {
  const idDisplay = document.getElementById('orderId');
  idDisplay.innerHTML = `<br>${commandId}`;
  localStorage.removeItem('produits');
}
commandValid();
