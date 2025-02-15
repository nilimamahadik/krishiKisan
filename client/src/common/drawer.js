// import React, { useMemo, useEffect, useState } from 'react';
// import Box from "@mui/material/Box";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import IconButton from "@mui/material/IconButton"; // Import the IconButton component
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu"; // Import the icon you want to use for the button
// import obbb from "../image/obbb.jpg"
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from '@mui/icons-material/Logout';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';

// const Drawer = () => {
//   const navigate = useNavigate();
//   const [value, setValue] = useState();
//   const [state, setState] = React.useState({
//     left: false
//   });
//   useEffect(() => {

//     const savedInfo = localStorage.getItem("info");
//     if (savedInfo) {
//       const parsedInfo = JSON.parse(savedInfo);
//       setValue(parsedInfo);
//     }

//   }, []);

//   const submit = () => {
//     navigate(`/csv/${value.id}`);
//   }

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };


//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List style={{ display: "flex", paddingLeft: "30px", backgroundColor: '#de0f3f' }}>
//         <img src={obbb} alt="obbb" style={{ height: "30%", width: "60px" }} />&nbsp;
//         <h6 style={{ paddingTop: "20px", color: "white" }}>BHARAT ONLINE
//         </h6>
//       </List>
//       <Divider />
//       <List>
//         <p color="black">
//           <ManageAccountsIcon style={{ fontSize: 30, color: 'blue' }} /> &nbsp;&nbsp;
//           <Link to="/userlist" style={{ color: "black", fontSize: "20px", fontWeight: "normal", textDecoration: "none" }}>User Management </Link></p>
//         <p>
//           < DownloadForOfflineIcon style={{ fontSize: 30, color: 'blue' }} />&nbsp;&nbsp;

//           <Link onClick={submit} style={{ color: "black", fontSize: "20px", fontWeight: "normal", textDecoration: "none" }}>Download</Link>
//         </p>
//         <p color="black">
//           <AccountBoxIcon style={{ fontSize: 30, color: 'blue' }} /> &nbsp;&nbsp;
//           <Link to="/profile" style={{ color: "black", fontSize: "20px", fontWeight: "normal", textDecoration: "none" }}>View Profile</Link></p>
        
//         <p color="black">
//           <LogoutIcon style={{ fontSize: 30, color: 'blue' }} /> &nbsp;&nbsp;
//           <Link to="/" style={{ color: "black", fontSize: "20px", fontWeight: "normal", textDecoration: "none" }}>Log Out  </Link></p>
          
//       </List>
//     </Box>

//   );

//   return (
//     <div>
//       {["left"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           {/* Here we add the IconButton with the MenuIcon */}
//           <IconButton
//             onClick={toggleDrawer(anchor, true)}
//             edge="start"
//             // color="inherit"
//             aria-label="menu"
//             style={{ paddingLeft: '20px' }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//           </SwipeableDrawer>
//         </React.Fragment>
//       ))}
//     </div>

//   );
// };

// export default Drawer;


import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer"; // Use Persistent Drawer
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import obbb from "../image/obbb.jpg";

const drawerWidth = 250; // Set drawer width

const Sidebar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);

  useEffect(() => {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      setValue(JSON.parse(savedInfo));
    }
  }, []);

  const submit = () => {
    if (value) {
      navigate(`/csv/${value.id}`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Persistent Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "white", // Set background color
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Drawer Header */}
        <List
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            color: "black",
          }}
        >
          <img src={obbb} alt="obbb" style={{ height: "40px", width: "60px" }} />
          <h6 style={{ paddingLeft: "10px" }}>BHARAT ONLINE</h6>
        </List>
        <Divider sx={{ bgcolor: "black", height: "1px" }} />

        {/* Navigation Links */}
        <List>
          <ListItem button component={Link} to="/userlist">
            <ListItemIcon>
              <ManageAccountsIcon sx={{  color: "#c11c84"  }} />
            </ListItemIcon>
            <ListItemText primary="User Management" sx={{ color: "black" }} />
          </ListItem>
          <Divider sx={{ bgcolor: "black", height: "1px" }} />

          <ListItem button onClick={submit}>
            <ListItemIcon>
              <DownloadForOfflineIcon sx={{  color: "#c11c84" }} />
            </ListItemIcon>
            <ListItemText primary="Download" sx={{ color: "black" }} />
          </ListItem>
          <Divider sx={{ bgcolor: "black", height: "1px" }} />

          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountBoxIcon sx={{ color: "#c11c84" }} />
            </ListItemIcon>
            <ListItemText primary="View Profile" sx={{ color: "black" }} />
          </ListItem>
          <Divider sx={{ bgcolor: "black", height: "1px" }} />
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#c11c84"  }} />
            </ListItemIcon>
            <ListItemText primary="Log Out" sx={{ color: "black" }} />
          </ListItem>
          <Divider sx={{ bgcolor: "black", height: "1px" }} />

        </List>
      </Drawer>

      {/* Main Content */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
        <h1>Main Content Goes Here</h1>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
