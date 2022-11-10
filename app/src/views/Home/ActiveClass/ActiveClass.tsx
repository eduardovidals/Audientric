import {
  ActiveClassContainer,
  FontAwesomeContainer,
  IssueContainer,
  IssueText,
  OptionsButton, TaskText,
} from "views/Home/ActiveClass/ActiveClass.styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as UserServiceApi from 'apis/UserServiceApi';
import {Button, Dialog, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import * as ClassServiceApi from "apis/ClassServiceApi";
import openSocket from "socket.io-client";
// @ts-ignore
import Odometer from 'react-odometerjs';
import 'assets/styles/odometer.css';

function ActiveClass() {
  const [users, setUsers] = useState<any[]>([]);
  const [task, setTask] = useState("");
  const [showIssueDialog, setShowIssueDialog] = useState(false);
  const [onIssueSubmit, setOnIssuesSubmit] = useState(true);
  const [issue, setIssue] = useState('');
  const userId = localStorage.getItem('audientricUserId') || '';

  const onStatusChange = async (status: string) => {
    await UserServiceApi.updateStatus({userId, status})
  }

  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_API_URL as string);

    socket.on('class event', async (data) => {
      if (data.action === "updateStatus"){
        setTask(data.task);
      }
    })

    socket.on("user event", async (data) => {
      switch (data.action) {
        case "updateIssue":
          getUsers();
          break;
        case "updateStatus":
          getUsers();
          break;
        default:
          getUsers();
      }
    });
  };

  const getClass = async () => {
    const classObj = await ClassServiceApi.getClassById({classId: "6359407d47773e1371ff8cec"});
    setTask(classObj.task);
  }

  const getUsers = async () => {
    const users = await ClassServiceApi.getUsersByClassId({classId: "6359407d47773e1371ff8cec"});
    const newUsers = users.map((user: any) => ({...user, id: user._id}));
    setUsers(newUsers);
  }

  useEffect(() => {
    getClass();
    getUsers();
    createSocketConnection();
  }, [])

  return (
    <ActiveClassContainer>
      <TaskText> {task} </TaskText>
      <p> Total users: <Odometer value={users.length}/> </p>
      <p> <Odometer value={users.filter(user => user.status === 'done').length}/> users done. </p>
      <p> <Odometer value={users.filter(user => user.status === 'issue').length}/>  users having issues. </p>
      <p> <Odometer value={users.filter(user => user.status === 'initial').length}/>  users doing the task. </p>
      <Dialog open={showIssueDialog} onClose={() => setShowIssueDialog(false)} fullWidth={true} maxWidth={'lg'}>
        <IssueContainer>
          <FontAwesomeContainer icon={['fas', 'xmark']} onClick={() => setShowIssueDialog(false)}/>
          <IssueText> Please describe your issue. </IssueText>
          <TextField
            label="What is your issue?"
            multiline
            rows={8}
            placeholder="Please type your issue..." style={{width: '100%', marginTop: 20}}
            onChange={(e) => {
              setIssue(e.currentTarget.value);
            }}
          />

          <Button variant={'contained'} sx={{marginTop: '15px'}} disabled={!showIssueDialog} onClick={async () => {
            await UserServiceApi.updateIssues({
              userId: localStorage.getItem('audientricUserId') || '',
              issue
            })
            setShowIssueDialog(false);
          }}>
            Submit Issue
          </Button>
        </IssueContainer>
      </Dialog>

      <OptionsButton backgroundColor={'#4ca450'} onClick={() => {
        onStatusChange('done');
      }}>
        <FontAwesomeIcon icon={['fas', 'check']}/>
      </OptionsButton>

      <OptionsButton backgroundColor={'#ef5350'} onClick={() => {
        setShowIssueDialog(true);
        onStatusChange('issue');
      }}>
        <FontAwesomeIcon icon={['fas', 'exclamation']}/>
      </OptionsButton>


    </ActiveClassContainer>
  )
}

export default ActiveClass;
