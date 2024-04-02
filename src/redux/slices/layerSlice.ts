import ApplicationDataException from '@/defs/ApplicationDataException';
import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface LayerModel {
    id: string,
    name: string,
    width: number,
    height: number,
    isVisible: boolean,
    parent: string | undefined,
    children: string[]
}

export interface ImageLayerModel extends LayerModel {
    data: string
}

interface LayerState {
    root: LayerModel | undefined
    models: LayerModel[]
}

const initialState: LayerState = {
    root: undefined,
    models: []
}

export const layerSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        addRootFromImage: (state, action: PayloadAction<{ name: string, data: string, width: number, height: number }>) => {
            const root: ImageLayerModel = {
                id: uniqueId('layer'),
                name: action.payload.name,
                width: action.payload.width,
                height: action.payload.height,
                isVisible: true,
                parent: undefined,
                children: [],
                data: action.payload.data
            }
            state.models.push(root);
            state.root = root;
        },
        addRootLayer: (state, action: PayloadAction<LayerModel>) => {
            state.models.push(action.payload);
            state.root = action.payload;
        },
        addChildLayer: (state, action: PayloadAction<{ model: LayerModel, parent: string }>) => {
            let parentModel = state.models.find(m => m.id === action.payload.parent);
            if (!parentModel) throw new ApplicationDataException(`Parent ${action.payload.parent} not found`);
            state.models.push(action.payload.model);
            parentModel.children.push(action.payload.model.id);
        }
    }
});

export const {
    addRootFromImage,
    addRootLayer,
} = layerSlice.actions;

export function getLayerById(state: RootState, id: string) {
    return state.layers.models.find(m => m.id === id);
}

export default layerSlice.reducer;