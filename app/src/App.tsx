import React from 'react';
import './App.css';
import {AppContainer} from "App.styles";
import {ThemeProvider} from "styled-components";
import theme, {GlobalStyle} from "utils/theme";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "store/store";
import {library} from "@fortawesome/fontawesome-svg-core";
import Home from "views/Home/Home";
import {faCheck, faExclamation, faQuestion, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faExclamation, faQuestion, faXmark);

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
