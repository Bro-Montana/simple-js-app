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

// Loop for list of pokemon and their attributes
for (let i=0; i < pokemonList.length; i++)
    if (pokemonList[i].height > 4) {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - Wow, you are pretty tall!");
  } else if (pokemonList[i].height < 4) {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - Aww, you are short!")
  } else {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - You can be short or tall!")
  }
