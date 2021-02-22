import ACTIONS from '../actions';

const initialState = {
    cyan: true,
    magenta: true,
    yellow: true,
    black: true,

    keyweight: 1
}

const Layers = function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.TOGGLE_RASTER_LAYER_CYAN: {
            return {
                ...state,
                cyan: !state.cyan,
            }
        }

        case ACTIONS.TOGGLE_RASTER_LAYER_MAGENTA: {
            return {
                ...state,
                magenta: !state.magenta,
            }
        }

        case ACTIONS.TOGGLE_RASTER_LAYER_YELLOW: {
            return {
                ...state,
                yellow: !state.yellow,
            }
        }

        case ACTIONS.TOGGLE_RASTER_LAYER_BLACK: {
            return {
                ...state,
                black: !state.black,
            }
        }

        case ACTIONS.SET_KEYWEIGHT: {
            return {
                ...state,
                keyweight: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default Layers;