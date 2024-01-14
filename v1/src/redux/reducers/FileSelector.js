import ACTIONS from '../actions';

const initialState = { sourceImage: undefined };

const FileSelector = function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SET_SOURCE_IMAGE:
            return {
                ...state,
                sourceImage: action.payload,
            };

        default:
            return state;
    }
}

export default FileSelector;