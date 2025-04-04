import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER} from 'redux-persist'
import userReducer from './slice/userSlice'
import {api} from './api'



// Persist configuration for user
const userPersistConfig = {key: 'user', storage, whiteList:['user', 'isEmailVerified', 'isLoggedIn']}

// Wrap reducers with 'persist config

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
    reducer:{
        [api.reducerPath] : api.reducer,   // rtk query api
        user: persistedUserReducer, // persist user reducer
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware ({
            serializableCheck:{
                ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }).concat(api.middleware)
})

// setup the listerner for RTK Query
setupListeners(store.dispatch);


// Create a persistor
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch