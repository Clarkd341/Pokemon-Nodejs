const express = require('express');
const { success } = require('./helper.js');
const pokemons = require('./mock-pokemon');
const app = express();
const port = 3000;

// App.get pour afficher dans la console Hello
app.get('/', (req, res) => {
  res.send('Hello again, express 2!');
});

// Route GET pour récupérer un Pokémon spécifique par son ID
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // Recherche le Pokémon correspondant à l'ID dans le tableau 'pokemons'
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien était trouvé.'
    
    // retourner une reponse Json avec la méthode success
    res.json(success(message, pokemon))

})


// Route GET pour parcourir les tableaux de tous les Pokémon. Le total affiche 12
app.get('/api/pokemons', (req, res) => {
 res.send(`Il y a en tout ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})


// lancer serveur
app.listen(port, () => {
  console.log(`Notre application node est démarrée sur : http://localhost:${port}`);
});
