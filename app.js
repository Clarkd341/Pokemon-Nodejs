const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyparser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const { success, getUniqueId } = require('./helper.js');
let pokemons = require('./mock-pokemon');
const PokemonModel = require('./src/models/pokemon');
const app = express();
const port = 3000;

// Configuration Sequelize
const sequelize = new Sequelize(
  'pokedex',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2'
    },
    logging: false
  }
);
// message de connexion base de Données ou message d'erreur
sequelize.authenticate()
  .then(() => console.log('La connexion à la base de données a bien été établie'))
  .catch(error => console.log(`Impossible de se connecter à la base de données erreur : ${error}`));

  // sequelize et base de données Synchronisation
  const Pokemon = PokemonModel(sequelize, DataTypes)

  sequelize.sync({force: true})
  .then(_ => console.log('La base de donnnées "Pokedex" a bien été synchronisée.'))


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

// Modifier une donnée existante avec PUT  par la suite vérification sur Insomnia
app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const pokemonUpdate = { ...req.body, id: id };

  // Parcourir la liste des Pokémon  qui correspond à l'ID fonctionne pareil avec if else (? et :) 
  pokemons = pokemons.map(pokemon => {
      return pokemon.id === id ? pokemonUpdate : pokemon;
  });

  const message = `Le Pokémon ${pokemonUpdate.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdate));
});


// Delete verification dans Insomnia
app.delete('/api/pokemons/:id',(req,res) => {

   // On recupere L'id du pokémon
  const id = parseInt(req.params.id);
  // cherche qui a id
  const pokemondelete = pokemons.find(pokemon => pokemon.id === id);
  // un petit filtrage de pokémon pour supprimer id correspondant
  pokemons = pokemons.filter(pokemon => pokemon.id !== id);


  // et ensuite le petite message qu'il faut pour confirmer le tout
  const message = `Le pokemon ${pokemondelete.name} a bien été supprimé.`;
  res.json(success(message, pokemondelete));

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


