const URL = "https://striveschool-api.herokuapp.com/api/product/";
const nuoviProdotti = function () {
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
      data.forEach((card) => {
        let prodotto = `<div class="card" style="width: 18rem;">
            <img src=${card.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-text">${card.description}</p>
              <p class="card-text">${card.brand}</p>
              <p class="card-text">${card.price}</p>
              <a href="#" class="btn btn-success">Edit</a>
              <a href="#" class="btn btn-dark b">More Info</a>
            </div>
          </div>`;
        let insCard = document.getElementById("containProd");
        insCard.innerHTML += prodotto;
      });
    });
};
window.onload = () => {
  nuoviProdotti();
};
