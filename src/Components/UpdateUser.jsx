import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../Redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';

const UpdateUser = ({ openDialog, closeDialog, success, updateUser }) => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(updateUser.email);
  const [name, setName] = useState(updateUser.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setError(false)
    setOpen(openDialog)
  }, [updateUser])

  useEffect(() => {
    setOpen(openDialog)
  }, [openDialog])

  useEffect(() => {
    setName(updateUser.name)
    setEmail(updateUser.email);
  }, [updateUser])

  const handleClose = () => {
    setOpen(false);
    closeDialog()
  };
  
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson._id = updateUser._id
            dispatch(updateUserData(formJson)).then((res) => {
              if (res.payload.status != 200) {
                setError(res.payload.data)
              } else {
                // success();
                handleClose();
              }
            })
           
          },
        }}
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e)=> setName(e.target.value)} 
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
          />
          {error && <span className='error'>*{error}</span>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateUser
