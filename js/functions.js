import { showToast } from "./bootStrapAlert.js";

// common function to read localStorage Data
function getCrudData() {
  let prodData = JSON.parse(localStorage.getItem("Products")) || [];
  return prodData;
}

// function to show all user data on screen in table
export function showProducts(filteredProducts) {
  let _userData;
  if (filteredProducts == undefined) {
    _userData = getCrudData();
  } else {
    _userData = filteredProducts;
  }
  const getProdCard = document.querySelector(".products-card");
  // below line will stop printing details of old products
  getProdCard.innerHTML = "";
  // let _userData = getCrudData();
  const arr = _userData.map((obj) => {
    return `<div class="card">
      <div class="card-img">
      <img src=${obj.prodImage} >
      </div>
      <div class="card-info" data-id=${obj.prodName}>
        <p id="prodId">#${obj.prodId}</p>
        <p class="text-title" name="prodName">${obj.prodName.toUpperCase()}</p>
        <p class="text-body">${obj.prodDescription}</p>
      </div>
      <div class="card-footer">
      <span class="text-title">₹ ${obj.prodPrice}</span>
      <div class="card-button">
        <svg class="svg-icon" viewBox="0 0 20 20">
          <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
          <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
          <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
        </svg>
      </div>
    </div>
    <div class="buttons" data-id=${
      obj.prodId
    }><button type="button" class="btn btn-primary card-link" id="prodEdit" data-bs-toggle="modal" data-bs-target="#myexampleModal">Edit</button>
    <button class="btn btn-danger" id="prodDelete">Delete</button>
    </div>
    </div>`;
  });
  if (arr !== undefined && arr.length > 0) {
    // i is the key of the array
    for (let i of arr) {
      getProdCard.insertAdjacentHTML("beforeend", i);
    }
  } else if (arr.length <= 0) {
    getProdCard.innerHTML =
      '<img class="img-fluid no-data-found" src="/Asset/100465-no-data-found.gif">';
  }
  addEdit();
  addDelete();
}
showProducts();

// function to delete products
function deleteProduct(cardId) {
  // Get the current list of cards from local storage
  const inputData = getCrudData();

  // Find the index of the card with the given ID
  const cardIndex = inputData.findIndex((card) => card.prodId === cardId);

  // If the card was found, remove it from the list and update local storage
  if (cardIndex !== -1) {
    inputData.splice(cardIndex, 1);
    // showToast(`${card.prodName} removed`, 'bg-danger');

    // console.log(cardIndex);
    localStorage.setItem("Products", JSON.stringify(inputData));
  }
}

// Attach a click event listener to the delete button of each card
function addDelete() {
  const deleteButtons = document.querySelectorAll("#prodDelete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Get the ID of the product to delete
      const cardId = event.target.closest(".buttons").dataset.id;

      // Delete the card from local storage
      deleteProduct(cardId);

      // Remove the card from the DOM
      showProducts();

      // console.log(cardId);
      showToast(`Product with Id #${cardId} has been deleted`, "bg-danger");
    });
  });
}
// event listener to open edit products modal
function addEdit() {
  const myModal = new bootstrap.Modal("#myexampleModal");
  const editButton = document.querySelectorAll("#prodEdit");
  editButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      const cardId = event.target.closest(".buttons").dataset.id;
      // console.log(cardId);
      myModal.show();
      updateProductsModal(cardId);
    });
  });
}

// function to update products
function updateProductsModal(cardId) {
  let products = getCrudData();
  // console.log(products);
  products.forEach((obj) => {
    if (obj.prodId == cardId) {
      document.querySelector("#productId").value = obj.prodId;
      document.querySelector("#productName").innerText = obj.prodName;
      document.querySelector("#productPrice").value = obj.prodPrice;
      document.querySelector("#old-image").src = obj.prodImage;
      document.querySelector("#productDescription").value = obj.prodDescription;
    }
  });
}

