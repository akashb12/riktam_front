import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { createGroup, getUsers, updateGroup } from '../Redux/slice/ChatSlice';
import { MyContext } from '../MyContext';
const UpdateGroup = ({ openDialog, closeDialog,success }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedChat, setSelectedChat] = useContext(MyContext);
    const [fetchAgain, setFetchAgain] = useContext(MyContext);
    const [selectedUsers, setSelectedUsers] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    useEffect(() => {
        setLoading(true);
        dispatch(getUsers()).then((res) => {
            const filteredUsers = selectedChat.users.filter((item)=>item._id != selectedChat.groupAdmin._id);
            setSelectedUsers(filteredUsers)
            setSearchResult(res.payload.data)
            setLoading(false)
        })
    }, []);

    const handleClose = () => {
        setOpen(false);
        closeDialog();
    };


    const handleAutocompleteChange = (event, newValue) => {
        setSelectedUsers(newValue);
    };
    return (
        <div>
            {!loading &&
                <Dialog
                    open={open}
                    className='chat-group-dialog'
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            let data = {
                                _id:selectedChat._id,
                                users:JSON.stringify(selectedUsers)
                            }
                            dispatch(updateGroup(data)).then((res) => {
                                console.log(res.payload);
                                if (res.payload.status != 200) {
                                    setError(res.payload.data)
                                } else {
                                    setFetchAgain(true);
                                    handleClose();
                                }
                            })
                        },
                    }}
                >
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogContent className='chat-group-dialogcontent'>
                        <TextField
                            className='chat-group-text'
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedChat.chatName}
                            disabled
                        />
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={searchResult}
                            getOptionLabel={(option) => option.name}
                            onChange={handleAutocompleteChange}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            value={selectedUsers}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Search Users"
                                    placeholder="Users"
                                />
                            )}
                        />
                        {error && <span className='error'>*{error}</span>}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Update</Button>
                    </DialogActions>
                </Dialog>}
        </div>
    )
}

export default UpdateGroup
