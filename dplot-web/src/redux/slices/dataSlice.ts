import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DataState {
    sourceImage: HTMLImageElement | undefined
}

const initialState: DataState = {
    sourceImage: undefined,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSourceImage: (state, action: PayloadAction<HTMLImageElement>) => {
            // state.sourceImage = action.payload;
        }
    }
});

export const {
    setSourceImage,
} = dataSlice.actions;

export default dataSlice.reducer;