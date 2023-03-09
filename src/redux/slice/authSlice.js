import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: '',
    userId: '',
    name: ''
}

const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action) => {
            
            state.user = action.payload.email;
            state.userId = action.payload.uid;
            state.name = action.payload.name;
        }
    }
})

export default authSlice.reducer;
export const {setUser} = authSlice.actions