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
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateGroup from "./CreateGroup";
import { ChatState } from "../Pages/Home";
import { Badge, TextField } from "@mui/material";
import { readMessage } from "../Redux/slice/MessageSlice";

const MyChats = () => {
  const dispatch = useDispatch()
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain, selectedUser } = ChatState();
  const [createGroupDialogue, setCreateGroupDialogue] = useState(false);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);


  useEffect(() => {
    fetchUserChats("")
  }, [fetchAgain])

  useEffect(() => {
    const getData = setTimeout(() => {
    fetchUserChats(search)
  },2000)
  return () => clearTimeout(getData);
  }, [search])

  const fetchUserChats = (name) => {
    dispatch(fetchChats(name)).then((res) => {
      setChats(res.payload.data);
      if(res.payload.data && res.payload.data.length) {
        setSelectedChat(res.payload.data[0]);
      }
      setFetchAgain(false)
    })
  }

  const selectChat = (item) => {
    setSelectedChat(item);
    if(item.latestMessage && item.latestMessage.sender._id != selectedUser._id) {
      dispatch(readMessage(item.latestMessage._id));
      setFetchAgain(true);
    }
  }

  const openCreateGroupDialog = (user) => {
    setCreateGroupDialogue(true);
  };

  const closeCreateGroupDialog = () => {
    setCreateGroupDialogue(false);
  };

  const searchGroup = (e) => {
    setSearch(e.target.value);
  }

  const checkIsRead = (chat) => {
    return chat.latestMessage ? chat.latestMessage.readBy.some((item) => item === selectedUser._id) : true;
  }

  return (
    <div className="my-chats">
      <div className="my-chats-header">
        <p>My Chats</p>
        <div>
          {/* <RefreshIcon className="my-chats-addgroup" onClick={fetchUserChats} /> */}
          <AddIcon className="my-chats-addgroup" onClick={() => openCreateGroupDialog({})} />
        </div>
      </div>
      <div className="my-chats-search">
      <TextField id="standard-basic" className="my-chats-search-textfield" label="Search Groups" variant="standard" onChange={searchGroup} />
      </div>
      {(!chats || !chats.length) && <div className="my-chats-nochats">
        <span>No Groups Found</span>
      </div>}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {chats && chats.map((item) => (
          <div key={item._id}>
            <ListItem alignItems="flex-start" className={`my-chats-list ${selectedChat && selectedChat._id == item._id && 'my-chats-list-selected'} `} onClick={() => selectChat(item)}>
              <ListItemAvatar>
                {checkIsRead(item) ? <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" /> :
                  <Badge badgeContent={1} color="primary">
                    <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
                  </Badge>}
              </ListItemAvatar>
              <ListItemText
                className="my-chats-each-chat"
                primary={item.chatName}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline', marginRight: '5px' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.latestMessage ? item.latestMessage.sender.name : ""}
                    </Typography>
                    {item.latestMessage ? item.latestMessage.content.substring(0, 20) : "No Messages"}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" /></div>
        ))}
      </List>
      {createGroupDialogue && <CreateGroup openDialog={createGroupDialogue} closeDialog={closeCreateGroupDialog} />}
    </div>
  )
}

export default MyChats
