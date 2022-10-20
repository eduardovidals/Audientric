import React from 'react';
import './App.css';
import {AppContainer} from "App.styles";
import {ThemeProvider} from "styled-components";
import theme, {GlobalStyle} from "utils/theme";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "store/store";
import Home from "views/Home/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle/>
          <AppContainer>
            <Routes>
              {/*<Route path='*' element={<NotFound/>}/>*/}
              <Route path={'/'} element={<Home/>}/>
            </Routes>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
