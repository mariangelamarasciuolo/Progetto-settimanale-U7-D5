const URL = "https://striveschool-api.herokuapp.com/api/product/";
let insCard = document.getElementById("containProd");
function nuoviProdotti() {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJkNzY4NWVjNDAwMTQ1MGI4OWEiLCJpYXQiOjE2OTI5NTM1NTksImV4cCI6MTY5NDE2MzE1OX0.HbPPUa_VnfG0vxc3JnvtTznc4l1zxjgJRw7sjA3nJX8",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore nel caricamento del prodotto!");
      }
    })
    .then((data) => {
      console.log("elenco prodotti", data);
      data.forEach((card) => {
        let prodotto = `<div id="${card._id}" class="card" style="width: 18rem;">
            <img src=${card.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-text">${card.description}</p>
              <p class="card-text">${card.brand}</p>
              <p class="card-text">${card.price}</p>
              <div  onclick="visualizza('${card.name}','${card.imageUrl}','${card.description}','${card.brand}','${card.price}')" data-bs-toggle="modal" data-bs-target="#visualizzaProdotto" class="btn btn-dark b">More Info</div>
            </div>
          </div>`;
        let insCard = document.getElementById("containProd");
        insCard.innerHTML += prodotto;
      });
    });
}

function visualizza(name, img, description, brand, price ){
document.getElementById("visImg").setAttribute("src",img)
document.getElementById("visName").textContent = name;
document.getElementById("visDescription").textContent = description;
document.getElementById("visBrand").textContent= brand;
document.getElementById("visPrice").textContent = price
}
window.onload = () => {
  nuoviProdotti();
};
