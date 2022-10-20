import styled, {keyframes} from "styled-components";

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`

export const WelcomeText = styled.h1`
  text-align: center;
`

export const WaveAnimation = keyframes`
  0% {
    transform: rotate(0.0deg)
  }
  10% {
    transform: rotate(14.0deg)
  }
  20% {
    transform: rotate(-8.0deg)
  }
  30% {
    transform: rotate(14.0deg)
  }
  40% {
    transform: rotate(-4.0deg)
  }
  50% {
    transform: rotate(10.0deg)
  }
  60% {
    transform: rotate(0.0deg)
  }
  100% {
    transform: rotate(0.0deg)
  }
`

export const WaveEmoji = styled.span`
  animation: ${WaveAnimation} 4s ease-in infinite;
  transform-origin: 70% 70%;
  display: inline-block;
  margin-right: 9px;
`

export const PleaseWaitText = styled.p`
  text-align: center;
  margin-top: 3px;
`
