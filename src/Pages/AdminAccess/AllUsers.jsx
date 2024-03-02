import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from "react-redux";
import { getAllUsers } from '../../Redux/slice/AdminSlice';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { logout } from '../../Redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import CreateUser from '../../Components/CreateUser';
import Alert from '@mui/material/Alert';
import UpdateUser from '../../Components/UpdateUser';


const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  const [createUserDialog, setCreateUserDialogue] = useState(false);
  const [updateUserDialog, setUpdateUserDialogue] = useState(false);
  const [success,setSuccess] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    dispatch(getAllUsers()).then((res)=>{
      if(res.payload.status != 200) {
        if(res.payload.status == 401){
          navigate('/login')
        }
      } else {
        setAllUsers(res.payload.data)
      }
    })
  }

  const logoutUser = async() => {
    dispatch(logout()).then((res)=> {
      if(res.payload.status != 200) {
        console.log(res);
      } else {
        navigate('/login')

      }
    })
  }

  const openCreateUserDialog = (user) => {
    if(Object.keys(user).length) {
      setUpdateUser(user);
      setUpdateUserDialogue(true);
    } else {
      setCreateUserDialogue(true);
    }
  };

  const closeCreateUserDialog = () => {
    setCreateUserDialogue(false);
    getUsers();
  };

  const registered = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  return (
    <div className='admin-users'>
      {success && <Alert severity="success">User Registered</Alert>}
      <div className='admin-user-top'>
        <div>
          <h1 className='admin-user-title'>Admin Users</h1>
        </div>
        <div>
        <Button className='admin-user-button' variant="contained" onClick={()=>openCreateUserDialog({})}>Create User</Button>
        <Button variant="contained" onClick={logoutUser}>Logout</Button>
        </div>
      </div>
       <TableContainer className='admin-user-table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='admin-table-header'><h3>Name</h3></TableCell>
            <TableCell className='admin-table-header'><h3>Email</h3></TableCell>
            <TableCell className='admin-table-header'><h3>Action</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >
              <EditIcon className='admin-table-edit-icon' onClick={()=>openCreateUserDialog(row)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {createUserDialog && <CreateUser openDialog={createUserDialog} closeDialog ={closeCreateUserDialog} success = {registered} />}
    {updateUserDialog && <UpdateUser openDialog={updateUserDialog} closeDialog ={closeCreateUserDialog} success = {registered} updateUser={updateUser} />}
    </div>
  )
}

export default AllUsers
