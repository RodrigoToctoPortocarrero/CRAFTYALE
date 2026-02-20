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

//Apartado de productos populares

const phoneNumber = "51943455384";

// Mensajes específicos para cada botón
const messages = {
  botonArana: "¡Hola! Estoy interesado en el producto 'Hombre Araña'.",
  botonLufy: "¡Hola! Estoy interesado en el producto 'Lufy'.",
  botonRamo1: "¡Hola! Estoy interesado en el producto 'Ramo 1'.",
  botonRamo2: "¡Hola! Estoy interesado en el producto 'Ramo 2'."
};

// Iterar sobre cada botón y agregar su evento
Object.keys(messages).forEach((buttonId) => {
  const button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener("click", () => {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messages[buttonId])}`;
      window.location.href = whatsappUrl;
    });
  } else {
    console.warn(`El botón con ID '${buttonId}' no fue encontrado en el DOM.`);
  }
});


                        //Apartado de contactame
document.addEventListener("DOMContentLoaded", () => {
  const phoneNumber = "51943455384"; // Número de WhatsApp

  // Obtener el botón
  const contactButton = document.getElementById("botonContactame");

  // Crear el modal dinámicamente
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "none";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  const modalContent = document.createElement("div");
  modalContent.style.background = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "10px";
  modalContent.style.boxShadow = "0px 5px 10px rgba(0, 0, 0, 0.3)";
  modalContent.style.width = "300px";
  modalContent.style.textAlign = "center";

  const title = document.createElement("h3");
  title.innerText = "Enviar Petición por WhatsApp";
  modalContent.appendChild(title);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.placeholder = "Ingresa tu nombre";
  nameInput.style.width = "100%";
  nameInput.style.marginBottom = "10px";
  nameInput.style.padding = "8px";
  nameInput.style.border = "1px solid #ddd";
  nameInput.style.borderRadius = "5px";
  modalContent.appendChild(nameInput);

  const requestInput = document.createElement("textarea");
  requestInput.id = "request";
  requestInput.placeholder = "Escribe tu petición";
  requestInput.style.width = "100%";
  requestInput.style.marginBottom = "10px";
  requestInput.style.padding = "8px";
  requestInput.style.border = "1px solid #ddd";
  requestInput.style.borderRadius = "5px";
  modalContent.appendChild(requestInput);

  const sendButton = document.createElement("button");
  sendButton.innerText = "Enviar";
  sendButton.style.padding = "8px 15px";
  sendButton.style.marginRight = "10px";
  sendButton.style.border = "none";
  sendButton.style.borderRadius = "5px";
  sendButton.style.backgroundColor = "#25d366";
  sendButton.style.color = "white";
  sendButton.style.cursor = "pointer";
  modalContent.appendChild(sendButton);

  const closeButton = document.createElement("button");
  closeButton.innerText = "Cerrar";
  closeButton.style.padding = "8px 15px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.backgroundColor = "#ddd";
  closeButton.style.cursor = "pointer";
  modalContent.appendChild(closeButton);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Abrir modal al hacer clic en el botón "Contáctame"
  contactButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cerrar modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Enviar datos al hacer clic en "Enviar"
  sendButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const request = requestInput.value.trim();

    // Validar campos
    if (!name) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }

    if (!request) {
      alert("Por favor, escribe tu petición.");
      return;
    }

    // Construir mensaje y abrir WhatsApp
    const message = `Hola, mi nombre es ${name}. Mi petición es: ${request}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Cerrar el modal después de enviar
    modal.style.display = "none";
    nameInput.value = ""; // Limpiar campos
    requestInput.value = "";
  });
});


                      //ANIMACIONES FINALES

