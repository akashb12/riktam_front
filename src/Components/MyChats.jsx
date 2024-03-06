import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChats } from "../Redux/slice/ChatSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CreateGroup from "./CreateGroup";
import { useContext } from 'react';
import { MyContext } from '../MyContext';

const MyChats = () => {
  const dispatch = useDispatch()
  const [selectedChat, setSelectedChat] = useContext(MyContext);
  const [fetchAgain, setFetchAgain] = useContext(MyContext);
  const [createGroupDialogue, setCreateGroupDialogue] = useState(false)
  useEffect(() => {
    fetchUserChats()
  }, [fetchAgain])

  const fetchUserChats = () => {
    dispatch(fetchChats()).then((res) => {
      setChats(res.payload.data);
    })
  }

  const selectChat = (item) => {
    setSelectedChat(item);
  }

  const openCreateGroupDialog = (user) => {
    setCreateGroupDialogue(true);
  };

  const closeCreateGroupDialog = () => {
    setCreateGroupDialogue(false);
  };
  
  const [chats, setChats] = useState([]);
  return (
    <div className="my-chats">
      <div className="my-chats-header">
        <p>My Chats</p>
        <AddIcon className="my-chats-addgroup" onClick={()=>openCreateGroupDialog({})}/>
      </div>
      {(!chats || !chats.length) && <div className="my-chats-nochats">
        <span>No Groups Added</span>
      </div>}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {chats && chats.map((item)=>(
          <div key={item._id}> 
          <ListItem alignItems="flex-start" className={`my-chats-list ${selectedChat && selectedChat._id == item._id && 'my-chats-list-selected'} `} onClick={() => selectChat(item)}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={item.chatName}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline',marginRight:'5px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                {item.latestMessage.length ? item.latestMessage[0].sender.name : ""}
                </Typography>
                {item.latestMessage.length ? item.latestMessage[0].content : "No Messages"}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" /></div>
        ))}
      </List>
      {createGroupDialogue && <CreateGroup openDialog={createGroupDialogue} closeDialog ={closeCreateGroupDialog} />}
    </div>
  )
}

export default MyChats
