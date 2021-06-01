import { createStore } from 'redux'
import { pokemonReducer } from './reducers/pokemonReducer'
import { itemReducer } from './reducers/itemReducer'
import { combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from './middlewares/thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    pokemons: pokemonReducer,
    items: itemReducer
})

export const store = createStore(rootReducer,composeEnhancer(compose,applyMiddleware(thunk)))
