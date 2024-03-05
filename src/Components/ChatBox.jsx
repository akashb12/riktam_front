import { useContext } from "react";
import { MyContext } from "../MyContext";
import EditIcon from '@mui/icons-material/Edit';


const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useContext(MyContext);
  console.log('sd',selectedChat);
  return (
    <div className="chat-box">
      <div className="chat-box-header">
        {Object.keys(selectedChat).length ? <div><p className="chat-box-header-text">{selectedChat.chatName.toUpperCase()}</p></div> : ''}
        {Object.keys(selectedChat).length ? <div><EditIcon className='admin-table-edit-icon'/></div> : ''}

      </div>
      {!Object.keys(selectedChat).length ?  <div className="chat-box-nochatselected"><p>Click on a group to start chatting</p></div> :<div className="chat-box-chatarea">
      </div>}
      
    </div>
  )
}

export default ChatBox
