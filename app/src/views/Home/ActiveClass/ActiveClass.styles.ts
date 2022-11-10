import styled from "styled-components";
import * as muiStyles from "@mui/material/styles";
import {Button} from "@mui/material";
import {ColorProps} from "views/Home/Home.styles";
import AudentricButton from "components/lib/Button/AudentricButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const TaskText = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin: 0 10px;
`

export const ActiveClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const OptionsButton = muiStyles.styled(AudentricButton, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor'
})<ColorProps>(({backgroundColor}) => ({
  color: 'white',
  backgroundColor,
  '&:hover': {
    backgroundColor,
    opacity: 0.8
  },
  marginTop: 10,
  paddingTop: 8,
  paddingBottom: 8,
  height: 200,
  width: 200,
  fontSize: '5rem',
  borderRadius: 10
}))

export const FontAwesomeContainer = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  left: 10px;
  align-self: flex-start;
  font-size: 1.8rem;
  text-align: left;
  
  &:hover {
    cursor: pointer;
  }
`

export const IssueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  width: calc(100% - 40px);
`

export const IssueText = styled.h1`
  font-size: 1.5rem;
`
