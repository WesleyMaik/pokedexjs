class Pokemon{
    #id;
    #name;
    #types;
    #height;
    #weight;
    #img;

    constructor(id, name, types, height, weight, img){
        this.#id = id;
        this.#name = name;
        this.#types = types;
        this.#height = height;
        this.#weight = weight;
        this.#img = img;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get types(){
        return this.#types;
    }

    get height(){
        return this.#height;
    }

    get weight(){
        return this.#weight;
    }

    get img(){
        return this.#img;
    }
};

const getPokemon = (id, name, types, height, weight, sprites) => {
    const pokeTypes = types.map((typeSlot) => typeSlot.type.name);
    const img = sprites.other['official-artwork'].front_default;
    const pokemon = new Pokemon(id, name, pokeTypes, height, weight, img);
    return pokemon;
};

const getDetailsByPokemon = (result) => {
    return fetch(result.url)
        .then((response) => response.json())
        .then(({id, name, types, height, weight, sprites}) => getPokemon(id, name, types, height, weight, sprites));
};

const setPokemonToPokedex = (pokemons) => {
    const pokedex = document.querySelector('#pokedex');
    pokemons.forEach((pokemon) => {
        const pokeElement = `
            <div class="pokemon" id="${pokemon.id}">
                <img class="img" src="${pokemon.img}" />
                <h3 class="name">${pokemon.name}</h3>
            </div>
        `;
    
        pokedex.innerHTML += pokeElement;
    })
};

const getPokedexApi = (offset = 0, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return fetch(url)
        .then((response) => response.json())
        .then((response) => response.results)
        .then((results) => results.map(getDetailsByPokemon))
        .then((pokeDetails) => Promise.all(pokeDetails))
        .then((pokemon) => setPokemonToPokedex(pokemon));
};

