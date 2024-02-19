const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const image = document.getElementById('image');
const types = document.getElementById('types');
const hpValue = document.getElementById('hp');
const attackValue = document.getElementById('attack');
const defenseValue = document.getElementById('defense');
const specialAttackValue = document.getElementById('special-attack');
const specialDefenseValue = document.getElementById('special-defense');
const speedValue = document.getElementById('speed');

const source ="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"


const fetchData = async () => {
    try {
        searchInput.value = searchInput.value.toLowerCase();
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value}`);
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error('Pokémon not found');
            } else {
                throw new Error('An error occurred');
            }
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

const display = async () => {
    const data = await fetchData(); 
    if (data) { 
        types.innerHTML = "";
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `weight: ${data.weight}`;
        height.textContent = `height: ${data.height}`;
        data.types.forEach((typeElement) => {
            types.innerHTML += `<span class="typesButton">${typeElement.type.name.toUpperCase()}</span>  `;
            types.style.display = 'block';
        });
        hpValue.textContent = data.stats[0].base_stat;
        attackValue.textContent = data.stats[1].base_stat;
        defenseValue.textContent = data.stats[2].base_stat;
        specialAttackValue.textContent = data.stats[3].base_stat;
        specialDefenseValue.textContent = data.stats[4].base_stat;
        speedValue.textContent = data.stats[5].base_stat;

        image.innerHTML = `<img id="sprite"src="${data.sprites.front_default}" alt="pokemon_picture" width="250px" height="250px">`;
    }
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    display(); 
});