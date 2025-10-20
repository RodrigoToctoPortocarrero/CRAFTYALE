// Referencia al botón de envío
document.getElementById('submitBtn').addEventListener('click', enviarDetalle);

function enviarDetalle() {
    // 1. Obtener y sanitizar valores
    const nombre = document.getElementById('nombre').value.trim();
    const material = document.getElementById('material').value.trim();
    const color = document.getElementById('color').value.trim();
    const tamaño = document.getElementById('tamaño').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // 2. Validación
    if (!nombre || !material || !color || !tamaño || !mensaje) {
        Swal.fire({
            icon: 'error',
            title: '¡Ups! 📝',
            text: 'Parece que olvidaste completar algunos campos. ¡Necesitamos todos los detalles!',
            confirmButtonColor: 'rgb(255, 100, 150)',
        });
        return;
    }

    // 3. Ventana de Confirmación (SweetAlert)
    Swal.fire({
        title: '¿Confirmar Petición? ✨',
        html: `
            <p style="text-align: left;">Revisa tus datos. Al confirmar, te redirigiremos a WhatsApp para enviar el pedido.</p>
            <strong style="display: block; margin-top: 10px; color: rgb(255, 100, 150);">Resumen:</strong>
            <ul style="text-align: left; list-style-type: none; padding-left: 0;">
                <li><strong>Detalle:</strong> ${nombre}</li>
                <li><strong>Material:</strong> ${material}</li>
                <li><strong>Color:</strong> ${color}</li>
                <li><strong>Tamaño:</strong> ${tamaño}</li>
            </ul>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'rgb(255, 100, 150)', // Rosa principal
        cancelButtonColor: '#ff85a2', // Rosa más suave para cancelar
        confirmButtonText: 'Sí, ¡Quiero mi Amigurumi!',
        cancelButtonText: 'Cancelar y Corregir'
    }).then((result) => {
        if (result.isConfirmed) {
            // 4. Construcción del mensaje de WhatsApp
            const numeroWhatsApp = '51943455384'; // Tu número
            const texto = `¡Hola CraftAle! Tengo una idea de amigurumi personalizado:\n\n` +
                          `🧸 Nombre/Tipo: ${nombre}\n` +
                          `🧶 Material: ${material}\n` +
                          `💖 Color Principal: ${color}\n` +
                          `📏 Tamaño: ${tamaño}\n` +
                          `✉️ Especificaciones: ${mensaje}`;
            
            const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(texto)}`;
            
            // 5. Redirección
            window.open(url, '_blank');
            
            // Opcional: limpiar el formulario después del envío exitoso
            document.getElementById('detalleForm').reset();
        }
    });
}