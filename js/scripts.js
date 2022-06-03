// IIFE for global variables
let pokemonRepository = (function () {

  // nested variables
  let pokemonList = [
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


  return {
    add: add,
    getAll: getAll
    };

})();

// forEach loop for pokemon
pokemonRepository.getAll().forEach (function (pokemon) {
  // list and button for index
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list');
    listItem.appendChild(button);
    list.appendChild(listItem);


});
