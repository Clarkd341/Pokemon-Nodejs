const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyparser = require('body-parser')
const { success, getUniqueId } = require('./helper.js')
const pokemons = require('./mock-pokemon')
const app = express()
const port = 3000

// utlisation de middleware morgan et favicon combinaison
app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyparser.json())


// App.get et res.send afficher hello
app.get('/', (req, res) => res.send('Hello again, express 2!'))

//json
// Route GET pour récupérer un Pokémon spécifique par son ID et ensuite le POST
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // Recherche le Pokémon correspondant à l'ID dans le tableau 'pokemons'
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien était trouvé.'

    // retourner une réponse Json avec la méthode success
    res.json(success(message, pokemon))

})


// Ajoute POST et ajoute de pokemon avec notre outil GetUniqueId dans helper.js 
// Par la suite verification dans Insomnia 
app.post('/api/pokemons', (req, res) => { 
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`;
  res.json(success(message, pokemonCreated));
});

// route 2 pour récupérer tous les Pokémon et retourner en JSON
app.get('/api/pokemons', (req, res) => {
 const message =  'La liste des pokémons a bien été récupérée.'
 res.json(success(message, pokemons))

})

// lancer serveur
app.listen(port, () => {
  console.log(`Notre application node est démarrée sur : http://localhost:${port}`);
});


/*
// 4 middleware plus propre et circonscrit on remplace logger avec méthode app.use

app.use((req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
})
*/

/*
// 3 middleware avec logger 
const logger = (req, res, next) => {

    console.log(`URL : ${req.url}`)
    next()
}
app.use(logger)
*/

/*
// 2 Route GET pour parcourir les tableaux de tous les Pokémon. Le total affiche 12

app.get('/api/pokemons', (req, res) => {
 res.send(`Il y a en tout ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})
*/


