import { useNavigate } from "react-router-dom"
import ChatBox from "../Components/ChatBox"
import MyChats from "../Components/MyChats"
import { useContext, useEffect, useState } from "react"
import SearchDrawer from "../Components/SearchDrawer"
import { MyContext } from "../MyContext";


const Home = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    let userAuth = localStorage.getItem('user');
    setSelectedUser(JSON.parse(userAuth))
    if (!userAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <MyContext.Provider value={{selectedChat, setSelectedChat,fetchAgain, setFetchAgain, selectedUser, setSelectedUser}}>
        <div className="home">
          <SearchDrawer />
          <div className="home-chat-screen">
            <MyChats />
            <ChatBox />
          </div>
        </div>
      </MyContext.Provider>
    </>
  )
}
export const ChatState = () => {
  return useContext(MyContext);
};

export default Home
