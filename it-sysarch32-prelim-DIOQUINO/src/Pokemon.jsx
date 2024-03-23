import React from 'react';
import './Pokemon.css'
const Pokemon = ({ pokemon, language }) => {
  const { id, name, image } = pokemon;

  const getNameByLanguage = () => {
    switch (language) {
      case 'english':
        return name.english;
      case 'japanese':
        return name.japanese;
      case 'chinese':
        return name.chinese;
      case 'french':
        return name.french;
      default:
        return name.english;
    }
  };

  return (
    <div className="pokemon">
      <img src={image} alt={getNameByLanguage()} />
      <h3>[{id}]&nbsp;{getNameByLanguage()}</h3>
    </div>
  );
};

export default Pokemon;