document.addEventListener("DOMContentLoaded", () => {
  // Función que se ejecutará cuando el elemento entre en la pantalla
  const observerOptions = {
    root: null, // Observa los elementos dentro de la ventana (pantalla)
    rootMargin: '0px', // Margen adicional para activar el efecto antes de llegar al borde
    threshold: 0.5, // El 50% del elemento debe ser visible para que el evento se active
  };

  // Crear el IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Si el elemento está en la vista, agregar la clase 'visible'
        entry.target.classList.add('visible');
        // Dejar de observar el elemento después de que ha entrado en la vista
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar los elementos
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    observer.observe(product);
  });

  //Clientes satisfechos
  const clientsSection = document.querySelector('.clients-section');
  observer.observe(clientsSection);

  // Observar cada tarjeta de cliente individualmente
  const clientCards = document.querySelectorAll('.client-card');
  clientCards.forEach(card => observer.observe(card));
});




/*AGREGAMOS ESTO EN JAVASCRIPT*/
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.createElement("div"); 
  menuBtn.classList.add("menu-btn");
  menuBtn.innerHTML = "&#9776;"; // Icono ☰
  document.body.appendChild(menuBtn);

  const barra = document.querySelector(".barra");

  menuBtn.addEventListener("click", function () {
    barra.classList.toggle("show");
  });
});


// ... (Tus datos de productos y demás código JS existente en productos.js) ...

// Referencia al formulario de búsqueda de la NavBar
const navBarForm = document.querySelector('.barra form');
const navBarInput = navBarForm.querySelector('input[type="text"]'); 
const navBarButton = document.getElementById('buscar-producto');

/**
 * Busca un producto por nombre y redirige a su página de detalle.
 * Si encuentra una coincidencia exacta, redirige.
 * Si no encuentra una coincidencia, redirige a la página de productos con un filtro.
 * @param {string} searchTerm - El texto a buscar.
 */
function searchAndRedirect(searchTerm) {
    if (!searchTerm) return; // No hacer nada si el campo está vacío

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // 1. Buscar coincidencia exacta por nombre
    const exactMatch = products.find(p => p.name.toLowerCase() === normalizedSearchTerm);
    
    // 2. Buscar la primera coincidencia parcial si no hay exacta
    const partialMatch = products.find(p => p.name.toLowerCase().includes(normalizedSearchTerm));

    const productToRedirect = exactMatch || partialMatch;

    if (productToRedirect) {
        // Redirigir al detalle del producto encontrado
        const productUrl = `../DETALLE_PRODUCTO/detalle_producto.html?name=${encodeURIComponent(productToRedirect.name)}`;
        window.location.href = productUrl;
    } else {
        // Si no se encontró ninguna coincidencia, podrías:
        
        // Opción 1 (Recomendada): Redirigir a la página de productos con el filtro aplicado
        // (Aunque esto ya lo hace tu campo de búsqueda principal de la página, es más robusto)
        // window.location.href = `producto.html?search=${encodeURIComponent(searchTerm)}`;
        
        // Opción 2: Mostrar una alerta si no se encuentra
        alert(`No se encontró ningún amigurumi llamado "${searchTerm}". Intenta otra búsqueda.`);
        // Nota: Por simplicidad, usaremos la Opción 2 o simplemente dejamos que el campo de búsqueda principal maneje los filtros.
    }
}

// ----------------------------------------------------
// --- EVENT LISTENERS PARA LA NABBAR ---
// ----------------------------------------------------

navBarForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario haga un submit tradicional y recargue la página
    
    // Llama a la función de búsqueda con el valor del input de la navBar
    searchAndRedirect(navBarInput.value);
});

// Nota: El event listener del botón ya está cubierto por el evento 'submit' del formulario.


//Se agregara funcionalidad al boton buscar de nabBar, esta te llevara al detalle de ese producto
const inputBuscarProductoNav = document.getElementById("buscar-producto").value;

const btnBuscarProductoNav = document.getElementById("btn-buscar-producto-nav");

function BuscarProducto(){
  
  if(inputBuscarProductoNav==="" || inputBuscarProductoNav === null){
        alert("Tiene que llenar el input para buscar");
  }
  products.forEach((p)=>{

      if(p.name == inputBuscarProductoNav){
        alert(`El producto: ${p.name}, si esta en productos`);
      }
  });



}

btnBuscarProductoNav.addEventListener("click",()=>{
  BuscarProducto();
});




