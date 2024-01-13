import { configureStore } from '@reduxjs/toolkit';
import layerSlice from './slices/layerSlice';
import outputSlice from './slices/outputSlice';

export const store = configureStore({
    reducer: {
        layers: layerSlice,
        output: outputSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch