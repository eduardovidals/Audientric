import {Button, ButtonProps} from "@mui/material";

interface AudentricButtonProps extends ButtonProps {
  children?: React.ReactNode | React.ReactNode[]
}

function AudentricButton(props: AudentricButtonProps){
  const {children, ...rest} = props;
  return (
    <Button {...rest}>
      {children}
    </Button>
  )
}

export default AudentricButton;
