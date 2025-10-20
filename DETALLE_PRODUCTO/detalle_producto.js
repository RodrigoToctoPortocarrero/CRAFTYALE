// **Importante:** Debes copiar y pegar el array 'products' EXACTO de tu archivo productos.js
// para que los datos estén disponibles en esta página.
const products = [
    {
        name: "Conejito Amigurumi",
        description: "Un tierno conejito hecho a mano, perfecto para Pascua.",
        details: "Este conejito está tejido con hilo de algodón 100% hipoalergénico. Mide aproximadamente 20cm de alto y es ideal para recién nacidos.",
        price: "$15.00",
        image: "../Imagenes/lufy.png",
        category: "Animales",
        occasions: ["Pascua", "Bebés", "Cumpleaños"]
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

const numeroWhatsApp = "51943455384";

function loadProductDetail() {
    // 1. Obtener el nombre del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name'); // Obtiene el valor del parámetro 'name'

    const productDetailDiv = document.getElementById('productDetail');

    if (!productName) {
        productDetailDiv.innerHTML = '<h1>Error: Producto no especificado.</h1>';
        return;
    }

    // 2. Buscar el producto en el array
    const product = products.find(p => p.name === productName);

    if (!product) {
        productDetailDiv.innerHTML = `<h1>Error: No se encontró el producto "${productName}"</h1>`;
        return;
    }

    // 3. Generar el HTML con los detalles
    
    // Crear la lista de ocasiones
    let occasionsHtml = '';
    if (product.occasions && product.occasions.length > 0) {
        occasionsHtml = `<div class="occasion-list">
                            ${product.occasions.map(occ => `<span class="category-tag">${occ}</span>`).join('')}
                         </div>`;
    }

    productDetailDiv.innerHTML = `
        <div class="image-column">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="info-column">
            <h1>${product.name}</h1>
            <p class="price">${product.price}</p>
            
            <h2>Resumen</h2>
            <p>${product.description}</p>
            
            <h2>Detalles del Producto</h2>
            <p>${product.details}</p>
            
            <h2>Categoría y Ocasiones</h2>
            <p><span class="category-tag">${product.category}</span></p>
            ${occasionsHtml}

            <a 
                href="https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
                    `Hola, me interesa el producto "${product.name}" (${product.price}).`
                )}" 
                target="_blank" 
                class="buy-detail-btn">Comprar por WhatsApp</a>
        </div>
    `;
}

// Cargar los detalles al cargar la página
document.addEventListener('DOMContentLoaded', loadProductDetail);