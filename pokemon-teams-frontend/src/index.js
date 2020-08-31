const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

// Initializers on load
fetchAllTrainers();
listenForClick();

// Click Event Handler
// NOTE: using "mouseup" to simulate "click" in this case to increase performance
function listenForClick() {
  document.addEventListener("mouseup", clickEventHandler);
}

function clickEventHandler(event) {
  if (event.target.matches(".release")) {
    fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .catch(console.log);

    event.target.parentElement.remove();
  } else if (event.target.matches(".card > button")) {
    if (
      event.target.parentElement.getElementsByTagName("UL")[0].childNodes
        .length === 6
    ) {
      alert("Cannot add more than six pokemon, sorry!");
    } else {
      fetch(
        `http://localhost:3000/pokemons?trainer_id=${event.target.dataset.trainerId}`,
        { method: "POST" }
      )
        .then((resp) => resp.json())
        .then(addPokemonToTrainer);
    }
  }
}

// API call functions
function fetchAllTrainers() {
  fetch("http://localhost:3000/trainers")
    .then((resp) => resp.json())
    .then(displayAllTrainers);
}

// Display functions
function displayAllTrainers(trainers) {
  const trainersNode = document.getElementById("trainers");

  for (const trainer of trainers) {
    trainersNode.appendChild(renderTrainerCard(trainer));
  }
}

function addPokemonToTrainer(pokemon) {
  const trainerPokemonList = document.querySelector(
    `div[data-id="${pokemon.trainer_id}"] > ul`
  );

  trainerPokemonList.appendChild(renderPokemonListNode(pokemon));
}

function renderTrainerCard(trainer) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = trainer.id;
  const trainerName = document.createElement("p");
  trainerName.textContent = trainer.name;
  const addPokemonButton = document.createElement("button");
  addPokemonButton.textContent = "Add Pokemon";
  addPokemonButton.dataset.trainerId = trainer.id;
  const pokemonList = document.createElement("ul");

  trainer.pokemons.forEach((pokemon) =>
    pokemonList.appendChild(renderPokemonListNode(pokemon))
  );

  card.appendChild(trainerName);
  card.appendChild(addPokemonButton);
  card.appendChild(pokemonList);

  return card;
}

function renderPokemonListNode(pokemon) {
  const pokemonListNode = document.createElement("li");
  pokemonListNode.append(`${pokemon.nickname} (${pokemon.species})`);

  const releasePokemonButton = document.createElement("button");
  releasePokemonButton.classList.add("release");
  releasePokemonButton.textContent = "Release";
  releasePokemonButton.dataset.pokemonId = pokemon.id;

  pokemonListNode.appendChild(releasePokemonButton);

  return pokemonListNode;
}
