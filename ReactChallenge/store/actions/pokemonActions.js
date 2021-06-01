import axios from 'axios'

export const fetchPokemons = () => {
    return function (dispatch, getState) {
        axios({
            method: 'get',
            url: 'https://pokeapi.co/api/v2/pokemon?limit=20'
        })
            .then( ({data}) => {
                dispatch({
                    type: 'SET_POKEMONS',
                    pokemons: data
                })
            })
            .catch( err => console.log(err))
    }
}

export const fetchNextPokemons = (payload) => {
    return function (dispatch) {
        axios({
            method: 'get',
            url: payload.next
        })
            .then( ({data}) => {
                dispatch({
                    type: 'NEXT_POKEMONS',
                    pokemons: data
                })
            })
            .catch( err => console.log(err))
    }
}

export const fetchPokemonDetail = (payload) => {
    return function (dispatch) {
        axios({
            method: 'get',
            url: payload.url
        })
            .then( ({data}) => {
                dispatch({
                    type: 'POKEMON_DETAIL',
                    data
                })
            })
            .catch( err => console.log(err))
    }
}