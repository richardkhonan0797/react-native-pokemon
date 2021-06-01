const initialState = {
    next:'',
    results: [
        {
            name:'loading',
            url:'loading'
        }
    ],
    detail: null
}

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POKEMONS': {
            return {
                next: action.pokemons.next,
                results: action.pokemons.results
            }
        }
        case 'NEXT_POKEMONS': {
            return {
                next: action.pokemons.next,
                results: [
                    ...state.results,
                    ...action.pokemons.results
                ],
                ...state
            }
        }
        case 'POKEMON_DETAIL': {
            return {
                ...state,
                detail: action.data
            }
        }
        default : {
            return state
        }
    }
}