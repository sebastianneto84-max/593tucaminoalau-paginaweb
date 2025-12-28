document.addEventListener('DOMContentLoaded', () => {

  // --- Elementos del DOM ---
  const yearSpan = document.getElementById('year');
  const mainContent = document.getElementById('main-content');
  const simulatorsSection = document.getElementById('simulators-section');
  const quienesSomosSection = document.getElementById('quienes-somos-section');
  const trabajaNosotrosSection = document.getElementById('trabaja-con-nosotros-section');
  const testVocacionalSection = document.getElementById('test-vocacional-section');
  
  // Array con todas las secciones que funcionan como "páginas"
  const pageSections = [
    mainContent, 
    simulatorsSection, 
    quienesSomosSection, 
    trabajaNosotrosSection,
    testVocacionalSection
  ];

  // --- Actualizar el año en el footer ---
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Lógica de Navegación y Vistas (Router Mejorado) ---
  function handleViewChange() {
    const hash = window.location.hash;

    // 1. Ocultar todas las secciones
    pageSections.forEach(section => {
      if (section) section.style.display = 'none';
    });

    // 2. Mostrar la sección correcta según el hash
    switch (hash) {
      case '#simuladores':
        if (simulatorsSection) simulatorsSection.style.display = 'block';
        break;
      case '#quienes-somos':
        if (quienesSomosSection) quienesSomosSection.style.display = 'block';
        break;
      case '#trabaja-con-nosotros':
        if (trabajaNosotrosSection) trabajaNosotrosSection.style.display = 'block';
        break;
      case '#test-vocacional':
        if (testVocacionalSection) testVocacionalSection.style.display = 'block';
        break;
      default: // Para #, #inicio o cualquier otra cosa, muestra la página principal
        if (mainContent) mainContent.style.display = 'block';
        break;
    }
    // 3. Subir al inicio de la página en cada cambio
    window.scrollTo(0, 0);
  }
  
  // Escuchar cambios en el hash de la URL (cuando se hace clic en un enlace del menú)
  window.addEventListener('hashchange', handleViewChange);
  
  // Ejecutar la función una vez al cargar la página para mostrar la vista correcta
  handleViewChange();

  // ===== SISTEMA DE MODALES =====
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  let activeModal = null;

  const openModal = (modal) => {
    if (modal == null) return;
    modal.classList.add('is-visible');
    activeModal = modal;
  };

  const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove('is-visible');
    activeModal = null;
  };

  openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-backdrop');
      closeModal(modal);
    });
  });
  
  document.querySelectorAll('.modal').forEach(modalContent => {
    modalContent.addEventListener('click', (e) => e.stopPropagation());
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal != null) {
      closeModal(activeModal);
    }
  });

  // ===== LÓGICA DEL CONTADOR REGRESIVO =====
  // Fecha del examen (1 de febrero de 2026)
  const targetDate = new Date('February 1, 2026 09:00:00').getTime(); 

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Cálculos de tiempo
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyectar en el HTML
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('countdown');

    if (daysEl) {
        daysEl.innerText = d < 10 ? '0' + d : d;
        hoursEl.innerText = h < 10 ? '0' + h : h;
        minsEl.innerText = m < 10 ? '0' + m : m;
        secsEl.innerText = s < 10 ? '0' + s : s;
    }

    // Si el tiempo termina
    if (distance < 0) {
      clearInterval(interval);
      if (countdownEl) {
          countdownEl.innerHTML = "<p style='color: var(--accent); font-weight: 900;'>¡EL EXAMEN ES AHORA!</p>";
      }
    }
  }

  // Actualizar cada segundo
  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});

// Lógica para el Acordeón de FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const button = item.querySelector('.faq-pregunta');
  
  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Opcional: Cerrar otros acordeones abiertos al abrir uno nuevo
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// 1. Añade la nueva constante al inicio
const uceDetailSection = document.getElementById('simuladores-uce-detalle');

// 2. Agrégala al array pageSections
const pageSections = [
  mainContent, 
  simulatorsSection, 
  quienesSomosSection, 
  trabajaNosotrosSection,
  testVocacionalSection,
  uceDetailSection // <-- Nueva sección añadida
];

// 3. Agrega el caso al switch dentro de handleViewChange()
switch (hash) {
  case '#simuladores':
    if (simulatorsSection) simulatorsSection.style.display = 'block';
    break;
  case '#simuladores-uce': // <-- Nuevo caso
    if (uceDetailSection) uceDetailSection.style.display = 'block';
    break;
  // ... resto de casos
}


