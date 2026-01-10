import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";



function SidebarPOS() {
  const menuItems = [
    { text: "DASHBOARD", icon: <DashboardIcon />, path: "/dashboardUser" },
    { text: "ADD CUSTOMER", icon: <DashboardIcon />, path: "/create-customer" },
    { text: "PRODUCTS", icon: <InventoryIcon />, path: "/allproducts" },
    { text: "SALES REPORT", icon: <ShoppingCartIcon />, path: "/sales-report" },
    { text: "PROFILE", icon: <PersonIcon />, path: "/profile" },
  ];


  const navigate=useNavigate()
  
    const handleLogout = () => {
  sessionStorage.clear();
  navigate("/login", { replace: true }); // ✅ important
};


    const [username,setUserName]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setUserName(JSON.parse(sessionStorage.getItem("user")).username)
    }else{
      setUserName("")
    }
  },[])

  return (
    <Drawer
      variant="permanent" sx={{ width: 250, flexShrink: 0, "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", backgroundColor: "black" },
      }}
    >
      <h3 className="ms-3 p-3 text-white">WELCOME <span className='text-warning'>{username.split(" ")[0].toUpperCase()}</span></h3>
      <Box sx={{ marginTop: "30px", width: 250 }} role="presentation">
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <button onClick={handleLogout} className="btn btn-light text-dark mt-5">LOGOUT</button> 
    </Drawer>
  );
}

export default SidebarPOS;
