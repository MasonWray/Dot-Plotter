import ACTIONS from '../actions';

const initialState = {
    stockWidth: 0,
    stockHeight: 0,
    toolDiameter: 0.4
}

function OutputSettings(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SET_OUTPUT_WIDTH:
            return {
                ...state,
                stockWidth: action.payload.value,
                stockHeight: action.payload.height / action.payload.width * action.payload.value,
            };

        case ACTIONS.SET_OUTPUT_HEIGHT:
            return {
                ...state,
                stockWidth: action.payload.width / action.payload.height * action.payload.value,
                stockHeight: action.payload.value,
            };

        case ACTIONS.SET_OUTPUT_TOOL_DIAMETER:
            return {
                ...state,
                toolDiameter: action.payload,
            };

        default:
            return state;
    }
}

export default OutputSettings;