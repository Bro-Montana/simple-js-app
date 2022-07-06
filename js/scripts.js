// IIFE for global variables
let pokemonRepository = (function () {

  // pokemon array and api link to pokemon list
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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




  function addListItem(pokemon) {
  // list and button for index
  let list = document.querySelector('.pokemon-list');

  // button and list element
  let listItem = document.createElement('li');
  let button = document.createElement('button');

  //style for button and text
  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');

  //append button to list and list item to unordered list
  listItem.appendChild(button);
  list.appendChild(listItem);
  // console logs pokemon when clicked
    advancedPokeButton (button, pokemon);
  }

  // shows details for pokemon in list
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // event listener for pokemon buttons
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // MODAL FUNCTIONS WRECKING MY BRAIN LIKE CRAZY

  // opens modal with pokemon information
   function showModal(pokemon) {
       let modalContainer = document.querySelector('#modal-container');

       // clear all existing modal content
       modalContainer.innerHTML = '';

       let modal = document.createElement('div');
       modal.classList.add('modal');

       // adds close button for modal with event listener
       let closeButtonElement = document.createElement('button');
       closeButtonElement.classList.add('modal-close');
       closeButtonElement.innerText = 'Close';
       closeButtonElement.addEventListener('click', hideModal);

       // title as pokemon name
       let titleElement = document.createElement('h1');
       titleElement.innerText = pokemon.name;

       // information displayed is sprite, height and types
       let imageContent = document.createElement('img');
       imageContent.setAttribute('src', pokemon.imageUrl);
       let heightElement = document.createElement('p');
       heightElement.innerText = 'height: ' + pokemon.height;
       let typeArray = pokemon.types.map(function (index) {
           return index.type.name;
       })
       let typeElement = document.createElement('p');
       typeElement.innerText = 'type:'
       typeArray.forEach(function (type) {
           typeElement.innerText += ' ' + type;
       });


       modal.appendChild(closeButtonElement);
       modal.appendChild(titleElement);
       modal.appendChild(imageContent);
       modal.appendChild(heightElement);
       modal.appendChild(typeElement);
       modalContainer.appendChild(modal);

       modalContainer.classList.add('is-visible');
   }

   // hides modal
   function hideModal() {
       let modalContainer = document.querySelector('#modal-container');
       modalContainer.classList.remove('is-visible');
   }

    // closes modal when escape key is pressed
   let modalContainer = document.querySelector('#modal-container');
   window.addEventListener('keydown', function (e) {
       let modalContainer = document.querySelector('#modal-container');
       if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
           hideModal();
       }
   });

   // closes modal when user clicks outside of modal
   modalContainer.addEventListener('click', (e) => {
       // Since this is also triggered when clicking INSIDE the modal
       // We only want to close if the user clicks directly on the overlay
       let target = e.target;
       if (target === modalContainer) {
         hideModal();
       }
   });



  // return statements for IIFE
  return {
    addv: addv,
    getAll: getAll,
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

(function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'Got to have a email, fam.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'What are we doing? Email must be valid.');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Got to have a password, fam.');
      return false;
    }

    if (value.length < 8) {
      showErrorMessage(passwordInput, 'Stretch that password to 8 or more characters, big dog.');
      return false;
    }

    showErrorMessage(passwordInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
})();
