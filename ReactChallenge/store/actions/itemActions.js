import axios from 'axios'

export const fetchItems = () => {
    return function (dispatch) {
        axios({
            method: 'get',
            url: 'https://pokeapi.co/api/v2/item?limit=20'
        })
            .then( ({data}) => {
                console.log(data)
                dispatch({
                    type: 'SET_ITEMS',
                    items: data
                })
            })
            .catch( err => console.log(err))
    }
}

export const fetchNextItems = (payload) => {
    return function (dispatch) {
        axios({
            method: 'get',
            url: payload.next
        })
            .then( ({data}) => {
                dispatch({
                    type:'NEXT_ITEMS',
                    items: data
                })
            })
            .catch( err => console.log(err))
    }
}

export const fetchItemDetail = (payload) => {
    return function (dispatch) {
        axios({
            method: 'get',
            url: payload.url
        })
            .then( ({data}) => {
                dispatch({
                    type:'ITEM_DETAIL',
                    detail: data
                })
            })
            .catch( err => console.log(err))
    }
}