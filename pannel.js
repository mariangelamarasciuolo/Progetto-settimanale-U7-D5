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
              <div  onclick="editProd('${card.name}','${card.imageUrl}','${card.description}','${card.brand}','${card.price}','${card._id}')" data-bs-toggle="modal" data-bs-target="#modificaProdotto" class="btn btn-success"><i class="bi bi-pencil-square"></i></div>
              <div  onclick="visualizza('${card.name}','${card.imageUrl}','${card.description}','${card.brand}','${card.price}')" data-bs-toggle="modal" data-bs-target="#visualizzaProdotto" class="btn btn-dark b">More Info</div>
              <div onclick="deleteD('${card._id}')"  class="btn btn-danger b"><i class="bi bi-trash2-fill"></i></div>
            </div>
          </div>`;
        let insCard = document.getElementById("containProd");
        insCard.innerHTML += prodotto;
      });
    });
}

function editProd(name, img, description, brand, price, id) {
  document.getElementById("name").value = name;
  document.getElementById("image").value = img;
  document.getElementById("description").value = description;
  document.getElementById("brand").value = brand;
  document.getElementById("price").value = price;
  let save = document.getElementById("saveProduct");
  save.setAttribute("onclick", "save('" + id + "')");
}
function save(id) {
  let name = document.getElementById("name").value;
  let img = document.getElementById("image").value;
  let description = document.getElementById("description").value;
  let brand = document.getElementById("brand").value;
  let price = document.getElementById("price").value;

  let modifycard = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: img,
    price: price,
  };


  fetch( URL + id, {
    method: "PUT",
    body: JSON.stringify(modifycard),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJkNzY4NWVjNDAwMTQ1MGI4OWEiLCJpYXQiOjE2OTI5NTM1NTksImV4cCI6MTY5NDE2MzE1OX0.HbPPUa_VnfG0vxc3JnvtTznc4l1zxjgJRw7sjA3nJX8",
      "content-type": "application/JSON",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("PRODOTTO MODIFICATO CON SUCCESSO");
        location.assign("index.html");
      } else {
        alert("OPS C'E' STATO UN ERRORE");
        throw new Error("OPS C'E' STATO UN ERRORE");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteD(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJkNzY4NWVjNDAwMTQ1MGI4OWEiLCJpYXQiOjE2OTI5NTM1NTksImV4cCI6MTY5NDE2MzE1OX0.HbPPUa_VnfG0vxc3JnvtTznc4l1zxjgJRw7sjA3nJX8",
    },
  };

  fetch(URL + id, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("problemi di connessione");
      }
      return response.json();
    })
    .then((data) => {
      alert("PRODOTTO ELIMINATO CON SUCCESSO");
      insCard.innerHTML = "";
      nuoviProdotti();
    })
    .catch((error) => {
      console.log(error);
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
