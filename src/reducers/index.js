const initialState = {
    stateModals: {
      detalle: false,
      reload: false,
      result: false,
    },
    statusTXT: {
        status:'',
        message: '',
    },
    pagosSeleccionados: 0,
    toTXT:[],
    montoPorPagar: 0,
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
        case 'SET_MONTO':
            return {
                ...state,
                montoPorPagar: action.payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                statusTXT: action.payload
            }
        default:
            return state;
    }
}

export default reducer;