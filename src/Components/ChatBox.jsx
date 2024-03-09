import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../MyContext";
import EditIcon from '@mui/icons-material/Edit';
import UpdateGroup from "./UpdateGroup";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { createMessage, fetchMessages, likeMessage, readMessage } from "../Redux/slice/MessageSlice";
import { useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { deleteGroup } from "../Redux/slice/ChatSlice";
import io from 'socket.io-client';
import { ChatState } from "../Pages/Home";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const {selectedChat,setSelectedChat, setFetchAgain,selectedUser} = ChatState();
  const [updateGroupDialogue, setUpdateGroupDialogue] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [selectedChatCompare, setselectedChatCompare] = useState({});
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  // socket connection added
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER);
    newSocket.emit('setup',selectedUser);
    newSocket.on('connected',() => {
      setSocketConnected(true);
    })
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [selectedChat])
  
// fetch chat messages
  useEffect(() => {
    if (selectedChat._id) {
      fetchChatMessages();
      setselectedChatCompare(selectedChat);
    }
  }, [selectedChat])

  useEffect(() => {
    if(socket) {

      socket.on('messageRecieved',(newMessageRecieved) => {
        setFetchAgain(true);
        if(!selectedChatCompare || selectedChatCompare._id != newMessageRecieved.chat._id){
          console.log('recieved message in other group');
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
          dispatch(readMessage(newMessageRecieved._id));
        }
       })

       socket.on('likeRecieved',(newMessageRecieved) => {
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((message) => {
            if (message._id === newMessageRecieved._id) {
              return newMessageRecieved;
            }
            return message;
          });
        
          return updatedMessages;
        });
       })
    }
  }, [socket, selectedChatCompare])
  

  // scroll to bottom when chat opened
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  // update group dialog
  const openUpdateGroupDialog = () => {
    setUpdateGroupDialogue(true);
  };

  const closeUpdateGroupDialog = () => {
    setUpdateGroupDialogue(false);
  };

  const sendMessage = async (e) => {
    if (newMessage) {
      let data = {
        content: newMessage,
        chatId: selectedChat._id
      }
      dispatch(createMessage(data)).then((res) => {
        if (res.payload.status != 201) {
          // setError(res.payload.data)
        } else {
          socket.emit('newMessage',res.payload.data);
          setMessages([...messages, res.payload.data])
          setNewMessage("");
          dispatch(readMessage(res.payload.data._id));
        }
      })
    }
  }

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  }

  // get all chat messages
  const fetchChatMessages = async () => {
    if (!selectedChat) return;
    dispatch(fetchMessages(selectedChat._id)).then((res) => {
      if (res.payload.status != 200) {
        // setError(res.payload.data)
      } else {
        setMessages(res.payload.data);
        socket.emit('joinChat',selectedChat._id)
      }
    })
  }

  // delete group handler
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteChat = async () => {
    dispatch(deleteGroup(selectedChat._id)).then((res) => {
      if (res.payload.status != 204) {
        // setError(res.payload.data)
      } else {
        setSelectedChat({})
        setFetchAgain(true);
        setOpen(false);
      }
    })
  }

  const like = async (message,type) => {
    let data = {
      id:message._id,
      type:type
    }
    dispatch(likeMessage(data)).then((res) => {
      if (res.payload.status != 200) {
        // setError(res.payload.data)
      } else {
        socket.emit('likeMessage',res.payload.data);
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((message) => {
            if (message._id === res.payload.data._id) {
              return res.payload.data;
            }
            return message;
          });
        
          return updatedMessages;
        });
      }
    })
  }

  const checkIsLiked = (message) => {
    return message && message.likedBy.some((item) => item === selectedUser._id)
  }
  return (
    <div className="chat-box">
      <div className="chat-box-header">
        {Object.keys(selectedChat).length ? <div><p className="chat-box-header-text">{selectedChat.chatName.toUpperCase()}</p></div> : ''}
        {Object.keys(selectedChat).length ? <div>
          <EditIcon className='admin-table-edit-icon' onClick={() => openUpdateGroupDialog()} />
          <DeleteIcon className='admin-table-edit-icon' onClick={handleClickOpen} /
          ></div> : ''}

      </div>
      {!Object.keys(selectedChat).length ? <div className="chat-box-nochatselected"><p>Click on a group to start chatting</p></div> :
        <div className="chat-box-chatarea">
          <div className="chat-box-messages">
            {messages && messages.map((item) => (
              <div className={item.sender._id == selectedUser._id ? 'chat-box-each-message-self' : 'chat-box-each-message'}>
                {item.sender._id !== selectedUser._id ? <Tooltip title={item.sender.name}>
                  <IconButton>
                    <Avatar>{item.sender.name.substring(0, 1).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip> : ''}
                <div className="chat-box-each-message-text">
                  <span>{item.content}</span>
                </div>
                {
                  checkIsLiked(item) ? <FavoriteIcon style={{color:'red', cursor:'pointer'}} onClick={()=>like(item,'unlike')}/> : <FavoriteBorderIcon style={{cursor:'pointer'}} onClick={()=>like(item,'like')}/>
                }
                {item.likedBy && item.likedBy.length ? item.likedBy.length :''}
              </div>
            ))}
            <div ref={containerRef}></div>
          </div>
          <div className="chat-box-input-div">
            <TextField className="chat-box-input" id="outlined-basic" label="Send Message" variant="outlined" value={newMessage} onChange={typingHandler} />
            <span className="chat-box-send-icon" onClick={sendMessage}><SendIcon /></span>
          </div>
        </div>}
      {updateGroupDialogue && <UpdateGroup openDialog={updateGroupDialogue} closeDialog={closeUpdateGroupDialog} />}
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete Chat
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure? This Will Remove All Messages.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={deleteChat} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  )
}

export default ChatBox
