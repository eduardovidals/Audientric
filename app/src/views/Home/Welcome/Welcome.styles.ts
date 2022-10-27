import styled, {keyframes} from "styled-components";

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  height: 100%;
  width: 100%;
`

export const CurrentlyOnlineText = styled.h2`
  text-align: center;
`

export const WelcomeText = styled.h1`
  text-align: center;
`

export const HelloContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
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
