// Datos de productos
const products = [
  {
    name: "Conejito Amigurumi",
    description: "Un tierno conejito hecho a mano.",
    price: "$15.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Osito Amigurumi",
    description: "Osito suave y adorable.",
    price: "$18.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Flor Tejida",
    description: "Flor de colores vivos, ideal para decoración.",
    price: "$8.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Gatito Amigurumi",
    description: "Un lindo gatito tejido con amor.",
    price: "$20.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Alfombra de Crochet",
    description: "Ideal para decorar cualquier espacio.",
    price: "$30.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Alfombra de Crochet",
    description: "Ideal para decorar cualquier espacio.",
    price: "$30.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Alfombra de Crochet",
    description: "Ideal para decorar cualquier espacio.",
    price: "$30.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Alfombra de Crochet",
    description: "Ideal para decorar cualquier espacio.",
    price: "$30.00",
    image: "../Imagenes/lufy.png"
  },
  {
    name: "Alfombra de Crochet",
    description: "Ideal para decorar cualquier espacio.",
    price: "$30.00",
    image: "../Imagenes/lufy.png"
  }
];

// Número de WhatsApp
const numeroWhatsApp = "51943455384"; // Reemplaza con tu número de WhatsApp

// Referencias al DOM
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

// Función para renderizar productos
function renderProducts(filter = "") {
  productGrid.innerHTML = "";

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.description.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <a 
        href="https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
          `Hola, me interesa el producto "${product.name}" y estoy dispuesto a pagar ${product.price}.`
        )}" 
        target="_blank" 
        class="buy-btn">Comprar</a>
    `;

    productGrid.appendChild(productCard);
  });

  // Agregar observador a los productos
  observeProducts();
}

// IntersectionObserver para animaciones
function observeProducts() {
  const cards = document.querySelectorAll(".product-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  cards.forEach(card => observer.observe(card));
}

// Escuchar eventos del buscador
searchInput.addEventListener("input", (e) => {
  const filter = e.target.value;
  renderProducts(filter);
});

// Renderizar los productos iniciales
renderProducts();
