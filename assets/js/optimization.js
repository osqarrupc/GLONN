const x = [], y = [], z_data = [];
const size = 10;

// Rango de -5 a 5
for (let i = 0; i < size; i++) {
  const val = -5 + (10 / (size - 1)) * i;
  x.push(val);
  y.push(val);
}

// Generar superficie de la ecuación cuadrática: z = x² + y² - x*y - 2x + 3y + 1
for (let i = 0; i < size; i++) {
  const row = [];
  for (let j = 0; j < size; j++) {
    const xi = x[i], yj = y[j];
    const z = Math.min(
              xi * xi + yj * yj - xi * yj - 2 * xi + 3 * yj + 1,
              20  // límite superior
            );
    row.push(z);
  }
  z_data.push(row);
}

// Crear plano vertical en x = 1
const planeX1 = [], planeY1 = [], planeZ1 = [];
for (let i = 0; i < size; i++) {
  const xRow = [], yRow = [], zRow = [];
  for (let j = 0; j < size; j++) {
    xRow.push(1);            // x constante
    yRow.push(y[i]*2);         // y variable
    zRow.push(y[j]*2);         // z cambia con y (puedes poner 0 para plano horizontal)
  }
  planeX1.push(xRow);
  planeY1.push(yRow);
  planeZ1.push(zRow);
}

// Crear plano vertical en y = 1
const planeX2 = [], planeY2 = [], planeZ2 = [];
for (let i = 0; i < size; i++) {
  const xRow = [], yRow = [], zRow = [];
  for (let j = 0; j < size; j++) {
    xRow.push(x[i]*2);        // x variable
    yRow.push(1);           // y constante
    zRow.push(y[j]*2);        // z variable (puedes usar 0 para plano horizontal)
  }
  planeX2.push(xRow);
  planeY2.push(yRow);
  planeZ2.push(zRow);
}

// Superficie de la ecuación
const surface = {
  z: z_data,
  type: 'surface',
  opacity: 1,
  colorscale: 'YlGnBu',
  showscale: false,
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  }
};

// Plano rojo en x = 1
const redPlane1 = {
  type: 'surface',
  x: planeX1,
  y: planeY1,
  z: planeZ1,
  colorscale: [[0, 'red'], [1, 'red']],
  showscale: false,
  opacity: 0.3
};

const redPlane2 = {
  type: 'surface',
  x: planeX2,
  y: planeY2,
  z: planeZ2,
  colorscale: [[0, 'red'], [1, 'red']],
  showscale: false,
  opacity: 0.3
};

const layout = {
  scene: {
    camera: { eye: { x: 0.7, y: 1, z: 0.5 } },
    xaxis: { showgrid: false, range: [-3, 8], showticklabels: false },
    yaxis: { showgrid: false, range: [-2, 15], showticklabels: false },
    zaxis: { showgrid: false, range: [-3, 10], showticklabels: false }
  },
  margin: { l: 0, r: 0, b: 0, t: 0 }
};

Plotly.newPlot('three-container', [surface, redPlane1, redPlane2], layout);