// event listener for update product function
const productUpdate = document.querySelectorAll("#prodUpdate");
productUpdate.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const cardId = document.getElementById("productId").value;
    // console.log(cardId);
    updateProducts(cardId);
  });
});

// get Image file
document.getElementById("productImage").addEventListener("change", (event) => {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let dataURL = reader.result;
    let prodImage = document.getElementById("productImage");
    prodImage.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
});

// function to update product details
function updateProducts(cardId) {
  let prodId = document.getElementById("productId").value,
    prodName = document.getElementById("productName").value,
    prodPrice = document.getElementById("productPrice").value,
    prodImage = document.getElementById("productImage").src,
    prodDescription = document.getElementById("productDescription").value;
  if (
    prodId == "" ||
    prodName == "" ||
    prodPrice == "" ||
    prodImage == "" ||
    prodDescription == ""
  ) {
    showToast("Please fill all the fields", "bg-danger");
  } else {
    const oldProductsData = getCrudData();
    oldProductsData.forEach((elem) => {
      if (elem.prodId == cardId) {
        let index = oldProductsData.indexOf(elem);
        oldProductsData[index].prodId = prodId;
        oldProductsData[index].prodName = prodName;
        oldProductsData[index].prodPrice = prodPrice;
        oldProductsData[index].prodImage = prodImage;
        oldProductsData[index].prodDescription = prodDescription;
      }
      localStorage.setItem("Products", JSON.stringify(oldProductsData));
      showToast(`Product with Id #${cardId} has been updated`, "bg-success");
      document.getElementById("searchProduct").value = "";
    });
  }
  showProducts();
}

// function to search products by their name
function searchProductsByName() {
  const searchInput = document.getElementById("searchProduct");
  const products = getCrudData(); // console.log(searchInput.value);
  const filteredProducts = products.filter((product) => {
    return product.prodName
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });
  showProducts(filteredProducts);
}

let configureObj = {
  input: "",
  filter: "optId",
  sort: "optAsc",
};

// main function to perform data filter and sorting operation
function getTargetedData() {
  let arr = getCrudData();

  if (configureObj.input) {
    arr = arr.filter((obj) =>
      obj.prodName.toLowerCase().includes(configureObj.input.toLowerCase())
    );
  }

  const compareFn = (a, b) => {
    let valueA, valueB;

    if (configureObj.filter === "optId") {
      valueA = parseInt(a.prodId);
      valueB = parseInt(b.prodId);
    } else if (configureObj.filter === "optName") {
      valueA = a.prodName.toLowerCase();
      valueB = b.prodName.toLowerCase();
      // compare alphanumeric values
      if (valueA < valueB) {
        return configureObj.sort === "optAsc" ? -1 : 1;
      } else if (valueA > valueB) {
        return configureObj.sort === "optAsc" ? 1 : -1;
      } else {
        return 0;
      }
    } else if (configureObj.filter === "optPrice") {
      valueA = parseInt(a.prodPrice.replace(/[^0-9.-]+/g, ""));
      valueB = parseInt(b.prodPrice.replace(/[^0-9.-]+/g, ""));
    }

    return configureObj.sort === "optAsc" ? valueA - valueB : valueB - valueA;
  };

  arr.sort(compareFn);
  // console.log(arr);
  return arr;
}

// Debounce function for search input field
function myDebounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// event listener for search input field
const searchInput = document.getElementById("searchProduct");
searchInput.addEventListener(
  "input",
  myDebounce((e) => {
    configureObj.input = e.target.value;
    searchProductsByName();
    showProducts(getTargetedData());
  }, 500)
);

//event listener for products filter
const selectFilter = document.getElementById("productFilter");
selectFilter.addEventListener("change", function (e) {
  configureObj.filter = e.target.value;
  // getTargetedData();
  showProducts(getTargetedData());
});

//event listener for products sort
const selectSort = document.getElementById("productSort");
selectSort.addEventListener("change", function (e) {
  configureObj.sort = e.target.value;
  // getTargetedData();
  showProducts(getTargetedData());
});
