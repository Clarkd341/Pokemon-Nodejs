const express = require('express');
const pokemons = require('./mock-pokemon');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello again, express 2!');
});

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
res.send(`Vous avez demander le pokémon ${pokemon.name}`)

})


app.get('/api/pokemons', (req, res) => {
 res.send(`Il y a en tout ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})


// lancer serveur
app.listen(port, () => {
  console.log(`Notre application node est démarrée sur : http://localhost:${port}`);
});
