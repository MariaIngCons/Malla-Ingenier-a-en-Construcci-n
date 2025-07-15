// Mapa de ramos con sus requisitos
const ramos = {
  "Cálculo I": { requisitos: [], nivel: 1 },
  "Álgebra": { requisitos: [], nivel: 1 },
  "Química de los materiales": { requisitos: [], nivel: 1 },
  "Fund. Ing. En Construcción": { requisitos: [], nivel: 1 },
  "Interp. Técnica y  Espacial": { requisitos: [], nivel: 1 },
  "Electivo Formación General I": { requisitos: [], nivel: 1 },
  "Nivel Inglés Principiante": { requisitos: [], nivel: 1 },

  "Cálculo II": { requisitos: ["Cálculo I"], nivel: 2 },
  "Física I": { requisitos: [], nivel: 2 },
  "Técn. Horm. y Mortero": { requisitos: ["Química de los materiales", "Fund. Ing. En Construcción"], nivel: 2 },
  "Tecnología de la Madera": { requisitos: ["Fund. Ing. En Construcción"], nivel: 2 },
  "Inst. de planos y EETT de Obras": { requisitos: ["Interp. Técnica y  Espacial"], nivel: 2 },
  "Electivo Fromación General II": { requisitos: ["Electivo Formación General I"], nivel: 2 },

  "Cálculo III": { requisitos: ["Cálculo II"], nivel: 3 },
  "Ec. Diferenciales": { requisitos: ["Cálculo II"], nivel: 3 },
  "Física II": { requisitos: ["Física I"], nivel: 3 },
  "Procesos Constructivos I": { requisitos: ["Técn. Horm. y Mortero"], nivel: 3 },
  "Modelamiento Información para la Construcción": { requisitos: ["Inst. de planos y EETT de Obras"], nivel: 3 },
  "Nivel Inglés Básico": { requisitos: ["Nivel Inglés Principiante"], nivel: 3 },

  "Estadística Aplicada": { requisitos: ["Cálculo III"], nivel: 4 },
  "Física III": { requisitos: ["Física II"], nivel: 4 },
  "Topografía": { requisitos: ["Cálculo I"], nivel: 4 },
  "Gestión de Empresa I": { requisitos: [], nivel: 4 },
  "Procesos Constructivos II": { requisitos: ["Procesos Constructivos I"], nivel: 4 },
  "Electivo Formación General III": { requisitos: ["Electivo Fromación General II"], nivel: 4 },

  "Estructura I (Análisis Est.)": { requisitos: [], nivel: 5 },
  "Méc. de Suelos I": { requisitos: [], nivel: 5 },
  "Topografía de Obras": { requisitos: ["Topografía"], nivel: 5 },
  "Gestión de Empresa II": { requisitos: ["Gestión de Empresa I"], nivel: 5 },
  "Tecnología del Asfalto": { requisitos: [], nivel: 5 },
  "Ética Profesional": { requisitos: [], nivel: 5 },
  "Nivel Inglés Pre – Intermedio": { requisitos: ["Nivel Inglés Básico"], nivel: 5 },

  "Estructura II (Mad. y Acero)": { requisitos: ["Estructura I (Análisis Est.)"], nivel: 6 },
  "Méc. de Suelos II": { requisitos: ["Méc. de Suelos I"], nivel: 6 },
  "Mecánica de Fluidos": { requisitos: [], nivel: 6 },
  "Procesos Constructivos III": { requisitos: ["Topografía de Obras"], nivel: 6 },
  "Legislación Laboral": { requisitos: [], nivel: 6 },
  "Instalaciones para la Constr.": { requisitos: ["Procesos Constructivos II"], nivel: 6 },

  "Estructuras III (Hrom. Arm.)": { requisitos: ["Estructura I (Análisis Est.)"], nivel: 7 },
  "Obras Sanitarias": { requisitos: ["Mecánica de Fluidos"], nivel: 7 },
  "Gestión de Proyecto I": { requisitos: ["Procesos Constructivos III"], nivel: 7 },
  "Energía y Edificación": { requisitos: [], nivel: 7 },
  "Electivo Formación General IV": { requisitos: ["Electivo Formación General III"], nivel: 7 },

  "Obras de Ingeniería": { requisitos: ["Estructuras III (Hrom. Arm.)"], nivel: 8 },
  "Obras Hidráulicas": { requisitos: ["Mecánica de Fluidos"], nivel: 8 },
  "Seguridad y Prevención": { requisitos: [], nivel: 8 },
  "Gestión de Proyecto II": { requisitos: ["Gestión de Proyecto I"], nivel: 8 },
  "Evaluación de Proyectos": { requisitos: [], nivel: 8 },
  "Construcción Sustentable": { requisitos: ["Energía y Edificación"], nivel: 8 },
  "Examen de suficiencia inglés": { requisitos: ["Nivel Inglés Pre – Intermedio"], nivel: 8 },

  "Gestión Integral de Proyectos": { requisitos: [], nivel: 9 },
  "Taller de Propuesta y Lic.": { requisitos: ["Gestión de Proyecto II"], nivel: 9 },
  "Taller Integración Proc. Constr. y Adm. de Obras": {
    requisitos: ["Obras Sanitarias", "Gestión de Proyecto II", "Construcción Sustentable"],
    nivel: 9
  },
  "Electivo de Formación Profesional I": { requisitos: [], nivel: 9 },
  "Electivo de Formación Profesional II": { requisitos: [], nivel: 9 },

  "Actividad de Titulación": {
    requisitos: Object.keys(ramos), // todas las asignaturas
    nivel: 10
  }
};

const estadoRamos = {};
const container = document.getElementById("malla-container");

// Crear los ramos
for (const [nombre, { requisitos }] of Object.entries(ramos)) {
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.textContent = nombre;
  div.dataset.nombre = nombre;
  estadoRamos[nombre] = "bloqueado";
  container.appendChild(div);
}

// Verifica qué ramos se pueden desbloquear
function actualizarEstados() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    const { requisitos } = ramos[nombre];
    if (estadoRamos[nombre] !== "aprobado") {
      const desbloqueado = requisitos.every(req => estadoRamos[req] === "aprobado");
      estadoRamos[nombre] = desbloqueado ? "desbloqueado" : "bloqueado";
      div.className = `ramo ${estadoRamos[nombre]}`;
    }
  });
}

// Evento para aprobar
container.addEventListener("click", e => {
  const div = e.target.closest(".ramo");
  if (!div || estadoRamos[div.dataset.nombre] !== "desbloqueado") return;
  estadoRamos[div.dataset.nombre] = "aprobado";
  div.className = "ramo aprobado";
  actualizarEstados();
});

actualizarEstados();

