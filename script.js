function showPage(pageId) {
    let paginas = document.querySelectorAll('.pagina'); 
    paginas.forEach(pagina => pagina.classList.remove('activa'));
    document.getElementById(pageId).classList.add('activa'); 
}

document.addEventListener("DOMContentLoaded", function() {
    showPage('inicio'); 

    // Asegurar que el modal funcione en todas las páginas
    configurarModal();

    // Evento para el buscador
    const searchLabel = document.querySelector('.search-label');
    const buscador = document.getElementById('buscador');
    
    if (searchLabel) {
        searchLabel.addEventListener('click', () => buscador.focus());
    }

    // Inicializar secciones colapsables
    document.querySelectorAll('.content').forEach(section => section.style.display = 'block');
    document.querySelectorAll('.arrow').forEach(arrow => arrow.style.transform = 'rotate(180deg)');

    // Evento para navegación suave
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mostrar u ocultar botón de inicio
    window.onscroll = function() {
        const botonInicio = document.getElementById("boton-inicio");
        botonInicio.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    };

    // Evento para volver al inicio
    document.getElementById("boton-inicio")?.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('change', function() {
        if (menuToggle.checked) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    });
});

// Función para configurar el modal en todas las páginas
function configurarModal() {
    const modal = document.getElementById("miModal");
    const modalImg = document.getElementById("imagenModal");

    if (!modal || !modalImg) {
        console.warn("Modal no encontrado en esta página.");
        return;
    }

    // Función para abrir el modal
    window.abrirModal = function(imagenSrc) {
        modal.style.display = "block";
        modalImg.src = imagenSrc;
    };

    // Función para cerrar el modal
    window.cerrarModal = function() {
        modal.style.display = "none";
    };

    // Cerrar modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Función para alternar secciones colapsables
function toggleSection(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    content.classList.toggle('activo'); 
    arrow.style.transform = content.classList.contains('activo') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Función de búsqueda
function buscarEscudos() {
    let filter = document.getElementById("buscador")?.value.toLowerCase();
    document.querySelectorAll(".runeword-box").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
        item.classList.toggle("oculto", !item.textContent.toLowerCase().includes(filter));
    });
}
