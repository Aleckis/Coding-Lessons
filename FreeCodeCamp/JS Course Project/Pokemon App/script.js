// HTML elements variables: references to elements in the DOM that will display the Pokémon data
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const namePokemon = document.getElementById("pokemon-name");
const imagePokemon = document.getElementById("sprite");
const idPokemon = document.getElementById("pokemon-id");
const weightPokemon = document.getElementById("weight");
const heightPokemon = document.getElementById("height");
const typesPokemon = document.getElementById("types");
const hpPokemon = document.getElementById("hp");
const attackPokemon = document.getElementById("attack");
const defensePokemon = document.getElementById("defense");
const spAttackPokemon = document.getElementById("special-attack");
const spDefensePokemon = document.getElementById("special-defense");
const speedPokemon = document.getElementById("speed");

// Formats the input value to ensure it's valid for searching
// If the input is a number, it returns the number as is (likely a Pokémon ID)
// If it's not a number, it removes special characters and spaces, and formats it for Pokémon name search
const formatInput = (value) => {
  // Checks if the value is a number (for Pokémon ID search)
  if (/^\d+$/.test(value)) {
    return value;
  }

  // Regex patterns to remove spaces and special characters (except valid Pokémon symbols like '♂' and '♀')
  const spacePattern = /\s/gi;
  const symbolPattern = /([^a-zA-Z-♀♂])/gi;

  // Trims, replaces spaces with hyphens, removes invalid symbols, and converts to lowercase
  let newValue = value
    .trim()
    .replace(spacePattern, "-")
    .replace(symbolPattern, "")
    .toLowerCase();

  // Special handling for Pokémon gender symbols '♀' and '♂' (adds "-f" for female and "-m" for male)
  if (newValue.includes("♀")) {
    newValue = newValue.replace(/♀/gi, "");
    return `${newValue}-f`;
  } else if (newValue.includes("♂")) {
    newValue = newValue.replace(/♂/gi, "");
    return `${newValue}-m`;
  }

  return newValue; // Return formatted name
};

// Main function to get Pokémon information from the API
// Takes in the user's input (either name or ID) and the API URL
const getPokemonInfo = (pokemon, url) => {
  // Checks if the input field is empty and alerts the user if so
  if (pokemon.value === "") {
    alert("Please insert a value!");
    return;
  }

  // Formats the input (name or ID) for the API query
  const pokemonIdentifier = formatInput(pokemon);

  // Constructs the API URL using the formatted identifier
  const link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIdentifier}`;

  // Makes a GET request to the Pokémon API
  fetch(link)
    .then((res) => {
      // Handles errors like Pokémon not found (status 404)
      if (!res.ok) {
        if (res.status === 404) {
          alert("Pokémon not Found!");

          // Resets all the Pokémon data fields if not found
          namePokemon.textContent = "";
          imagePokemon.setAttribute("src", "");
          imagePokemon.setAttribute("alt", "");
          idPokemon.textContent = "";
          weightPokemon.textContent = "";
          heightPokemon.textContent = "";
          typesPokemon.innerHTML = "";
          hpPokemon.textContent = "";
          attackPokemon.textContent = "";
          defensePokemon.textContent = "";
          spAttackPokemon.textContent = "";
          spDefensePokemon.textContent = "";
          speedPokemon.textContent = "";
        }
        throw new Error(`An error occurred: ${res.status}`); // Logs error message if not successful
      }
      return res.json(); // Converts the response to JSON format
    })
    .then((data) => {
      // Updates the HTML elements with the Pokémon data from the API response
      namePokemon.textContent = data.name.toUpperCase();
      imagePokemon.setAttribute("src", `${data.sprites.front_default}`);
      imagePokemon.setAttribute("alt", `${data.name} front image`);
      idPokemon.textContent = data.id;
      weightPokemon.textContent = data.weight;
      heightPokemon.textContent = data.height;

      // Updates Pokémon types (handles multiple types)
      typesPokemon.innerHTML = "";
      data.types.forEach((item) => {
        typesPokemon.innerHTML += `<p style="display: inline-block; margin: 0 2px;">${item.type.name.toUpperCase()} </p>`;
      });

      // Updates base stats like HP, Attack, Defense, etc.
      hpPokemon.textContent = data.stats.find(
        (i) => i.stat.name === "hp"
      ).base_stat;
      attackPokemon.textContent = data.stats.find(
        (i) => i.stat.name === "attack"
      ).base_stat;
      defensePokemon.textContent = data.stats.find(
        (i) => i.stat.name === "defense"
      ).base_stat;
      spAttackPokemon.textContent = data.stats.find(
        (i) => i.stat.name === "special-attack"
      ).base_stat;
      spDefensePokemon.textContent = data.stats.find(
        (i) => i.stat.name === "special-defense"
      ).base_stat;
      speedPokemon.textContent = data.stats.find(
        (i) => i.stat.name === "speed"
      ).base_stat;
    })
    .catch((error) => console.error(error.message)); // Logs any errors during the fetch process
};

// Event listener for the search button click event
// Prevents default page reload and triggers the Pokémon search function
button.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent page reload when the form is submitted

  getPokemonInfo(input.value); // Calls the function to fetch Pokémon data based on user input
});
