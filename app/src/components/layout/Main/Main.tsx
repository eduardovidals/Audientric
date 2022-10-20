import {useAppDispatch} from "store/hooks";
import React, {useEffect} from "react";
import {MainContainer, MainChildContainer} from "components/layout/Main/Main.styles";

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | React.ReactNode[]
}

function Main(props: MainProps) {
  const {children, ...rest} = props;

  return (
    <MainContainer>
      <MainChildContainer {...rest}>
        {children}
      </MainChildContainer>
    </MainContainer>
  )
}

export default Main;
