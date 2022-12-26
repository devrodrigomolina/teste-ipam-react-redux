import { configureStore } from '@reduxjs/toolkit'
import estadosReducer from '../features/localidades/estados'
import municipiosReducer from '../features/localidades/municipios'
import municipioInfoReducer from '../features/localidades/municipiosInfo'

export const store = configureStore({
  reducer: {
    estados: estadosReducer,
    municipios: municipiosReducer,
    municipioInfos: municipioInfoReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
