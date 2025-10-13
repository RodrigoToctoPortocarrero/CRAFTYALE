function enviarDetalle() {
    const nombre = document.getElementById('nombre').value.trim();
    const material = document.getElementById('material').value.trim();
    const color = document.getElementById('color').value.trim();
    const tamaño = document.getElementById('tamaño').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
  
    if (!nombre || !material || !color || !tamaño || !mensaje) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos antes de enviar.',
      });
      return;
    }
  
    Swal.fire({
      title: '¿Estás conforme con tus respuestas?',
      text: "Revisa tus datos antes de enviarlos.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(255, 100, 150)',
      cancelButtonColor: '#f7bfd8',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const numeroWhatsApp = '51943455384'; // Reemplaza con tu número de WhatsApp
        const texto = `Hola, me gustaría crear un detalle con las siguientes características:\n\n` +
                      `Nombre del Detalle: ${nombre}\n` +
                      `Material: ${material}\n` +
                      `Color Principal: ${color}\n` +
                      `Tamaño: ${tamaño}\n` +
                      `Mensaje Especial: ${mensaje}`;
        
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
      }
    });
  }
  