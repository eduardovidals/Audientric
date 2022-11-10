import styled from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Icon {
  type: string
}

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: red;
`

export const IconContainer = styled.div<Icon>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: white;
  margin: 20px 0;
  background-color: ${props => props.type === "done" ? "#4ca450" : props.type === "initial" ? "#807f7f" : props.type === "issue" && "#ef5350"};
`

export const AdminStartClassContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  column-gap: 10px;
`

export const AdminUserIssueList = styled.ul`
  margin-left: 5px;
  padding: 10px 0;
`

export const AdminUserIssue = styled.li`

`

export const AdminUserIssueText = styled.p`

`

export const AdminUpdateTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  width: calc(100% - 40px);
`

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

export const UpdateText = styled.h1`
  font-size: 1.5rem;
`
