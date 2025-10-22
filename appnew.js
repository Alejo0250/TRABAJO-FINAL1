function MyButton() {
  return <button className="bg-sky-500 text-white p-2 rounded">I'm a button</button>;
}

function MyApp() {
  const [page, setPage] = React.useState("home");

  const movies = [
    { title: "The Batman", year: 2022, genre: "Action" },
    { title: "Inception", year: 2010, genre: "Sci-Fi" },
    { title: "Interstellar", year: 2014, genre: "Adventure" },
  ];

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">My Movie App</h1>
        <nav>
          <button className="mx-2" onClick={() => setPage("home")}>Movies</button>
          <button className="mx-2" onClick={() => setPage("contact")}>Contact</button>
        </nav>
      </header>

      <main className="p-6">
        {page === "home" && <MoviesGrid movies={movies} />}
        {page === "contact" && <Contact />}
      </main>
    </div>
  );
}
