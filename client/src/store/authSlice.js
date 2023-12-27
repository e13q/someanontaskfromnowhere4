import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: false
    },
    reducers:{
        setAuth(state, action){
            state.value = action.payload; 
        }
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(userApi.endpoints.registration.matchFulfilled, (state, action) => {
    //         state.value = action.payload; 
    //     })
    // }
})

export default authSlice;
export const { setAuth, logout } = authSlice.actions;