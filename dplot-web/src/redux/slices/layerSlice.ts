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
    name: string,
    color: RgbColor,
    channel: ColorChannel
    raster_visible: boolean,
    raster: undefined,
    vector_visible: boolean,
    vector: undefined,
    vector_ref: undefined,
}

interface LayerState {
    data: LayerData[]
}

const initialState: LayerState = {
    data: [
        {
            name: 'Cyan',
            color: { r: 0, g: 255, b: 255 },
            channel: ColorChannel.C,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Magenta',
            color: { r: 255, g: 0, b: 255 },
            channel: ColorChannel.M,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Yellow',
            color: { r: 255, g: 255, b: 0 },
            channel: ColorChannel.Y,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Black',
            color: { r: 0, g: 0, b: 0 },
            channel: ColorChannel.K,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        }
    ]
}

export const layerSlice = createSlice({
    name: 'layers',
    initialState,
    reducers: {
        toggleRasterVisibility: (state, action: PayloadAction<number>) => {
            console.log(action)
        },
        setLayerRaster: (state, action: PayloadAction<number>) => {
            console.log(action)
        },
        toggleVectorVisibility: (state, action: PayloadAction<number>) => {
            console.log(action)
        },
        setLayerVector: (state, action: PayloadAction<number>) => {
            console.log(action)
        },
        setVectorRef: (state, action: PayloadAction<number>) => {
            console.log(action)
        },
    }
});

export const {
    toggleRasterVisibility,
    setLayerRaster,
    toggleVectorVisibility,
    setLayerVector,
    setVectorRef
} = layerSlice.actions;

export default layerSlice.reducer;