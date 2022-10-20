import {createGlobalStyle, DefaultTheme} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.colors.text};
  }
`

const theme: DefaultTheme = {
  colors: {
    text: "#FFF",
  }
}

export default theme;
