import styled from "styled-components";
import * as muiStyles from "@mui/material/styles";
import {ColorProps} from "views/Home/Home.styles";
import AudentricInput from "components/lib/TextField/AudentricInput";
import AudentricButton from "components/lib/Button/AudentricButton";

export const EnterNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 0 20px;
  padding: 30px 20px 35px 20px;
  width: 100%;
  border-radius: 8px;
  justify-content: center;

  @media (min-width: 400px) {
    max-width: 400px;
  }
`

export const EnterNameForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const EnterNameText = styled.b<ColorProps>`
  text-align: center;
  width: 100%;
  margin-top: 10px;
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: ${props => props.backgroundColor};
  transition: color 2s ease;
`

export const EnterNameTextField = muiStyles.styled(AudentricInput, {
  shouldForwardProp:
    (prop) => prop !== 'backgroundColor' && prop !== 'clickedField'
})<ColorProps>(({
                  backgroundColor: color,
                  clickedField
                }) => ({
  '& label.Mui-focused': {
    color,
    transition: `color ${clickedField ? '2s' : '200ms'} ease, transform 200ms cubic-bezier(0.0, 0, 0.2, 1), max-width 200ms cubic-bezier(0.0, 0, 0.2, 1)`
  },

  '& .MuiOutlinedInput-root': {

    '&.Mui-focused fieldset': {
      borderColor: color,
      transition: `border-color ${clickedField ? '2s' : '10ms'} ease`
    },
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 2
  }
}))

export const EnterNameSubmit = muiStyles.styled(AudentricButton, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor'
})<ColorProps>(({backgroundColor}) => ({
  color: 'white',
  backgroundColor,
  '&:hover': {
    backgroundColor,
    opacity: 0.8
  },
  transition: 'background-color 2s ease',
  marginTop: 10,
  paddingTop: 8,
  paddingBottom: 8
}))
