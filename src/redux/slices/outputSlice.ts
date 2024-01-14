import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OutputState {
    needsUpdate: boolean,
    stockWidth: number,
    stockHeight: number,
    toolDiameter: number,
    feedrateTravel: number,
    feedratePlunge: number,
    heightTravel: number,
    heightPlunge: number,
}

const initialState: OutputState = {
    needsUpdate: true,
    stockWidth: 0,
    stockHeight: 0,
    toolDiameter: 0.4,
    feedrateTravel: 2000,
    feedratePlunge: 1200,
    heightTravel: 3,
    heightPlunge: 0.2,
}

export const outputSlice = createSlice({
    name: 'output',
    initialState,
    reducers: {
        setOutputSize: (state, action: PayloadAction<{ w: number, h: number }>) => {
            state.stockWidth = action.payload.w;
            state.stockHeight = action.payload.h;
        },
        setSourceSize: (state, action: PayloadAction<{ w: number, h: number }>) => {
            state.stockWidth = action.payload.w;
            state.stockHeight = action.payload.h;
        },
        setToolDiameter: (state, action: PayloadAction<number>) => {
            state.toolDiameter = action.payload;
        },
        setFeedrateTravel: (state, action: PayloadAction<number>) => {
            state.feedrateTravel = action.payload;
        },
        setFeedratePlunge: (state, action: PayloadAction<number>) => {
            state.feedratePlunge = action.payload;
        },
        setHeightTravel: (state, action: PayloadAction<number>) => {
            state.heightTravel = action.payload;
        },
        setHeightPlunge: (state, action: PayloadAction<number>) => {
            state.heightPlunge = action.payload;
        },
    }
});

export const {
    setOutputSize,
    setSourceSize,
    setToolDiameter,
    setFeedrateTravel,
    setFeedratePlunge,
    setHeightTravel,
    setHeightPlunge,
} = outputSlice.actions;

export default outputSlice.reducer;