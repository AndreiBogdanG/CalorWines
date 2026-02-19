import list from "./wines.js";
import red_list from "./wines.js";
import white_list from "./wines.js";
import rose_list from "./wines.js";

const mainDiv = document.getElementById("gallery-div");

//Popup peste 18 ani:
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("ageModal");
  const btnYes = document.getElementById("ageYes");
  const btnNo = document.getElementById("ageNo");

  function openModal() {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  // Dacă NU este verificat în sesiunea curentă
  if (!sessionStorage.getItem("ageVerified")) {
    openModal();
  }

  btnYes.addEventListener("click", function () {
    sessionStorage.setItem("ageVerified", "true");
    closeModal();
  });

  btnNo.addEventListener("click", function () {
    window.location.href = "https://www.google.com";
  });
});














// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", function () {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

// Initialize animations and icons
AOS.init({
  duration: 800,
  once: true,
});
feather.replace();

function changeLargeImage(imageSrc) {
  const largeImage = document.getElementById("large-image");
  largeImage.src = imageSrc; // Schimbă sursa imaginii mari cu sursa imaginii mici
}

// Create the gallery cards:
for (let i = 1; i < list.length; i++) {
  // Verifica daca linkul e "#" si daca da, adauga proprietatea "onclick = return false"
  let onClickProp = "";
  if (list[i].link === "#") {
    onClickProp = "return false";
  } else {
    onClickProp = "";
  }

  const flipCardDiv = document.createElement("div");
  flipCardDiv.style.height = "100%";
  // flipCardDiv.id = `flipDiv${i + 1}`;
  flipCardDiv.className = "group relative overflow-hidden rounded-lg shadow-lg";
  flipCardDiv.setAttribute("data-aos", "fade-up");
  flipCardDiv.setAttribute("data-aos-delay", `${list[i].dataAosDelay}`);
  flipCardDiv.setAttribute(
    "onclick",
    `window.location.href='product.html?item=${list[i].item}';`,
  );
  flipCardDiv.innerHTML = ` 
    
  
  <img
      src="${list[i].image}"
      alt="Product Image"
      class="w-full h-64 object-cover transition duration-500 group-hover:scale-105 product_image"
      
    /> 

        
    <div 
      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition product-overlay"
    >
      <div class="text-center mobile-text-center p-4">
        <h3 class="text-amber-200 text-xl font-bold">${list[i].title}</h3>
        <p class="text-amber-200 mobile-text">${list[i].shortDescription}</p>
        <p class="text-amber-200 mobile-text">Price without VAT:</p>
        <p class="text-amber-200 mobile-text">${list[i].specs.priceWithoutVAT}</p>
      </div>
    </div>
    
  `;
  if (mainDiv) {
    mainDiv.appendChild(flipCardDiv);
  }
}

// 1. Preia parametrul "item" din URL
const params = new URLSearchParams(window.location.search);
var item = params.get("item"); // ex: "produs1"

if (!list[item]) {
  item = "0";
}

// Crează detaliile din pagina product.html
const productDiv = document.getElementById("product-div");
const newProductDiv = document.createElement("div");
newProductDiv.style.height = "100%";

newProductDiv.setAttribute("data-aos", "fade-up");
newProductDiv.setAttribute("data-aos-delay", `${list[item].dataAosDelay}`);

// Verifică dacă linkul este "#"
let onClickProp = "";

if (list[item].link === "#") {
  onClickProp = "return false";
} else {
  onClickProp = "";
}

const errorDiv = `
  <div class="text-3xl md:text-4xl font-bold text-center text-briar mb-16">
    <div class="product-div">                  
      <img 
        src="${list[item].image}"
        alt="Pipe 1"
        class="normalImage"
      />                      
    </div>
    <div class="center-div">          
      <a
        href="collection.html"
        class="btn inline-block briar-brown hover:briar-dark text-white px-8 py-3 rounded-full text-lg font-medium transition"
      >
        Back to the Wine Collection
      </a>    
    </div>
  </div>
`;

let generatedSmallImages = "";

for (let i = 1; i <= 15; i++) {
  const key = `image${i}`;
  if (list[item][key]) {
    generatedSmallImages += `
      <img 
        src="${list[item][key]}" 
        alt="Pipe ${i + 1}"   
        onerror="this.onerror=null; this.src='ery/placeholder.jpg'"
        class="small-image cursor-pointer w-1/6" />
    `;
  }
}
var noErrorSpecsDiv;
//Creeaza noErrorDiv pentru product page
if (list[item].specs) {
  noErrorSpecsDiv = `
  <div id="bigSpecsDiv">
           <div id="specsDiv">
           <span><span class="specText">Color: </span><span>  ${list[item].specs.color};</span></span>
           <span><span class="specText">Wine type: </span><span>   ${list[item].specs.wineType};</span></span>
           <span><span class="specText">Alcohol content: </span><span>   ${list[item].specs.alcoholContent};</span></span>
           
           </div>

  </div>`;
} else {
  noErrorSpecsDiv = ``;
}

var finalSpecsDiv;

const noErrorDiv = `
  <div class="text-3xl md:text-4xl font-bold text-center text-briar mb-16">
    ${list[item].title}
  </div>

  
  


  <div class="itemDescription">
    ${list[item].fullDescription}                
  </div>

  <!-- Imagini mici pe un singur rând -->
  <div class="product-images-div flex overflow-x-auto space-x-4 mb-8">
  ${generatedSmallImages}
</div>

  <!-- Imagine mare -->
  <div class="large-image-container mb-8">
    <img 
      id="large-image"
      src="${list[item].image}" 
      alt="Large Image"
      class="fullImage w-full"
    />
  </div>
  ${noErrorSpecsDiv}

   <!-- Pret -->
<div class="itemDescription">
    Price without VAT: ${list[item].specs.priceWithoutVAT}                
  </div>



  <!-- Butoane -->
  <div class="center-div">
 
    
    <a
      href="collection.html"
      class="btn inline-block briar-brown hover:briar-dark text-white px-8 py-3 rounded-full text-lg font-medium transition"
    >
      Back to the Wine Collection
    </a>    
  </div>
`;

if (list[item] && item !== "0") {
  newProductDiv.className =
    "group relative overflow-hidden rounded-lg shadow-lg";
  newProductDiv.innerHTML = noErrorDiv;
} else {
  newProductDiv.innerHTML = errorDiv;
}

if (productDiv) {
  productDiv.appendChild(newProductDiv);
}

// Atașează evenimentul de click pentru fiecare imagine mică
const smallImages = newProductDiv.querySelectorAll(".small-image");
smallImages.forEach((img) => {
  img.addEventListener("click", function () {
    changeLargeImage(img.src); // Schimbă imaginea mare la click pe o mică
  });
});
