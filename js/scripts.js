// IIFE including pokemonList variable
let pokemonRepository = (function () {
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
// Add pokemon to pokemonList array
  function add(pokemon) {
      pokemonList.push(pokemon);
  }
// Return of array of problem
  function getAll() {
      return pokemonList;
  }
// My public functions
  return {
    add: add,
    getAll: getAll
  };

})();

// Loop for name/height and checks if big/small/both with conditional
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(`<p>${pokemon.name} (height:
  ${pokemon.height})`);

  if (pokemon.height > 4) {
    document.write(` - Wow, you are pretty tall!</p>`);
  } else if (pokemon.height < 4) {
    document.write(` - Aww, you are short!</p>`);
  } else {
    document.write(` - You can be short or tall!</p>`);
  }

});
