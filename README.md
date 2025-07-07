Contenido y funcionalidades principales

Buscador
Un campo para buscar Pokémon por nombre en tiempo real.
A medida que escribís, la galería se actualiza automáticamente mostrando coincidencias.

Filtro por tipo
Un menú desplegable para filtrar los Pokémon por su tipo (fuego, agua, planta, etc.).
Al seleccionar un tipo, solo se muestran los Pokémon correspondientes.

Tarjetas interactivas
Cada Pokémon se muestra en una tarjeta "flip" con frente y dorso:
Frente: Imagen oficial, nombre y tipo(s).
Dorso: Información adicional como altura, peso, experiencia base y habilidades.
Las tarjetas pueden girarse con un clic o presionando Enter/Espacio.
Al pasar el mouse, las tarjetas tienen un efecto de resplandor y escala animada.

Cargar más Pokémon
Un botón que permite cargar más tarjetas de Pokémon desde la API oficial.
Se cargan 20 por vez, para no saturar la página.

Modal de selección
Al hacer doble clic en una tarjeta, se abre un modal emergente:
Muestra la imagen oficial más grande.
Muestra la frase “¡Yo te elijo!”.
Incluye un botón que lleva a la ficha oficial del Pokémon en WikiDex.
Se reproduce un sonido de selección Pokémon.

Cómo funciona
Se conecta en tiempo real a la PokeAPI, que provee los datos actualizados de los Pokémon.
Usa JavaScript para hacer las peticiones, mostrar tarjetas, aplicar filtros, abrir el modal y reproducir sonido.
Usa CSS personalizado para los efectos visuales (flip, luces neón, sombreado, animaciones).
Todo el contenido se carga dinámicamente, sin necesidad de recargar la página.
