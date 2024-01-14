import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DataState {
    imageData: string | undefined
    imageWidth: number | undefined
    imageHeight: number | undefined
}

const initialState: DataState = {
    imageData: undefined,
    imageWidth: undefined,
    imageHeight: undefined
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSourceImage: (state, action: PayloadAction<{data: string, w?: number, h?: number}>) => {
            state.imageData = action.payload.data;
            state.imageWidth = action.payload.w;
            state.imageHeight = action.payload.h;
        },
    }
});

export const {
    setSourceImage,
} = dataSlice.actions;

export default dataSlice.reducer;