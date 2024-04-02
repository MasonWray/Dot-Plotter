import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isImportImageDialogOpen: boolean
    isMachineSettingsDialogOpen: boolean
}

const initialState: MenuState = {
    isImportImageDialogOpen: false,
    isMachineSettingsDialogOpen: false,
}

export const dataSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        closeAllDialogs: (state) => {
            state.isImportImageDialogOpen = false;
            state.isMachineSettingsDialogOpen = false;
        },
        openImportImageDialog: (state) => {
            state.isImportImageDialogOpen = true
        },
        openMachineSettingsDialog: (state) => {
            state.isMachineSettingsDialogOpen = true
        }
    }
});

export const {
    closeAllDialogs,
    openImportImageDialog,
    openMachineSettingsDialog
} = dataSlice.actions;

export default dataSlice.reducer;