import { useNavigate } from "react-router-dom"
import ChatBox from "../Components/ChatBox"
import MyChats from "../Components/MyChats"
import { useEffect, useState } from "react"
import SearchDrawer from "../Components/SearchDrawer"
import { MyContext } from "../MyContext";


const Home = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    let userAuth = localStorage.getItem('user');
    if (!userAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <MyContext.Provider value={[selectedChat, setSelectedChat,fetchAgain, setFetchAgain]}>
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

export default Home
