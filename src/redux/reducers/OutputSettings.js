import ACTIONS from '../actions';

const initialState = {
    needsUpdate: true,
    sourceWidth: 0,
    sourceHeight: 0,
    stockWidth: 0,
    stockHeight: 0,
    toolDiameter: 0.4,
    feedrateTravel: 2000,
    feedratePlunge: 1200,
    heightTravel: 3,
    heightPlunge: 0.2,
}

function OutputSettings(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SET_OUTPUT_SIZE: {
            return {
                ...state,
                stockWidth: action.payload.width,
                stockHeight: action.payload.height,
            }
        }

        case ACTIONS.SET_SOURCE_SIZE:
            return {
                ...state,
                stockWidth: action.payload.width,
                stockHeight: action.payload.height,
                sourceWidth: action.payload.width,
                sourceHeight: action.payload.height,
            };

        case ACTIONS.SET_OUTPUT_TOOL_DIAMETER: {
            return {
                ...state,
                toolDiameter: action.payload,
            }
        }

        case ACTIONS.SET_FEEDRATE_TRAVEL: {
            return {
                ...state,
                feedrateTravel: action.payload,
            }
        }

        case ACTIONS.SET_FEEDRATE_PLUNGE: {
            return {
                ...state,
                feedratePlunge: action.payload,
            }
        }

        case ACTIONS.SET_HEIGHT_TRAVEL: {
            return {
                ...state,
                heightTravel: action.payload,
            }
        }

        case ACTIONS.SET_HEIGHT_PLUNGE: {
            return {
                ...state,
                heightPlunge: action.payload,
            }
        }

        default:
            return state;
    }
}

export default OutputSettings;