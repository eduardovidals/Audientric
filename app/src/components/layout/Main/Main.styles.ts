import styled from "styled-components";

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`

// child container is used to prevent horizontal overflow, cannot be applied to main container
// due to aos animations bugging out
export const MainChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 100%;
`
