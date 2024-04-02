import ApplicationDataException from '@/defs/ApplicationDataException';
import { createImageLayerModel } from '@/lib/layers/ImageLayerModel';
import { LayerModel } from '@/lib/layers/LayerModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
            const { name, data, width, height } = action.payload;
            const root = createImageLayerModel(name, width, height, data);
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