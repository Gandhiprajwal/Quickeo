import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userInfo:null,
    theme:null
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.userInfo = action.payload;
    },
    setTheme:(state,action)=>{
      state.theme = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setTheme } = authSlice.actions

export const authReducer = authSlice.reducer