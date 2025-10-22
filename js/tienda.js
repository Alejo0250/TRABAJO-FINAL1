/* URL del archivo JSON donde se almacenan los datos de las tiendas */
const TIENDAS_URL = "data/tiendadb.json";

/* 🏷️ Componente que representa una tarjeta individual de tienda */
function TiendaCard({ tienda, onSelectTienda }) {
  return (
    <div
      onClick={() => onSelectTienda(tienda)} // ✅ Al hacer clic se abre el modal
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl 
                 transform hover:scale-105 transition-all duration-300 overflow-hidden 
                 group cursor-pointer"
    >
      {/* Contenedor de la imagen principal */}
      <div className="relative overflow-hidden h-64">
        <img
          src={`imagenes/zapatillas/${tienda.imagen}`} // Ruta dinámica
          alt={tienda.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{ zIndex: 2 }}
        ></div>
      </div>

      {/* Sección inferior */}
      <div className="p-6">
        <h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {tienda.nombre}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {tienda.descripcion}
        </p>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2">
          {/* Marca */}
          <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 
                           px-3 py-1 rounded-full text-xs font-medium">
            {tienda.marca}
          </span>

          {/* Colores */}
          {tienda.color.map((col, i) => {
            let bgColor = "bg-gray-200 text-gray-800";
            if (col.includes("Celeste")) bgColor = "bg-blue-100 text-blue-400";
            else if (col.includes("Azul")) bgColor = "bg-blue-300 text-blue-600";
            else if (col.includes("Dorado")) bgColor = "bg-yellow-400 text-yellow-700";
            else if (col.includes("Verde")) bgColor = "bg-green-100 text-green-400";
            else if (col.includes("Rojo")) bgColor = "bg-red-100 text-red-400";
            else if (col.includes("Rosado")) bgColor = "bg-pink-300 text-pink-700";
            else if (col.includes("Negro")) bgColor = "bg-gray-600 text-white";
            else if (col.includes("Blanco")) bgColor = "bg-gray-100 text-gray-700";

            return (
              <span key={i} className={`${bgColor} px-3 py-1 rounded-full text-xs font-medium`}>
                {col}
              </span>
            );
          })}

          {/* Popularidad */}
          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900 px-3 py-1 rounded-full">
            <span className="text-yellow-700 dark:text-yellow-300 text-sm font-semibold">
              {tienda.popularidad}
            </span>
          </div>

          {/* Precio */}
          <span
            className="bg-green-400 dark:bg-green-900 text-black dark:text-white 
                       px-3 py-1 rounded-full text-xs font-medium"
          >
            {tienda.precios}
          </span>

          {/* Moneda */}
          <span
            className="bg-yellow-400 dark:bg-yellow-900 text-black dark:text-white 
                       px-3 py-1 rounded-full text-xs font-medium"
          >
            {tienda.moneda}
          </span>

          {/* Talla */}
          <span
            className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 
                       px-3 py-1 rounded-full text-xs font-medium"
          >
            {tienda.talla}
          </span>
        </div>
      </div>
    </div>
  );
}

/* 🧱 GRID GENERAL: organiza las tarjetas en filas y columnas */
function TiendasGrid({ tiendas, onSelectTienda }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tiendas.map((tienda, idx) => (
        <TiendaCard key={idx} tienda={tienda} onSelectTienda={onSelectTienda} />
      ))}
    </div>
  );
}

/* 🌙 Componente principal con modo oscuro/claro + modal */
function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [tiendas, setTiendas] = React.useState([]);
  const [selectedTienda, setSelectedTienda] = React.useState(null); // ✅ para el modal

  // Guardar tema automáticamente
  React.useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Cambiar modo
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Cargar JSON
  React.useEffect(() => {
    fetch(TIENDAS_URL)
      .then((res) => res.json())
      .then((data) => setTiendas(data))
      .catch((error) => console.error("Error al cargar tiendas:", error));
  }, []);

  return (
    <div className={isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}>
      {/* ENCABEZADO */}
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">🛍️ Tienda Colección</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                     text-gray-800 dark:text-gray-100 transition"
        >
          {isDarkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-6">
        <h2
          className="text-4xl font-bold text-center mb-8 
                     bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Catálogo
        </h2>

        {/* GRID DE TIENDAS */}
        <TiendasGrid tiendas={tiendas} onSelectTienda={setSelectedTienda} />

        {/* MODAL DETALLES */}
        {selectedTienda && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedTienda(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                ✖
              </button>

              {/* Imagen principal */}
              <img
                src={`imagenes/zapatillas/${selectedTienda.imagen}`}
                alt={selectedTienda.nombre}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              {/* Información */}
              <h3 className="text-2xl font-bold mb-2">{selectedTienda.nombre}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {selectedTienda.descripcion}
              </p>

              {/* Etiquetas */}
              <div className="flex flex-wrap gap-2 text-sm mb-3">
                <span className="bg-red-100 px-3 py-1 rounded-full">{selectedTienda.marca}</span>
                <span className="bg-green-100 px-3 py-1 rounded-full">
                  {selectedTienda.precios} {selectedTienda.moneda}
                </span>
                <span className="bg-purple-100 px-3 py-1 rounded-full">
                  Talla {selectedTienda.talla}
                </span>
                <span className="bg-yellow-100 px-3 py-1 rounded-full">
                  Popularidad: {selectedTienda.popularidad}
                </span>
              </div>

              {/* Colores */}
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTienda.color.map((col, i) => (
                  <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {col}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* Renderiza la app */
ReactDOM.render(<App />, document.getElementById("tiendasgrid"));
