import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = ''

const homesScreenSlice = createSlice({
  name: 'HomeScreen',
  initialState,
  reducers: {
    updateHomeScreen: (state, action: PayloadAction<string>) => {
      if (action.payload !== "ActiveClassScreen" && localStorage.getItem('audientricName') && localStorage.getItem('audientricUserId') !== "635a315a786b352a6b365825") {
        return "WelcomeScreen";
      }

      return action.payload;
    }
  }
})

export const {updateHomeScreen} = homesScreenSlice.actions;

export default homesScreenSlice.reducer;
