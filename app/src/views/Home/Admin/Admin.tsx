import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid"
import Box from "@mui/material/Box"
import Loading from "components/common/Loading/Loading";
import Main from "components/layout/Main/Main";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, LinearProgress} from "@mui/material";
import {
  AdminStartClassContainer,
  AdminUserIssue,
  AdminUserIssueList,
  AdminUserIssueText
} from "views/Home/Admin/Admin.styles";
import {IconContainer} from "./Admin.styles";
import * as ClassServiceApi from "apis/ClassServiceApi";
import openSocket from "socket.io-client";
import {useEffect, useState} from "react";

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
  const [loading, setLoading] = useState(true);

  const createSocketConnection = () => {
    const socket = openSocket(process.env.REACT_APP_API_URL as string);

    socket.on("class event", data => {
      if (data.action === "join") {
        const user = data.user;
        user.id = user._id;
        setUsers((prevUsers) => [user, ...prevUsers]);
      }

      if (data.action === "initial"){
        getUsers();
      }
    });

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
    <Box sx={{height: 400, width: '100%', padding: "2rem"}}>
      <DataGrid
        sx={{backgroundColor: "white"}}
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}
        getRowHeight={() => 'auto'}
      />

      <AdminStartClassContainer>
        <Button variant={'contained'} onClick={() => updateClassStatus('started')}>
          Start Class
        </Button>

        <Button variant={'contained'} onClick={() => updateClassStatus('initial')}>
          Reset Class
        </Button>
      </AdminStartClassContainer>
    </Box>
  )
}

export default Admin;
