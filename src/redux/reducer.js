import { combineReducers } from 'redux';

import Layers from './reducers/Layers';
import FileSelector from './reducers/FileSelector';
import OutputSettings from './reducers/OutputSettings';
import Output from './reducers/Output';

const reducer = combineReducers({ Layers, FileSelector, OutputSettings, Output })

export default reducer;