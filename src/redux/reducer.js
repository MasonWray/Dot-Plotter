import { combineReducers } from 'redux';

import Layers from './reducers/Layers';
import FileSelector from './reducers/FileSelector';
import OutputSettings from './reducers/OutputSettings';

const reducer = combineReducers({ Layers, FileSelector, OutputSettings })

export default reducer;