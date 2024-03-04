import ChatBox from "../Components/ChatBox"
import MyChats from "../Components/MyChats"
import SideDrawer from "../Components/SideDrawer"

const Home = () => {
  return (
    <div className="home">
      <SideDrawer />
      <div className="home-chat-screen">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  )
}

export default Home
