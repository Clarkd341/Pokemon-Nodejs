
// Méthode 3 plus court
exports.success = (message, data) => {
    return {message,data};
};

// unique id pokemon
exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map(pokemon => pokemon.id)
  const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b))
  const uniqueId = maxId + 1
    
  return uniqueId
}

// Méthode 2 on remplace const par exports.sucess
/*
  exports.success = (message,data) => {
    return {

       message : message,
       data : data

    }
  }
*/

  // Methode 1
/*const success = (message,data) => {

    return {

       message : message,
       data : data

    }
  }
*/