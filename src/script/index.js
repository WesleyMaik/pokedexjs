let offset = 0,
    limit = 8;

//Init
const loadPokemon = async () => {
    await getPokedexApi(offset, limit);
    offset += limit;
    return;
};

loadPokemon();

document.querySelector('#load-more').addEventListener('click', async function(){
    const pokedex = document.querySelector('#pokedex')
    this.classList.add('loading');
    pokedex.classList.add('loading');
    await loadPokemon();
    this.classList.remove('loading');
    pokedex.classList.remove('loading');
});
