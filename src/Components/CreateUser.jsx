import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ openDialog, closeDialog, success}) => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    setOpen(openDialog)
  }, [openDialog])

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
            dispatch(registerUser(formJson)).then((res) => {
              if (res.payload.status != 201) {
                setError(res.payload.data)
              } else {
                success();
                handleClose();
              }
            })
          },
        }}
      >
        <DialogTitle>Register User</DialogTitle>
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
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          {error && <span className='error'>*{error}</span>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateUser
