import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import EditIcon from '@mui/icons-material/Edit';
import UpdateGroup from "./UpdateGroup";


const ChatBox = () => {
  const [selectedChat, setSelectedChat] = useContext(MyContext);
  const [updateGroupDialogue, setUpdateGroupDialogue] = useState(false);

  const openUpdateGroupDialog = () => {
    setUpdateGroupDialogue(true);
  };

  const closeUpdateGroupDialog = () => {
    setUpdateGroupDialogue(false);
  };

  

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        {Object.keys(selectedChat).length ? <div><p className="chat-box-header-text">{selectedChat.chatName.toUpperCase()}</p></div> : ''}
        {Object.keys(selectedChat).length ? <div><EditIcon className='admin-table-edit-icon' onClick={()=>openUpdateGroupDialog()}/></div> : ''}

      </div>
      {!Object.keys(selectedChat).length ?  <div className="chat-box-nochatselected"><p>Click on a group to start chatting</p></div> :<div className="chat-box-chatarea">
      </div>}
      {updateGroupDialogue && <UpdateGroup openDialog={updateGroupDialogue} closeDialog ={closeUpdateGroupDialog} />}

    </div>
  )
}

export default ChatBox
