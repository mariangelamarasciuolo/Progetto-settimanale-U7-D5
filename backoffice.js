const URL = "https://striveschool-api.herokuapp.com/api/product/";
let content = new URLSearchParams(window.location.search);
let idProduct = content.get("idProduct");
console.log("idProduct", content);

if (idProduct) {
  document.getElementsByTagName("h2")[0].innerText = "Modifca il prodotto";
  document.getElementById(".salvaMod").innerText = "Modifica";
  document.getElementById(".cancMod").innerText = "Cancella";
  let cancellabtn = document.querySelector(".formProdotto");
  cancellabtn.classList.remove("d-none");
  cancellabtn.addEventListener("click", () => {
    fetch(URL + idProdotto, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJkNzY4NWVjNDAwMTQ1MGI4OWEiLCJpYXQiOjE2OTI5NTM1NTksImV4cCI6MTY5NDE2MzE1OX0.HbPPUa_VnfG0vxc3JnvtTznc4l1zxjgJRw7sjA3nJX8",
      },
      method: "DELETE",

/* chiedo scusa per il messaggio ma volevo solo avvisare che dovevo finire  */

    });
    
  });
}

const creaCard = document.getElementById("formProdotto");
creaCard.addEventListener("submit", function (pippo) {
  pippo.preventDefault();

  let nameInput = document.getElementById("name");
  let descriptionInput = document.getElementById("description");
  let brandInput = document.getElementById("brand");
  let imageUrlInput = document.getElementById("image");
  let priceInput = document.getElementById("price");

  let newCard = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };
  console.log("Nuovo prodotto", newCard);

  fetch(idProduct ? URL + idProduct : URL, {
    method: idProduct ? "PUT" : "POST",
    body: JSON.stringify(newCard),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmJkNzY4NWVjNDAwMTQ1MGI4OWEiLCJpYXQiOjE2OTI5NTM1NTksImV4cCI6MTY5NDE2MzE1OX0.HbPPUa_VnfG0vxc3JnvtTznc4l1zxjgJRw7sjA3nJX8",
      "content-type": "application/JSON",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert(("PRODOTTO CREATO"));
        location.assign("index.html");
      } else {
        alert("OPS C'E' STATO UN ERRORE");
        throw new Error("OPS C'E' STATO UN ERRORE");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const resetBtn = document.querySelector(".btnRes");
resetBtn.addEventListener("click", () => {
  creaCard.reset();
});
