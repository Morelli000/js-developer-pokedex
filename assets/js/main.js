const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1302

const limit = 250

let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}" onmouseover="this.src='${pokemon.shinyPhoto}'" onmouseout="this.src='${pokemon.photo}'" alt="${pokemon.name}">
                
                
            </div>      

            <div class="ability-detail">
                <ol class="abilities">
                    <span>Abilities</span>
                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
                </ol>
            </div>

        </li>
    `).join('')

        pokemonList.innerHTML += newHtml
    })    
}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNexPage = offset + limit

    if (qtdRecordWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
    loadPokemonItens(offset, limit)
    }
})