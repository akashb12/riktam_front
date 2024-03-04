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

const MyChats = () => {
  const dispatch = useDispatch()
  const [selectedChat, setSelectedChat] = useState({});
  useEffect(() => {
    console.log('selectedChat',selectedChat);
    fetchUserChats()
  }, [])

  const fetchUserChats = () => {
    dispatch(fetchChats()).then((res) => {
      setChats(res.payload.data);
    })
  }

  const selectChat = (item) => {
    setSelectedChat(item);
  }
  
  const [chats, setChats] = useState([]);
  return (
    <div className="my-chats">
      {(!chats || !chats.length) && <div className="my-chats-nochats">
        <span>No Groups Added</span>
      </div>}
      
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {chats.map((item)=>(
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
    </div>
  )
}

export default MyChats
