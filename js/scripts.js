// IIFE for global variables
let pokemonRepository = (function () {
  // pokemon array and api link to pokemon list
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // nested variable
/*  let pokemonList = [
    {
      name: 'Bulbasuar',
      height: 7,
      types: ['grass','poison']
    }, {
      name: 'Charizard',
      height: 4,
      types: ['fire', 'flying']
    }, {
      name: 'Squirtle',
      height: 1,
      types: ['water']
    }
  ];
*/
  function getAll() {
      return pokemonList;
  }

  function add(pokemon) {
      pokemonList.push(pokemon);

  }

  // Verifies added pokemon, adds pokemon if valid / alerts if invalid
    function addv(item) {
  //Checks input for validity
        if (typeof item === 'object' && 'name') {
            add(item);
        }
        else {
            alert('Pokemon not valid');
        }
    }




  function addListItem(pokemon) {
  // list and button for index
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list');
    listItem.appendChild(button);
    list.appendChild(listItem);
  // console logs pokemon when clicked
    advancedPokeButton (button, pokemon);
  }
  // event listener for pokemon buttons
  function advancedPokeButton (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  };
  // shows details for pokemon in list
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  // load list function for pokemon url
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
      add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // function to load specific pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // pokemon item details
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    addv: addv,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
    };
})();

//function to call data from loaded list
pokemonRepository.loadList().then(function () {
// forEach loop for pokemon
  pokemonRepository.getAll().forEach (function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
