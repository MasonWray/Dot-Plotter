import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum DialogType {
    IMPORT_IMAGE,
    MACHINE_SETTINGS,
    DERIVE_CMYK_SPLIT,
}

interface MenuState {
    currentLayer: string
    isImportImageDialogOpen: boolean
    isMachineSettingsDialogOpen: boolean
    isDeriveCmykSplitSettingsOpen: boolean
}

const initialState: MenuState = {
    currentLayer: '',
    isImportImageDialogOpen: false,
    isMachineSettingsDialogOpen: false,
    isDeriveCmykSplitSettingsOpen: false
}

export const dataSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        closeAllDialogs: (state) => {
            state.isImportImageDialogOpen = false;
            state.isMachineSettingsDialogOpen = false;
            state.isDeriveCmykSplitSettingsOpen = false;
        },
        openImportImageDialog: (state) => {
            state.isImportImageDialogOpen = true
        },
        openMachineSettingsDialog: (state) => {
            state.isMachineSettingsDialogOpen = true
        },
        openDeriveCmykSplitSettings: (state, action: PayloadAction<string>) => {
            state.isDeriveCmykSplitSettingsOpen = true;
            state.currentLayer = action.payload;
        }
    }
});

export const {
    closeAllDialogs,
    openImportImageDialog,
    openMachineSettingsDialog,
    openDeriveCmykSplitSettings
} = dataSlice.actions;

export default dataSlice.reducer;