import { createStore } from 'redux';

export const ACTIONS = {
    TOGGLE_RASTER_LAYER_CYAN: 'TOGGLE_RASTER_LAYER_CYAN',
    TOGGLE_RASTER_LAYER_MAGENTA: 'TOGGLE_RASTER_LAYER_MAGENTA',
    TOGGLE_RASTER_LAYER_YELLOW: 'TOGGLE_RASTER_LAYER_YELLOW',
    TOGGLE_RASTER_LAYER_BLACK: 'TOGGLE_RASTER_LAYER_BLACK',
};

const initialState = {
    sourceImage: undefined,

    keyweight: 1,
    raster_visibility: {
        cyan: true,
        magenta: true,
        yellow: true,
        black: true
    },

    stockHeight: 0,
    stockWidth: 0,
    toolDiameter: 0.4
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case (ACTIONS.TOGGLE_RASTER_LAYER_CYAN): {
            return {
                ...state,
                raster_visibility: {
                    ...state.raster_visibility,
                    cyan: !state.raster_visibility.cyan,
                },
            }
        }
        case (ACTIONS.TOGGLE_RASTER_LAYER_MAGENTA): {
            return {
                ...state,
                raster_visibility: {
                    ...state.raster_visibility,
                    magenta: !state.raster_visibility.magenta,
                },
            }
        }
        case (ACTIONS.TOGGLE_RASTER_LAYER_YELLOW): {
            return {
                ...state,
                raster_visibility: {
                    ...state.raster_visibility,
                    yellow: !state.raster_visibility.yellow,
                },
            }
        }
        case (ACTIONS.TOGGLE_RASTER_LAYER_BLACK): {
            return {
                ...state,
                raster_visibility: {
                    ...state.raster_visibility,
                    black: !state.raster_visibility.black,
                },
            }
        }
        default: {
            return state;
        }
    }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
    const store = createStore(reducer, enableReduxDevTools)
    return store;
}