
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'


const store = configureStore({
    reducer: {
        profile: authReducer
    }
})

export default store