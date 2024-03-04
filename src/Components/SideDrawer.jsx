import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      search
    </Box>
  );

  const logoutUser = async() => {
    dispatch(logout()).then((res)=> {
      if(res.payload.status != 200) {
        console.log(res);
      } else {
        navigate('/login')

      }
    })
  }
  return (
    <>
      <div className='side-drawer'>
        <Button variant="outlined" startIcon={<SearchIcon />} onClick={toggleDrawer("left", true)}>
          Search Groups
        </Button>
        <h1 className='side-drawer-middle-item'>Riktam</h1>
        <Button variant="contained" onClick={logoutUser}>Logout</Button>
      </div>
      <div>
      <div key={"left"}>
        <Drawer
          anchor={"left"}
          open={openDrawer}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
    </div>
    </>
  )
}

export default SideDrawer
