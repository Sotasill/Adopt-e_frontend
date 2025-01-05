import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { authReducer } from './auth/authReducer'
import registrationReducer from './registration/registrationSlice'
import { searchReducer } from './serach/searchReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // массив редьюсеров, которые нужно сохранять
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        registration: registrationReducer,
        search: searchReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
    }),
    devTools: import.meta.env.MODE !== 'production'
})

export const persistor = persistStore(store)
export default store
