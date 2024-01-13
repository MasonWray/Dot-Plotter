import { RgbToCmyk } from '@/lib/RbgToCmyk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RgbColor {
    r: number,
    g: number,
    b: number
}

interface DisplayLayer {
    name: string,
    color: RgbColor,
    mapper: (r: number, g: number, b: number) => number,
    raster_visible: boolean,
    raster: undefined,
    vector_visible: boolean,
    vector: undefined,
    vector_ref: undefined,
}

interface LayerState {
    data: DisplayLayer[]
}

const initialState: LayerState = {
    data: [
        {
            name: 'Cyan',
            color: { r: 0, g: 255, b: 255 },
            mapper: (r, g, b) => RgbToCmyk(r, g, b).C,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Magenta',
            color: { r: 255, g: 0, b: 255 },
            mapper: (r, g, b) => RgbToCmyk(r, g, b).M,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Yellow',
            color: { r: 255, g: 255, b: 0 },
            mapper: (r, g, b) => RgbToCmyk(r, g, b).Y,
            raster_visible: true,
            raster: undefined,
            vector_visible: false,
            vector: undefined,
            vector_ref: undefined,
        },
        {
            name: 'Black',
            color: { r: 0, g: 0, b: 0 },
            mapper: (r, g, b) => RgbToCmyk(r, g, b).K,
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