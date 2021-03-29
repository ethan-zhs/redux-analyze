const initialState = {
    count: 0
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'plus': 
            return {
                ...state,
                count: state.count + 1
            }

        case 'substact': 
            return {
                ...state,
                count: state.count - 1
            }
        
        default: 
            return initialState
    }
}

module.exports = reducer