// ==========================================
// LÓGICA EXCLUSIVA PARA EL CONTADOR "COMPRA"
// ==========================================
(function() {
    // Configuramos la fecha objetivo
    const fechaExamenCompra = new Date('February 1, 2026 09:00:00').getTime();

    function actualizarRelojCompra() {
        const ahora = new Date().getTime();
        const diferencia = fechaExamenCompra - ahora;

        // Referencias a los IDs específicos de tu HTML
        const dEl = document.getElementById('days-compra');
        const hEl = document.getElementById('hours-compra');
        const mEl = document.getElementById('mins-compra');
        const sEl = document.getElementById('secs-compra');

        // Si los elementos no existen en la página actual, salimos de la función
        if (!dEl || !hEl || !mEl || !sEl) return;

        if (diferencia <= 0) {
            dEl.innerText = "00";
            hEl.innerText = "00";
            mEl.innerText = "00";
            sEl.innerText = "00";
            return;
        }

        // Cálculos matemáticos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Función interna para poner el 0 delante si es menor a 10
        const format = (num) => num < 10 ? '0' + num : num;

        // Inyectar los valores en el HTML
        dEl.innerText = format(dias);
        hEl.innerText = format(horas);
        mEl.innerText = format(minutos);
        sEl.innerText = format(segundos);
    }

    // Ejecutar inmediatamente y luego cada segundo
    actualizarRelojCompra();
    setInterval(actualizarRelojCompra, 1000);
})();

function actualizarCampos() {
    const perfil = document.getElementById('perfil-usuario').value;
    const contenedor = document.getElementById('campos-dinamicos');
    
    // IDs de los campos específicos
    const grupoCedula = document.getElementById('grupo-cedula');
    const grupoTitulo = document.getElementById('grupo-titulo');
    const grupoInstitucion = document.getElementById('grupo-institucion');
    const grupoVendedor = document.getElementById('grupo-vendedor-extras');

    // Mostrar el contenedor principal
    contenedor.style.display = 'block';

    // Lógica de visibilidad
    if (perfil === 'profesional') {
        grupoCedula.style.display = 'block';
        grupoTitulo.style.display = 'block';
        grupoInstitucion.style.display = 'none';
        grupoVendedor.style.display = 'none';
    } 
    else if (perfil === 'profesor') {
        grupoCedula.style.display = 'none'; // Los profesores no pidieron cédula en tu lista
        grupoTitulo.style.display = 'none';
        grupoInstitucion.style.display = 'block';
        grupoVendedor.style.display = 'none';
    } 
    else if (perfil === 'vendedor') {
        grupoCedula.style.display = 'block';
        grupoTitulo.style.display = 'none';
        grupoInstitucion.style.display = 'none';
        grupoVendedor.style.display = 'block';
    }
}

function actualizarCampos() {
    const perfil = document.getElementById('perfil-usuario').value;
    const contenedor = document.getElementById('campos-dinamicos');
    const subject = document.getElementById('email-subject');
    
    // Contenedores
    const gCedula = document.getElementById('grupo-cedula');
    const gTitulo = document.getElementById('grupo-titulo');
    const gInstitucion = document.getElementById('grupo-institucion');
    const gVendedor = document.getElementById('grupo-vendedor-extras');

    // Inputs reales (para activar/desactivar)
    const iCedula = document.getElementById('input-cedula');
    const iTitulo = document.getElementById('input-titulo');
    const iInstitucion = document.getElementById('input-institucion');
    const iInstruccion = document.getElementById('input-instruccion');

    contenedor.style.display = 'block';

    // Resetear todos a desactivado por defecto
    [iCedula, iTitulo, iInstitucion, iInstruccion].forEach(el => el.disabled = true);
    [gCedula, gTitulo, gInstitucion, gVendedor].forEach(el => el.style.display = 'none');

    if (perfil === 'profesional') {
        subject.value = "Nueva Postulación: PROFESIONAL";
        gCedula.style.display = 'block'; iCedula.disabled = false;
        gTitulo.style.display = 'block'; iTitulo.disabled = false;
    } 
    else if (perfil === 'profesor') {
        subject.value = "Nueva Postulación: PROFESOR BACHILLERATO";
        gInstitucion.style.display = 'block'; iInstitucion.disabled = false;
    } 
    else if (perfil === 'vendedor') {
        subject.value = "Nueva Postulación: VENDEDOR";
        gCedula.style.display = 'block'; iCedula.disabled = false;
        gVendedor.style.display = 'block'; iInstruccion.disabled = false;
    }
}