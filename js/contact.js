function Contact() {
  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Dejanos tus datos</h2>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Nombre" className="border p-2 rounded" required />
        <input type="email" placeholder="Correo Electrónico" className="border p-2 rounded" required />
        <textarea placeholder="Mensaje" rows="4" className="border p-2 rounded" required></textarea>
        <select className="border p-2 rounded">
          <option value="peru">Perú</option>
          <option value="colombia">Colombia</option>
          <option value="mexico">México</option>
          <option value="argentina">Argentina</option>
        </select>
        <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
