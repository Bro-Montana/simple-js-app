// IIFE for global variables
let pokemonRepository = (function () {

  // pokemon array and api link to pokemon list
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';
  let currentModalPokemon = null;
  let modalContainer = document.querySelector('#pokemonModal')

  function getAll() {
      return pokemonList;
  }

  function add(pokemon) {
      pokemonList.push(pokemon);

  }

  // Verifies added pokemon, adds pokemon if valid / alerts if invalid
    function addv(item) {
  //Checks input for validity
        if (typeof item === 'object' && 'name' in item && 'detailsUrl' in item) {
            add(item);
        }
        else {
            alert('Pokemon not valid');
        }
    }

    //finds pokemons in the array that contains the characters in the input
      function find(inputName) {
          //checks if input is a string
          if (typeof inputName !== 'string') {
              alert('Inputted pokemon name is not a string!')
              return;
          }
          //find pokemons in our array (convert everything to lowercase to ignore case sensitivity)
          let found = pokemonList.filter(function (pokemon) {
              let uppercaseListName = pokemon.name.toUpperCase();
              let uppercaseInputName = inputName.toUpperCase();
              return uppercaseListName.includes(uppercaseInputName);
          });

              return found;
          }



  function addListItem(pokemon) {
  // selects unordered list
  let container = document.querySelector('.container-fluid');

  //create row div, col div, and button
  let rowdiv = document.createElement('div');
  let coldiv = document.createElement('div');
  let button = document.createElement('button');

  //button and list
  //set bootstrap classs and text to divs and button
  rowdiv.classList.add('row', 'align-content-center', 'list-group-item', 'bg-dark');
  rowdiv.setAttribute('style', 'height: 100px');
  coldiv.classList.add('col', 'd-flex', 'justify-content-center', 'm-2');
  button.innerText = pokemon.name;
  button.classList.add('btn', 'btn-danger', 'btn-lg', 'w-50');
  button.setAttribute('type', 'button');
  button.setAttribute('style', 'height: 75px');

  //set button to open bootstrap modal
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#pokemonModal');


  //append button to col div, col div to row div, and row div to container
  coldiv.appendChild(button);
  rowdiv.appendChild(coldiv);
  container.appendChild(rowdiv);

  // pokemon details when clicked
    advancedPokeButton (button, pokemon);
  }

  // shows details for pokemon in list
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // event listener for pokemon button
  function advancedPokeButton (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
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
      addv(pokemon);
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
      item.frontImage = details.sprites.front_default;
      item.backImage = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // MODAL FUNCTIONS WRECKING MY BRAIN LIKE CRAZY

  // opens modal with pokemon information
   function showModal(pokemon) {


       // modal nodes
       let modalTitle = $(".modal-title");
       let modalBody = $(".modal-body");
       let modalHeader = $(".modal-header");
       // currentModalPokemon = pokemon;

       //clear existing content
       // modalHeader.empty();
       modalTitle.empty();
       modalBody.empty();

      // append name to title
      let nameElement = $("<h1>" + pokemon.name + "</h1>");

      // get all details about pokemon
      let frontImage = $('<img class="modal-img" style="width:50%">');
      frontImage.attr("src", pokemon.frontImage);
      let backImage = $('<img class="modal-img" style="width:50%">');
      backImage.attr("src", pokemon.backImage);
      let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
      let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
      let typeElement = $("<p>" + "types: " + pokemon.types + "</p>");
      let abilitiesElement = $("<p>" + "abilities: " + pokemon.abilities + "</p>");

      // append all pokemon details to modal body
      modalTitle.append(nameElement);
      modalBody.append(frontImage);
      modalBody.append(backImage);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);
      modalBody.append(abilitiesElement);

   }



   //variables for pointer events
     let startX = null;
     let isSwiping = false;

     // takes note of start position of pointer
     function handleStart(e) {
         isSwiping = true;
         let x = e.pageX; // X-coordinate of click/touch
         startX = x;
     }

     // checks if pointer traveled enough distance to swap between pokemon modals
     function handleEnd(e) {
       isSwiping = false;
       if (Math.abs(e.pageX - startX) > 200) {
           // swipe left: go next pokemon
           if(e.pageX-startX < 0) {
               let index = pokemonList.indexOf(currentModalPokemon);
               // if index is last dont go next pokemon
               index === (pokemonList.length - 1) ? null : showDetails(pokemonList[index+1]);
               startX = null;
           }
            // swipe right: go previous pokemon
           else if(e.pageX - startX > 0) {
               let index = pokemonList.indexOf(currentModalPokemon);
               // if index is first dont go next pokemon
               index === 0 ? null : showDetails(pokemonList[index-1]);
               startX = null;
           }
       }
       else {
           startX = null;
       }
   }

   // // event listeners for swiping between data items
   modalContainer.addEventListener("pointerdown", handleStart);
   modalContainer.addEventListener("pointerup", handleEnd);
   // event listener for search bar
    let search_input = document.querySelector('input[type="text"]');
    search_input.addEventListener('input', function() {
        let container = document.querySelector('.container-fluid');
        //if input value is empty show all pokemon
        if(search_input.value === '') {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            pokemonRepository.getAll().forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon);
            });
        }
        //if input value is not empty show all pokemon that contains input
        else {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            find(search_input.value).forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon);
            });
        }
    });

  // return statements for IIFE
  return {
    getAll: getAll,
    addv: addv,
    find: find,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
    };

})();

//function to call data from loaded list
pokemonRepository.loadList().then(function () {
// forEach loop for pokemon
  pokemonRepository.getAll().forEach (function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
