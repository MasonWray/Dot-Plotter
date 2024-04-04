import ApplicationDataException from '@/defs/ApplicationDataException';
import { createImageLayerModel } from '@/lib/layers/ImageLayerModel';
import { LayerModel } from '@/lib/layers/LayerModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createGroupLayerModel } from '@/lib/layers/GroupLayerModel';
import { cloneDeep } from 'lodash';

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
        addLayerGroup: (state, action: PayloadAction<{ parent: string, name: string, layers: LayerModel[] }>) => {
            let models = cloneDeep(state.models);
            let root = cloneDeep(state.root);

            const parentModelIndex = models.findIndex(m => m.id === action.payload.parent);
            if (parentModelIndex < 0) throw new ApplicationDataException(`Parent ${action.payload.parent} not found`);
            const group = createGroupLayerModel(action.payload.name, action.payload.parent, action.payload.layers.map(l => l.id));
            models[parentModelIndex].children.push(group.id);
            models.push(group);
            action.payload.layers.forEach(l => {
                l.parent = group.id;
                models.push(l);
            });
            state.models = models;
            state.root = models.find(m => m.id === root?.id);
        },
        toggleLayerVisibility: (state, action: PayloadAction<string>) => {
            let model = state.models.find(m => m.id === action.payload);
            if (!model) throw new ApplicationDataException(`Model ${action.payload} not found`);
            model.isVisible = !model.isVisible;
        },
        toggleLayerCollapse: (state, action: PayloadAction<string>) => {
            let model = state.models.find(m => m.id === action.payload);
            if (!model) throw new ApplicationDataException(`Model ${action.payload} not found`);
            model.isExpanded = !model.isExpanded;
        }
    }
});

export const {
    addRootFromImage,
    addRootLayer,
    toggleLayerVisibility,
    toggleLayerCollapse,
    addLayerGroup
} = layerSlice.actions;

export function getLayerById(state: RootState, id: string) {
    return state.layers.models.find(m => m.id === id);
}

export default layerSlice.reducer;