// Datos de productos (AHORA CON CATEGORÍA Y OCASIONES)
const products = [
    {
        name: "Conejito Amigurumi",
        description: "Un tierno conejito hecho a mano, perfecto para Pascua.",
        details: "Este conejito está tejido con hilo de algodón 100% hipoalergénico. Mide aproximadamente 20cm de alto y es ideal para recién nacidos.",
        price: "$15.00",
        image: "../Imagenes/lufy.png",
        category: "Animales", // Nueva propiedad
        occasions: ["Pascua", "Bebés", "Cumpleaños"] // Nueva propiedad
    },
    {
        name: "Osito Amigurumi",
        description: "Osito suave y adorable, ideal para regalos de San Valentín.",
        details: "Nuestro osito más popular, tejido con hilo de lana premium. Es un regalo romántico y duradero. ¡Disponible en varios colores!",
        price: "$18.00",
        image: "../Imagenes/lufy.png",
        category: "Animales",
        occasions: ["San Valentín", "Bebés", "Cumpleaños"]
    },
    {
        name: "Flor Tejida",
        description: "Flor de colores vivos, ideal para decoración o Día de la Madre.",
        details: "Una flor eterna que nunca se marchita. Incluye tallo de alambre flexible y viene en un pequeño macetero de crochet. ¡Perfecta para escritorios!",
        price: "$8.00",
        image: "../Imagenes/lufy.png",
        category: "Decoración",
        occasions: ["Día de la Madre", "Decoración"]
    },
    {
        name: "Gatito Amigurumi",
        description: "Un lindo gatito tejido con amor. Gran regalo navideño.",
        details: "Este gatito en posición durmiente es muy relajante. El relleno es de fibra siliconada que mantiene su forma a lo largo del tiempo. Un favorito de los coleccionistas.",
        price: "$20.00",
        image: "../Imagenes/lufy.png",
        category: "Animales",
        occasions: ["Navidad", "Cumpleaños"]
    },
    {
        name: "Alfombra de Crochet",
        description: "Ideal para decorar cualquier espacio, categoría hogar.",
        details: "Alfombra redonda de 80cm de diámetro, hecha con hilo de trapillo resistente. Aporta un toque rústico y acogedor a cualquier habitación.",
        price: "$30.00",
        image: "../Imagenes/lufy.png",
        category: "Hogar",
        occasions: ["Decoración", "Regalos"]
    },
    {
        name: "Muñeco de Nieve",
        description: "Perfecto para la temporada invernal y festividades.",
        details: "Muñeco de nieve clásico con bufanda y sombrero tejido. Un adorno navideño que encantará a toda la familia. Edición limitada.",
        price: "$25.00",
        image: "../Imagenes/lufy.png",
        category: "Personajes",
        occasions: ["Navidad"]
    }
];

// Número de WhatsApp
const numeroWhatsApp = "51943455384";

// Referencias al DOM
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const occasionFilterContainer = document.getElementById("occasionFilter");

// Variables de estado para filtros
let currentSearch = "";
let currentCategory = "all";
let currentOccasion = "all";

// ----------------------------------------------------
// --- FUNCIONES DE INICIALIZACIÓN DE FILTROS ---
// ----------------------------------------------------

// 1. Obtener categorías y ocasiones únicas
function getUniqueFilters() {
    const categories = new Set(["all"]); // 'all' es por defecto
    const occasions = new Set(["Todos"]); // 'Todos' es por defecto

    products.forEach(p => {
        categories.add(p.category);
        if (p.occasions) {
            p.occasions.forEach(occ => occasions.add(occ));
        }
    });

    return { 
        categories: Array.from(categories).sort(), 
        occasions: Array.from(occasions).sort((a, b) => {
            // Poner 'Todos' primero
            if (a === "Todos") return -1;
            if (b === "Todos") return 1;
            return a.localeCompare(b);
        }) 
    };
}

// 2. Generar el Select de Categorías
function populateCategoryFilter(categories) {
    categoryFilter.innerHTML = "";
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category === "all" ? "all" : category;
        option.textContent = category === "all" ? "Todas las Categorías" : category;
        categoryFilter.appendChild(option);
    });
}

// 3. Generar los Botones de Ocasión
function populateOccasionFilter(occasions) {
    occasionFilterContainer.innerHTML = "";
    occasions.forEach(occasion => {
        const button = document.createElement("button");
        button.classList.add("occasion-button");
        button.textContent = occasion;
        button.dataset.occasion = occasion === "Todos" ? "all" : occasion;

        if (occasion === "Todos") {
            button.classList.add("active"); // 'Todos' activo por defecto
        }
        
        button.addEventListener("click", handleOccasionClick);
        occasionFilterContainer.appendChild(button);
    });
}

// 4. Manejar el click en los botones de ocasión
function handleOccasionClick(e) {
    const newOccasion = e.target.dataset.occasion;

    // Desactivar botón activo actual
    document.querySelectorAll('.occasion-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Actualizar variable de estado
    currentOccasion = newOccasion;
    e.target.classList.add('active'); // Activar el botón seleccionado

    renderProducts();
}

// ----------------------------------------------------
// --- FUNCIÓN PRINCIPAL DE RENDERIZADO Y FILTRADO ---
// ----------------------------------------------------

function renderProducts() {
    productGrid.innerHTML = "";

    const filteredProducts = products.filter(product => {
        // 1. Filtrar por Nombre/Descripción (Search Input)
        const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.description.toLowerCase().includes(currentSearch.toLowerCase());

        // 2. Filtrar por Categoría (Select)
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;

        // 3. Filtrar por Ocasión (Botones)
        const matchesOccasion = currentOccasion === "all" || 
                               (product.occasions && product.occasions.includes(currentOccasion));

        return matchesSearch && matchesCategory && matchesOccasion;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #888;">No se encontraron productos que coincidan con los filtros.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        
        // **URL para el botón 'Ver'**
        const productUrl = `../DETALLE_PRODUCTO/detalle_producto.html?name=${encodeURIComponent(product.name)}`;

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            
            <div class="actions-container">
                <a 
                    href="${productUrl}"
                    class="view-btn">Ver</a>

                <a 
                    href="https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
                        `Hola, me interesa el producto "${product.name}" (${product.price}).`
                    )}" 
                    target="_blank" 
                    class="buy-btn">Comprar</a>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Agregar observador a los productos para la animación
    observeProducts();
}

// ----------------------------------------------------
// --- INTERSECTION OBSERVER PARA ANIMACIONES ---
// ----------------------------------------------------

function observeProducts() {
    const cards = document.querySelectorAll(".product-card");
    
    // Desconectar el observador anterior si existe
    if (window.productObserver) {
        window.productObserver.disconnect();
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // observer.unobserve(entry.target); // Opcional: para que solo se anime una vez
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Aparecer cuando el 10% del elemento es visible
    });

    cards.forEach(card => observer.observe(card));
    window.productObserver = observer; // Almacenar para desconexión futura
}

// ----------------------------------------------------
// --- MANEJO DE EVENTOS Y ARRANQUE ---
// ----------------------------------------------------

// Evento para Búsqueda por Nombre/Descripción
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

// Evento para Filtrado por Categoría
categoryFilter.addEventListener("change", (e) => {
    currentCategory = e.target.value;
    renderProducts();
});


// INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const { categories, occasions } = getUniqueFilters();
    populateCategoryFilter(categories);
    populateOccasionFilter(occasions);
    renderProducts(); // Renderizar productos iniciales
});