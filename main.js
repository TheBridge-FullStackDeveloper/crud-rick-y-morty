const personajesDiv = document.querySelector(".personajes");
const siguienteBtn = document.getElementById("nextPage");
const anteriorBtn = document.getElementById("prevPage");
const personajesNav = document.getElementById("personajesNav");
const crearPersonajeNav = document.getElementById("crearPersonajeNav");
const contenedorPersonajes = document.querySelector(".contenedor-personajes");
const crearPersonaje = document.querySelector(".crearPersonaje");
const crearPersonajeBtn = document.getElementById("crearPersonajeBtn");

let page = 1;

const pasarPagina = () => {
  if (page >= 52) {
    page = 1;
    traerPersonajes();
  } else {
    page++;
    traerPersonajes();
  }
};

const regresarPagina = () => {
  if (page > 1) {
    page--;
    traerPersonajes();
  } else {
    page = 52;
    traerPersonajes();
  }
};

const pintarPersonajes = (personajes) => {
  personajesDiv.innerHTML = "";
  personajes.forEach((personaje) => {
    personajesDiv.innerHTML += `<div class="card text-white bg-secondary p-3" style="max-width: 20rem;">
    <div class="card-header">${personaje.name}</div>
    <div class="card-body d-flex flex-wrap justify-content-center">
      <h4 class="card-title">${personaje.status}</h4>
      <img src="${personaje.image}" style="max-width:25vw;"/>
      <p class="card-text">${personaje.gender}</p>
      </div>
      <p>${personaje._id}</p>
      <button class="btn btn-light"  onclick="eliminarPersonaje('${personaje._id}')">Eliminar Personaje</button>
  </div>`;
  });
};
const eliminarPersonaje = async (_id) => {
  try {
    await axios.delete(`https://api-rick-y-morty-dev-ctne.1.ie-1.fl0.io/characters/id/${_id}`)
    traerPersonajes()
  } catch (error) {
    console.error(error);
  }
};
const traerPersonajes = async () => {
  try {
    const res = await axios.get(
      `https://api-rick-y-morty-dev-ctne.1.ie-1.fl0.io/characters?page=${page}`
    );
    pintarPersonajes(res.data);
  } catch (error) {
    console.error(error);
  }
};

traerPersonajes();

const crearNuevoPersonaje = async () => {
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("imagen").value;
  const genero = document.getElementById("genero").value;
  const estado = document.getElementById("estado").value;
  const nuevoPersonaje = {
    name: nombre,
    image: imagen,
    gender: genero,
    status: estado,
  };
  try {
    await axios.post(
      "https://api-rick-y-morty-dev-ctne.1.ie-1.fl0.io/characters",
      nuevoPersonaje
    );
    mostrarPersonajes();
  } catch (error) {
    console.error(error);
  }
};
siguienteBtn.addEventListener("click", pasarPagina);
anteriorBtn.addEventListener("click", regresarPagina);
crearPersonajeBtn.addEventListener("click", crearNuevoPersonaje);
//**SPA */

const esconderVistas = () => {
  contenedorPersonajes.classList.add("d-none");
  crearPersonaje.classList.add("d-none");
};

const mostrarCrearPersonaje = () => {
  esconderVistas();
  crearPersonaje.classList.remove("d-none");
};

const mostrarPersonajes = () => {
  esconderVistas();
  contenedorPersonajes.classList.remove("d-none");
};

crearPersonajeNav.addEventListener("click", mostrarCrearPersonaje);
personajesNav.addEventListener("click", mostrarPersonajes);
