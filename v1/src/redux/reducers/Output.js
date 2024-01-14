import ACTIONS from '../actions';

const initialState = {
    package: undefined
};

function Output(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.SET_DOWNLOAD_PACKAGE:
            return {
                ...state,
                package: action.payload,
            }

        default:
            return state;
    }
}

export default Output;