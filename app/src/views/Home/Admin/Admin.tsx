import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid"
import Loading from "components/common/Loading/Loading";
import Main from "components/layout/Main/Main";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Dialog, LinearProgress, TextField} from "@mui/material";
import {
  AdminContainer,
  AdminStartClassContainer,
  AdminUpdateTaskContainer,
  AdminUserIssue,
  AdminUserIssueList,
  AdminUserIssueText,
  FontAwesomeContainer
} from "views/Home/Admin/Admin.styles";
import {IconContainer} from "./Admin.styles";
import * as ClassServiceApi from "apis/ClassServiceApi";
import openSocket from "socket.io-client";
import {useEffect, useState} from "react";
import {IssueText} from "views/Home/ActiveClass/ActiveClass.styles";
import * as UserServiceApi from "apis/UserServiceApi";

function renderStatus(params: any) {
  switch (params.row.status) {
    case "done":
      return (
        <IconContainer type="done">
          <FontAwesomeIcon icon={['fas', 'check']}/>
        </IconContainer>
      )
    case "initial":
      return (
        <IconContainer type="initial">
          <FontAwesomeIcon icon={['fas', 'question']}/>
        </IconContainer>
      )
    case "issue":
      return (
        <IconContainer type="issue">
          <FontAwesomeIcon icon={['fas', 'exclamation']}/>
        </IconContainer>
      )

    default:
      return (
        <IconContainer type="initial">
          <FontAwesomeIcon icon={['fas', 'question']}/>
        </IconContainer>
      )
  }
}

function renderIssues(params: any) {
  return (
    <AdminUserIssueList>
      {
        params.row.issues.map((issue: string) => {
          return (
            <AdminUserIssue>
              <AdminUserIssueText> {issue} </AdminUserIssueText>
            </AdminUserIssue>
          )
        })
      }
    </AdminUserIssueList>
  )
}

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID'},
  {field: 'fullName', headerName: 'Full Name'},
  {field: 'status', headerName: 'Status', renderCell: renderStatus, align: 'center', headerAlign: 'center'},
  {field: 'issues', headerName: 'Issues', width: 400, renderCell: renderIssues},
];

function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpdateTaskDialog, setShowUpdateTaskDialog] = useState(false);

  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_API_URL as string);

    socket.on("class event", data => {
      if (data.action === "join") {
        const user = data.user;
        user.id = user._id;
        setUsers((prevUsers) => [user, ...prevUsers]);
      }
    });

    socket.on("class event", async (data) => {
      switch (data.action) {
        case "updateTask":
          getUsers();
          break;
      }
    });

    socket.on("user event", async (data) => {
      switch (data.action) {
        case "updateIssues":
          getUsers();
          break;
        case "updateStatus":
          getUsers();
          break;
      }
    });
  };

  const getUsers = async () => {
    const users = await ClassServiceApi.getUsersByClassId({classId: "6359407d47773e1371ff8cec"});
    const newUsers = users.map((user: any) => ({...user, id: user._id}));
    setUsers(newUsers);

    if (loading) setLoading(false);
  }

  useEffect(() => {
    getUsers();
    createSocketConnection();
  }, []);

  if (loading) {
    return (
      <Main>
        <Loading/>
      </Main>
    )
  }

  const updateClassStatus = async (status: string) => {
    await ClassServiceApi.updateStatus({status, classId: '6359407d47773e1371ff8cec'});
  }

  return (
    <AdminContainer>
      <div style={{display: 'flex', flexGrow: 1}}>
        <DataGrid
          sx={{backgroundColor: "white"}}
          rows={users}
          columns={columns}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: LinearProgress
          }}
          getRowHeight={() => 'auto'}
        />
      </div>

      <Dialog open={showUpdateTaskDialog} onClose={() => setShowUpdateTaskDialog(false)} fullWidth={true}
              maxWidth={'lg'}>
        <AdminUpdateTaskContainer>
          <FontAwesomeContainer icon={['fas', 'xmark']} onClick={() => setShowUpdateTaskDialog(false)}/>
          <IssueText> Please describe your task. </IssueText>
          <TextField
            label="What is your task?"
            multiline
            rows={8}
            placeholder="Please type your task..." style={{width: '100%', marginTop: 20}}
            onChange={(e) => {
              setTask(e.currentTarget.value);
            }}
          />

          <Button variant={'contained'} sx={{marginTop: '15px'}} onClick={async () => {
            await ClassServiceApi.updateTask({
              classId: "6359407d47773e1371ff8cec",
              task
            })
            setShowUpdateTaskDialog(false);
          }}>
            Submit Task
          </Button>
        </AdminUpdateTaskContainer>
      </Dialog>


      <AdminStartClassContainer>
        <Button variant={'contained'} onClick={() => updateClassStatus('started')}>
          Start Class
        </Button>

        <Button variant={'contained'} onClick={() => updateClassStatus('initial')}>
          Reset Class
        </Button>

        <Button variant={'contained'} onClick={() => setShowUpdateTaskDialog(true)}>
          New Task
        </Button>
      </AdminStartClassContainer>
    </AdminContainer>
  )
}

export default Admin;
