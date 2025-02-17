import { combineReducers,configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'
import taskReducer from './features/taskSlice.js'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducer = combineReducers({auth : authReducer, tasks: taskReducer})


  const persistedAuthReducer = persistReducer(persistConfig, rootReducer);


  export const store = configureStore({
    reducer: persistedAuthReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      })
   
    
})
