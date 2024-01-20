import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RgbColor {
    r: number,
    g: number,
    b: number
}

export enum ColorChannel {
    C, M, Y, K,
}

export interface LayerData {
    id: string,
    name: string,
    color: RgbColor,
    channel: ColorChannel
    raster_visible: boolean,
    raster: string | undefined,
    vector_visible: boolean,
    vector: string | undefined,
}

interface LayerState {
    data: LayerData[]
}

const initialState: LayerState = {
    data: [
        {
            id: '48f20491-dddf-4312-abd3-679e2d330223',
            name: 'Cyan',
            color: { r: 0, g: 255, b: 255 },
            channel: ColorChannel.C,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
        },
        {
            id: '84d29f71-22cc-43e4-9408-b9780dbc39fe',
            name: 'Magenta',
            color: { r: 255, g: 0, b: 255 },
            channel: ColorChannel.M,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
        },
        {
            id: 'e422824a-c9a5-4154-bcb8-75464ae417d0',
            name: 'Yellow',
            color: { r: 255, g: 255, b: 0 },
            channel: ColorChannel.Y,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
        },
        {
            id: '6b35b7b8-7047-4ba3-bbf8-ea0c73ef5c21',
            name: 'Black',
            color: { r: 0, g: 0, b: 0 },
            channel: ColorChannel.K,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
        }
    ]
}

export const layerSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        toggleRasterVisibility: (state, action: PayloadAction<number>) => {
            state.data[action.payload].raster_visible = !state.data[action.payload].raster_visible;
        },
        setLayerRaster: (state, action: PayloadAction<{ id: number, data: string }>) => {
            state.data[action.payload.id].raster = action.payload.data;
        },
        toggleVectorVisibility: (state, action: PayloadAction<number>) => {
            state.data[action.payload].vector_visible = !state.data[action.payload].vector_visible;
        },
        setLayerVector: (state, action: PayloadAction<{ id: number, data: string }>) => {
            state.data[action.payload.id].vector = action.payload.data;
        },
    }
});

export const {
    toggleRasterVisibility,
    setLayerRaster,
    toggleVectorVisibility,
    setLayerVector,
} = layerSlice.actions;

export default layerSlice.reducer;