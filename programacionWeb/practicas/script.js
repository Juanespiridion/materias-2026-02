// Estado inicial y configuración de la práctica
const state = {
  mode: 'flex', // 'flex' | 'grid'
  flex: {
    direction: 'row',
    wrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 16,
    customOrder: false,
    customGrow: false
  },
  grid: {
    columns: 'repeat(3, 1fr)',
    rows: 'auto',
    gap: 16,
    justifyItems: 'stretch',
    alignItems: 'stretch',
    useAreas: false
  },
  showAxes: true,
  itemsCount: 6
};

// Explicaciones didácticas basadas en las diapositivas
const explanations = {
  flexDirection: {
    'row': 'El eje principal va horizontal de izquierda a derecha. Los 6 elementos se distribuyen en fila.',
    'row-reverse': 'El eje principal se invierte horizontalmente. El elemento 1 queda a la derecha y el 6 a la izquierda.',
    'column': 'El eje principal ahora es vertical (de arriba a abajo). Los 6 elementos forman una columna.',
    'column-reverse': 'El eje principal es vertical invertido (de abajo hacia arriba).'
  },
  flexWrap: {
    'nowrap': 'Los 6 elementos se mantienen forzosamente en una sola línea (se comprimen con flex-shrink).',
    'wrap': 'Los 6 elementos que no caben en la fila saltan a una nueva línea hacia abajo.',
    'wrap-reverse': 'Los elementos que desbordan saltan a una nueva fila hacia arriba.'
  },
  gridColumns: {
    'repeat(3, 1fr)': 'Cuadrícula exacta de 2 filas × 3 columnas con fracciones iguales (1fr). Ideal para los 6 elementos.',
    'repeat(2, 1fr)': 'Cuadrícula de 3 filas × 2 columnas. Los 6 elementos se reparten en pares.',
    'repeat(auto-fit, minmax(180px, 1fr))': 'Cuadrícula responsive moderna: los 6 elementos se adaptan automáticamente al ancho disponible.',
    'areas': 'Diseño por áreas semánticas (grid-template-areas): Cabecera, Navegación, Contenido, Lateral, Extra y Pie.'
  }
};

// Elementos del DOM
const container = document.getElementById('demoContainer');
const codeDisplay = document.getElementById('codeDisplay');
const theoryBadge = document.getElementById('theoryBadge');
const theoryText = document.getElementById('theoryText');
const theoryList = document.getElementById('theoryList');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

// Inicializar la aplicación
function init() {
  bindTabs();
  bindOptionButtons();
  bindSliders();
  bindToggles();
  bindCopyButton();
  updateView();
}

// Control de pestañas (Flexbox vs CSS Grid)
function bindTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.mode = tab.dataset.mode;

      document.querySelectorAll('.control-section').forEach(sec => {
        sec.classList.remove('active');
      });
      document.getElementById(`${state.mode}Controls`).classList.add('active');

      document.getElementById('currentModePill').textContent = 
        state.mode === 'flex' ? 'Modo Flexbox' : 'Modo CSS Grid';

      updateView();
    });
  });
}

// Botones de opciones (flex-direction, justify-content, repeat, etc.)
function bindOptionButtons() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.control-group');
      const prop = group.dataset.prop;
      const value = btn.dataset.value;

      group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (state.mode === 'flex') {
        state.flex[prop] = value;
      } else {
        if (prop === 'gridTemplateAreas') {
          state.grid.useAreas = (value === 'true');
        } else {
          state.grid[prop] = value;
          state.grid.useAreas = false;
          // reset visual active on areas btn if any
          const areasBtn = document.querySelector('[data-prop="gridTemplateAreas"] [data-value="true"]');
          if (areasBtn) areasBtn.classList.remove('active');
        }
      }

      updateView();
    });
  });
}

// Controles deslizantes (Gaps)
function bindSliders() {
  const gapSlider = document.getElementById('gapSlider');
  const gapVal = document.getElementById('gapVal');

  gapSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    gapVal.textContent = `${val}px`;
    if (state.mode === 'flex') {
      state.flex.gap = val;
    } else {
      state.grid.gap = val;
    }
    updateView();
  });
}

// Switches de opciones adicionales (Custom order, flex-grow, ejes)
function bindToggles() {
  const toggleAxes = document.getElementById('toggleAxes');
  toggleAxes.addEventListener('change', (e) => {
    state.showAxes = e.target.checked;
    const canvasWrap = document.getElementById('canvasWrapper');
    if (state.showAxes) {
      canvasWrap.classList.add('show-axis-lines');
    } else {
      canvasWrap.classList.remove('show-axis-lines');
    }
  });

  const toggleOrder = document.getElementById('toggleOrder');
  if (toggleOrder) {
    toggleOrder.addEventListener('change', (e) => {
      state.flex.customOrder = e.target.checked;
      updateView();
    });
  }

  const toggleGrow = document.getElementById('toggleGrow');
  if (toggleGrow) {
    toggleGrow.addEventListener('change', (e) => {
      state.flex.customGrow = e.target.checked;
      updateView();
    });
  }
}

