import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DataState {
    sourceImage: SourceImageData | undefined
}

export interface SourceImageData {
    imageData: string
    imageWidth: number
    imageHeight: number
}

const initialState: DataState = {
    sourceImage: undefined
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSourceImage: (state, action: PayloadAction<{ data: string, w: number, h: number }>) => {
            state.sourceImage = {
                imageData: action.payload.data,
                imageWidth: action.payload.w,
                imageHeight: action.payload.h
            };
        },
    }
});

export const {
    setSourceImage,
} = dataSlice.actions;

export default dataSlice.reducer;