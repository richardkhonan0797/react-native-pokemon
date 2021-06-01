const initialState = {
    next: null,
    results: null,
    detail: null
}

export const itemReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_ITEMS': {
            return {
                next: action.items.next,
                results: action.items.results,
            }
        }
        case 'NEXT_ITEMS': {
            return {
                next: action.items.next,
                results: [
                    ...state.results,
                    ...action.items.results
                ]
            }
        }
        case 'ITEM_DETAIL': {
            return {
                ...state,
                detail: action.detail
            }
        }
        default: 
            return state
    }
}