import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = ''

const homesScreenSlice = createSlice({
  name: 'HomeScreen',
  initialState,
  reducers: {
    updateHomeScreen: (state, action: PayloadAction<string>) => action.payload
  }
})

export const {updateHomeScreen} = homesScreenSlice.actions;

export default homesScreenSlice.reducer;