// Botón para copiar código al portapapeles
function bindCopyButton() {
  copyBtn.addEventListener('click', () => {
    const code = codeDisplay.textContent;
    navigator.clipboard.writeText(code).then(() => {
      showToast('¡Código CSS copiado con éxito!');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('¡Código CSS copiado con éxito!');
    });
  });
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Renderizado principal y sincronización con el DOM
function updateView() {
  const items = document.querySelectorAll('.demo-item');

  // Limpiar estilos previos del contenedor
  container.removeAttribute('style');

  if (state.mode === 'flex') {
    applyFlexMode(items);
  } else {
    applyGridMode(items);
  }
}

// Aplicar estilos de Flexbox
function applyFlexMode(items) {
  const { direction, wrap, justifyContent, alignItems, alignContent, gap, customOrder, customGrow } = state.flex;

  container.style.display = 'flex';
  container.style.flexDirection = direction;
  container.style.flexWrap = wrap;
  container.style.justifyContent = justifyContent;
  container.style.alignItems = alignItems;
  container.style.alignContent = alignContent;
  container.style.gap = `${gap}px`;

  // Asignar o resetear propiedades individuales a los 6 elementos
  items.forEach((item, index) => {
    item.removeAttribute('style');
    const itemNum = index + 1;
    const propInfo = item.querySelector('.item-property-info');

    let orderVal = 0;
    let growVal = 0;

    if (customOrder) {
      // Orden invertido o personalizado (ej: 6, 5, 4, 3, 2, 1)
      orderVal = 7 - itemNum;
      item.style.order = orderVal;
    }

    if (customGrow) {
      // Elementos 2 y 5 crecen más para notar flex-grow
      growVal = (itemNum % 2 === 0) ? 2 : 1;
      item.style.flexGrow = growVal;
    }

    // Actualizar datos visibles en cada tarjeta
    if (propInfo) {
      propInfo.innerHTML = `<span>order: ${orderVal}</span><span>grow: ${growVal}</span>`;
    }

    // Resetear clases de áreas grid si existían
    item.className = `demo-item element-${itemNum}`;
  });

  // Generar código CSS
  let generatedCSS = `/* Contenedor con 6 Elementos Flex */
.contenedor {
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  gap: ${gap}px;
}

/* Ítems Hijos (Los 6 Elementos) */
.item {
  /* Propiedades base de los elementos */
  min-width: 120px;
  min-height: 100px;
${customGrow ? '  flex-grow: [factor]; /* Ej. elemento 2 con grow: 2 */\n' : ''}${customOrder ? '  order: [numero]; /* Ej. elemento 1 con order: 6 */\n' : ''}}`;

  codeDisplay.textContent = generatedCSS;

  // Actualizar tarjeta teórica
  theoryBadge.textContent = 'Módulo: Flexbox (1D)';
  let desc = explanations.flexDirection[direction] || '';
  let wrapDesc = explanations.flexWrap[wrap] || '';
  theoryText.textContent = `${desc} ${wrapDesc}`;

  theoryList.innerHTML = `
    <li><strong>Eje Principal:</strong> Orientado como <code>${direction}</code>. Determina cómo viajan los 6 ítems.</li>
    <li><strong>Justify-content (${justifyContent}):</strong> Distribuye los 6 ítems a lo largo del eje principal.</li>
    <li><strong>Align-items (${alignItems}):</strong> Alinea los ítems en el eje cruzado perpendicular.</li>
    <li><strong>Flex-wrap (${wrap}):</strong> Permite pasar a múltiples líneas cuando no caben los 6 elementos.</li>
  `;

  // Actualizar indicadores de ejes
  const mainAxisText = document.getElementById('mainAxisLabel');
  const crossAxisText = document.getElementById('crossAxisLabel');
  if (direction.includes('row')) {
    mainAxisText.textContent = 'Eje Principal: Horizontal (X)';
    crossAxisText.textContent = 'Eje Cruzado: Vertical (Y)';
  } else {
    mainAxisText.textContent = 'Eje Principal: Vertical (Y)';
    crossAxisText.textContent = 'Eje Cruzado: Horizontal (X)';
  }
}

// Aplicar estilos de CSS Grid
function applyGridMode(items) {
  const { columns, rows, gap, justifyItems, alignItems, useAreas } = state.grid;

  container.style.display = 'grid';
  container.style.gap = `${gap}px`;
  container.style.justifyItems = justifyItems;
  container.style.alignItems = alignItems;

  let generatedCSS = '';

  if (useAreas) {
    // Modo Grid Template Areas con los 6 elementos
    container.style.gridTemplateColumns = '220px 1fr 1fr';
    container.style.gridTemplateRows = 'auto 1fr auto';
    container.style.gridTemplateAreas = `
      "head head head"
      "menu main aside"
      "foot extra foot"
    `;

    const areaNames = ['head', 'menu', 'main', 'aside', 'extra', 'foot'];
    const roleTitles = [
      'Encabezado (Header)',
      'Menú / Navegación',
      'Contenido Principal',
      'Barra Lateral (Aside)',
      'Widget Destacado',
      'Pie de Página (Footer)'
    ];

    items.forEach((item, index) => {
      const itemNum = index + 1;
      item.removeAttribute('style');
      item.className = `demo-item element-${itemNum}`;
      item.style.gridArea = areaNames[index];

      const roleTag = item.querySelector('.item-role-tag');
      const nameTag = item.querySelector('.item-name');
      const propInfo = item.querySelector('.item-property-info');

      if (roleTag) roleTag.textContent = `area: ${areaNames[index]}`;
      if (nameTag) nameTag.textContent = roleTitles[index];
      if (propInfo) propInfo.innerHTML = `<span>grid-area</span><span>${areaNames[index]}</span>`;
    });

    generatedCSS = `/* CSS Grid: Distribución por Áreas */
.contenedor-grid {
  display: grid;
  grid-template-columns: 220px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head  head  head"
    "menu  main  aside"
    "foot  extra foot";
  gap: ${gap}px;
}

/* Asignación de cada uno de los 6 elementos */
.elemento-1 { grid-area: head; }
.elemento-2 { grid-area: menu; }
.elemento-3 { grid-area: main; }
.elemento-4 { grid-area: aside; }
.elemento-5 { grid-area: extra; }
.elemento-6 { grid-area: foot; }`;

    theoryBadge.textContent = 'Módulo: CSS Grid por Áreas (Slide 44)';
    theoryText.textContent = 'Los 6 elementos se distribuyen en un layout semántico completo mediante la propiedad grid-template-areas, asignando a cada elemento hijo su grid-area correspondiente.';
    theoryList.innerHTML = `
      <li><strong>grid-template-areas:</strong> Mapea visualmente la cuadrícula en filas y columnas usando nombres legibles.</li>
      <li><strong>grid-area:</strong> Cada uno de los 6 elementos se ancla a su zona designada.</li>
      <li><strong>Espaciado (gap):</strong> Separa automáticamente todas las celdas sin requerir márgenes manuales.</li>
    `;

  } else {
    // Modo cuadrícula regular
    container.style.gridTemplateColumns = columns;
    container.style.gridTemplateRows = rows;
    container.style.gridTemplateAreas = 'none';

    const defaultNames = [
      'Elemento 1',
      'Elemento 2',
      'Elemento 3',
      'Elemento 4',
      'Elemento 5',
      'Elemento 6'
    ];

    items.forEach((item, index) => {
      const itemNum = index + 1;
      item.removeAttribute('style');
      item.className = `demo-item element-${itemNum}`;

      const roleTag = item.querySelector('.item-role-tag');
      const nameTag = item.querySelector('.item-name');
      const propInfo = item.querySelector('.item-property-info');

      if (roleTag) roleTag.textContent = `Ítem ${itemNum}`;
      if (nameTag) nameTag.textContent = defaultNames[index];
      if (propInfo) propInfo.innerHTML = `<span>Celda ${itemNum}</span><span>Fila/Col</span>`;
    });

    generatedCSS = `/* CSS Grid con 6 Elementos */
.contenedor-grid {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px; /* Huecos / Gutters entre celdas */
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}

/* Los 6 Ítems del Grid ocupan las celdas de la cuadrícula */
.grid-item {
  /* Se distribuyen automáticamente por filas y columnas */
}`;

    theoryBadge.textContent = 'Módulo: CSS Grid (2D)';
    theoryText.textContent = explanations.gridColumns[columns] || 'CSS Grid distribuye los 6 elementos en dos dimensiones (filas y columnas) simultáneamente.';
    theoryList.innerHTML = `
      <li><strong>grid-template-columns:</strong> Define el número y ancho de las columnas (ej. <code>${columns}</code>).</li>
      <li><strong>Unidad fr:</strong> Representa una fracción proporcional del espacio disponible en el grid.</li>
      <li><strong>gap:</strong> Establece el espaciado (gutters) entre los 6 elementos de la cuadrícula.</li>
      <li><strong>repeat():</strong> Notación para repetir columnas idénticas sin escribir código redundante.</li>
    `;
  }

  codeDisplay.textContent = generatedCSS;

  const mainAxisText = document.getElementById('mainAxisLabel');
  const crossAxisText = document.getElementById('crossAxisLabel');
  mainAxisText.textContent = 'Columnas: Eje Horizontal';
  crossAxisText.textContent = 'Filas: Eje Vertical';
}

// Iniciar al cargar el DOM
document.addEventListener('DOMContentLoaded', init);
