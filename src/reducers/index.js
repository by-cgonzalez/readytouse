const initialState = {
    stateModals: {
      detalle: false
    },
    pagosSeleccionados: 0,
    toTXT:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATEMODALS':
            return {
                ...state,
                stateModals: action.payload
            }
        case 'SET_SELECTED':
            return {
                ...state,
                pagosSeleccionados: action.payload
            }
        case 'SET_SELECTION':
            return {
                ...state,
                toTXT: action.payload
            }
        default:
            return state;
    }
}

export default reducer;