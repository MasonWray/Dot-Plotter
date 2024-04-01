import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isImportImageDialogOpen: boolean
}

const initialState: MenuState = {
    isImportImageDialogOpen: false
}

export const dataSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openImportImageDialog: (state) => {
            state.isImportImageDialogOpen = true
        }
    }
});

export const {
    openImportImageDialog,
} = dataSlice.actions;

export default dataSlice.reducer;