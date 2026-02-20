// ============================================
//   CARRITO-UTILS.JS - CraftAle
//   Funciones compartidas del carrito
//   Incluir en TODAS las páginas: productos, detalle, etc.
// ============================================

// ---- Agregar producto al carrito ----
function agregarAlCarrito(product) {
    const carrito = JSON.parse(localStorage.getItem("craftale_carrito") || "[]");

    const existente = carrito.find(i => i.name === product.name);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            name:     product.name,
            price:    product.price,
            image:    product.image,
            cantidad: 1
        });
    }

    localStorage.setItem("craftale_carrito", JSON.stringify(carrito));
    actualizarBadgeCarrito();
    mostrarToast(product.name);
}

// ---- Actualizar badge del ícono de carrito en la navbar ----
function actualizarBadgeCarrito() {
    const badge = document.getElementById("carrito-badge");
    if (!badge) return;
    const carrito = JSON.parse(localStorage.getItem("craftale_carrito") || "[]");
    const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);
    badge.textContent = total > 0 ? total : "";
    badge.style.display = total > 0 ? "flex" : "none";
}

// ---- Toast de confirmación ----
function mostrarToast(nombre) {
    // Eliminar toast anterior si existe
    const anterior = document.getElementById("craftale-toast");
    if (anterior) anterior.remove();

    const toast = document.createElement("div");
    toast.id = "craftale-toast";
    toast.innerHTML = `🛒 <strong>${nombre}</strong> añadido al carrito`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, rgb(255,100,150), rgb(255,60,120));
        color: white;
        padding: 14px 26px;
        border-radius: 30px;
        font-family: 'Quicksand', 'Arial', sans-serif;
        font-weight: 700;
        font-size: 0.95em;
        box-shadow: 0 6px 20px rgba(255,100,150,0.4);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        white-space: nowrap;
    `;
    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    });

    // Animar salida
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ---- Inicializar badge al cargar la página ----
document.addEventListener("DOMContentLoaded", actualizarBadgeCarrito);