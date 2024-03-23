import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Start loading

    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error('Error', error))
      .finally(() => setIsLoading(false)); // Stop loading
  }, [currentPage]);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="navdiv">
            <ul>
              <li>
                <button onClick={() => handleLanguageChange('english')}>English</button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
              </li>
              <li>
                <button onClick={() => handleLanguageChange('french')}>French</button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Back
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              pokemon={pokemon}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;