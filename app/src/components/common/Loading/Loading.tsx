import {LoadingContainer} from "components/common/Loading/Loading.styles";
import {CircularProgress} from "@mui/material";

function Loading(){
  return (
    <LoadingContainer>
      <CircularProgress/>
    </LoadingContainer>
  )
}

export default Loading;
