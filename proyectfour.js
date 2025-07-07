const galeria = document.getElementById('galeria');
const buscador = document.getElementById('buscador');
const btnCargarMas = document.getElementById('btnCargarMas');
const modal = document.getElementById('modal');
const modalNombre = document.getElementById('modalNombre');
const modalImagen = document.getElementById('modalImagen');
const cerrarModalBtn = document.getElementById('cerrarModal');
const fichaLink = document.getElementById('fichaLink');
const audioPokemon = document.getElementById('audioPokemon');
const filtroTipo = document.getElementById('filtroTipo');

let offset = 0;
const limit = 20;
let pokemons = [];

// Cargar Pokémon desde la API
async function cargarPokemons() {
  btnCargarMas.disabled = true;
  btnCargarMas.textContent = "Cargando...";

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    const detallesPromises = data.results.map(async (pokemon) => {
      const detalleRes = await fetch(pokemon.url);
      return detalleRes.json();
    });

    const detalles = await Promise.all(detallesPromises);
    pokemons = [...pokemons, ...detalles];
    mostrarPokemons(pokemons);
    offset += limit;
  } catch (error) {
    galeria.innerHTML = "<p>Error al cargar los Pokémon.</p>";
    console.error(error);
  } finally {
    btnCargarMas.disabled = false;
    btnCargarMas.textContent = "Cargar más Pokémon";
  }
}

// Mostrar tarjetas filtradas
function mostrarPokemons(lista) {
  const textoBusqueda = buscador.value.toLowerCase();
  const tipoFiltro = filtroTipo.value.toLowerCase();

  const filtrados = lista.filter(pokemon => {
    const nombreMatch = pokemon.name.toLowerCase().includes(textoBusqueda);
    const tipoMatch = tipoFiltro === '' || pokemon.types.some(t => t.type.name === tipoFiltro);
    return nombreMatch && tipoMatch;
  });

  galeria.innerHTML = '';

  filtrados.forEach((pokemon) => {
    const card = document.createElement('article');
    card.className = 'tarjeta';
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
      <div class="tarjeta-front">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <h2>${pokemon.name}</h2>
        <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      </div>
      <div class="tarjeta-back">
        <h3>Detalles</h3>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Experiencia base:</strong> ${pokemon.base_experience}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      </div>
    `;

    // Girar tarjeta con clic
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Mostrar modal al hacer doble clic
    card.addEventListener('dblclick', () => {
      abrirModal(pokemon);
    });

    // Accesibilidad con teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });

    galeria.appendChild(card);
  });
}

// Modal con datos del Pokémon
function abrirModal(pokemon) {
  modalNombre.textContent = pokemon.name;
  modalImagen.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  modalImagen.alt = `Imagen de ${pokemon.name}`;
  fichaLink.href = `https://www.wikidex.net/wiki/${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;

  modal.classList.remove('oculto');
  audioPokemon.currentTime = 0;
  audioPokemon.play();
}

// Cerrar modal
cerrarModalBtn.addEventListener('click', () => {
  modal.classList.add('oculto');
});

// Cerrar modal con Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.add('oculto');
  }
});

// Filtros en tiempo real
buscador.addEventListener('input', () => {
  mostrarPokemons(pokemons);
});

filtroTipo.addEventListener('change', () => {
  mostrarPokemons(pokemons);
});

// Botón cargar más
btnCargarMas.addEventListener('click', cargarPokemons);

// Inicial
cargarPokemons();
