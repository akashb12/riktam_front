import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { createGroup, getUsers } from '../Redux/slice/ChatSlice';
const CreateGroup = ({ openDialog, closeDialog,success }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    useEffect(() => {
        setLoading(true);
        dispatch(getUsers()).then((res) => {
            setSearchResult(res.payload.data)
            setLoading(false)
        })
    }, []);

    const handleClose = () => {
        setOpen(false);
        success();
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
                                name:formJson.name,
                                users:JSON.stringify(selectedUsers)
                            }
                            dispatch(createGroup(data)).then((res) => {
                                console.log(res);
                                if (res.payload.status != 201) {
                                    setError(res.payload.data)
                                } else {
                                    // success();
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
                        />
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={searchResult}
                            getOptionLabel={(option) => option.name}
                            onChange={handleAutocompleteChange}
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
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>}
        </div>
    )
}

export default CreateGroup
