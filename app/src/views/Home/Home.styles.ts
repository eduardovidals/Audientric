import styled from "styled-components";

export interface ColorProps {
  backgroundColor: string,
  clickedField?: boolean
}

export const HomeWelcomeContainer = styled.div<ColorProps>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: ${props => props.backgroundColor};
  transition: background-color 2s ease;
  justify-content: center;
  align-items: center;
`

