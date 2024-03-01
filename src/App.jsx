import AllUsers from "./Pages/AdminAccess/AllUsers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import CreateUser from "./Pages/AdminAccess/CreateUser";
import Home from "./Pages/Home";
import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<AllUsers/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
