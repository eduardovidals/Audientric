import styled from "styled-components"

interface Icon {
  type: string
}

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
