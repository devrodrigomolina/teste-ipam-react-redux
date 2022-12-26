import { configureStore } from '@reduxjs/toolkit/dist/configureStore'
import estadosReducer from '../features/localidades/estados'
import municipiosReducer from '../features/localidades/municipios'

export const store = configureStore({
  reducer: {
    estados: estadosReducer,
    municipios: municipiosReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
