// ============================================
//   CARRITO.JS - CraftAle
//   Lógica de la página del carrito
// ============================================

const NUMERO_WHATSAPP = "51943455384";

// ---- Referencias al DOM ----
const carritoItemsEl = document.getElementById("carrito-items");
const carritoVacioEl = document.getElementById("carrito-vacio");
const carritoAcciones = document.getElementById("carrito-acciones");
const resumenSubtotal = document.getElementById("resumen-subtotal");
const resumenTotal = document.getElementById("resumen-total");
const resumenCantidad = document.getElementById("resumen-cantidad");
const btnVaciar = document.getElementById("btn-vaciar");
const btnWhatsapp = document.getElementById("btn-pedir-whatsapp");

// ---- Utilidades de localStorage ----
function getCarrito() {
    return JSON.parse(localStorage.getItem("craftale_carrito") || "[]");
}
function saveCarrito(carrito) {
    localStorage.setItem("craftale_carrito", JSON.stringify(carrito));
    // Actualiza el badge en la barra si existe
    actualizarBadgeNavbar();
}
function actualizarBadgeNavbar() {
    const badge = document.getElementById("carrito-badge");
    if (!badge) return;
    const carrito = getCarrito();
    const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);
    badge.textContent = total > 0 ? total : "";
    badge.style.display = total > 0 ? "flex" : "none";
}

// ---- Renderizado principal ----
function renderCarrito() {
    const carrito = getCarrito();
    carritoItemsEl.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacioEl.classList.remove("hidden");
        carritoAcciones.classList.add("hidden");
        btnWhatsapp.disabled = true;
        actualizarResumen(carrito);
        return;
    }

    carritoVacioEl.classList.add("hidden");
    carritoAcciones.classList.remove("hidden");
    btnWhatsapp.disabled = false;

    carrito.forEach((item, index) => {
        const precio = parsePrecio(item.price);
        const subtotalItem = precio * item.cantidad;

        const card = document.createElement("div");
        card.classList.add("carrito-item");
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='../Imagenes/icono.png'">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="item-price">S/ ${subtotalItem.toFixed(2)}</p>
                <p class="item-unit-price">S/ ${precio.toFixed(2)} c/u</p>
            </div>
            <div class="item-cantidad">
                <button class="btn-cantidad" data-action="restar" data-index="${index}" title="Quitar uno">−</button>
                <span>${item.cantidad}</span>
                <button class="btn-cantidad" data-action="sumar" data-index="${index}" title="Agregar uno">+</button>
            </div>
            <button class="btn-eliminar" data-index="${index}" title="Eliminar producto">🗑️</button>
        `;
        carritoItemsEl.appendChild(card);
    });

    // Eventos de cantidad y eliminar
    document.querySelectorAll(".btn-cantidad").forEach(btn => {
        btn.addEventListener("click", handleCantidad);
    });
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", handleEliminar);
    });

    actualizarResumen(carrito);
}

// ---- Manejo de cantidad ----
function handleCantidad(e) {
    const idx = parseInt(e.currentTarget.dataset.index);
    const action = e.currentTarget.dataset.action;
    const carrito = getCarrito();

    if (action === "sumar") {
        carrito[idx].cantidad += 1;
    } else {
        carrito[idx].cantidad -= 1;
        if (carrito[idx].cantidad <= 0) {
            carrito.splice(idx, 1);
        }
    }

    saveCarrito(carrito);
    renderCarrito();
}

// ---- Eliminar item ----
function handleEliminar(e) {
    const idx = parseInt(e.currentTarget.dataset.index);
    const carrito = getCarrito();
    carrito.splice(idx, 1);
    saveCarrito(carrito);
    renderCarrito();
}

// ---- Vaciar carrito ----
btnVaciar.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        saveCarrito([]);
        renderCarrito();
    }
});

// ---- Actualizar resumen ----
function actualizarResumen(carrito) {
    const total = carrito.reduce((acc, i) => acc + parsePrecio(i.price) * i.cantidad, 0);
    const cantidad = carrito.reduce((acc, i) => acc + i.cantidad, 0);

    resumenSubtotal.textContent = `S/ ${total.toFixed(2)}`;
    resumenTotal.textContent = `S/ ${total.toFixed(2)}`;
    resumenCantidad.textContent = `${cantidad} producto${cantidad !== 1 ? "s" : ""}`;
}

// ---- Parsear precio (acepta "$15.00" o "15.00" o "S/ 15.00") ----
function parsePrecio(precio) {
    if (typeof precio === "number") return precio;
    return parseFloat(String(precio).replace(/[^0-9.]/g, "")) || 0;
}

// ---- Pedir por WhatsApp ----
btnWhatsapp.addEventListener("click", () => {
    const carrito = getCarrito();
    if (carrito.length === 0) return;

    let mensaje = "Hola! Me gustaría hacer un pedido de CraftAle 🧶\n\n";
    mensaje += "*Mis productos:*\n";

    carrito.forEach(item => {
        const precio = parsePrecio(item.price);
        mensaje += `• ${item.name} x${item.cantidad} — S/ ${(precio * item.cantidad).toFixed(2)}\n`;
    });

    const total = carrito.reduce((acc, i) => acc + parsePrecio(i.price) * i.cantidad, 0);
    mensaje += `\n*Total: S/ ${total.toFixed(2)}*\n\n¿Pueden confirmar disponibilidad y coordinar el envío? ¡Gracias!`;

    const url = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});

// ---- Menú hamburguesa ----
const hamburguesa = document.getElementById("hamburguesa");
const navLinks = document.getElementById("nav-links");

hamburguesa.addEventListener("click", () => {
    hamburguesa.classList.toggle("abierto");
    navLinks.classList.toggle("abierto");
});

// Cierra el menú al hacer click en un link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        hamburguesa.classList.remove("abierto");
        navLinks.classList.remove("abierto");
    });
});

// ---- INICIO ----
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
    actualizarBadgeNavbar();
});