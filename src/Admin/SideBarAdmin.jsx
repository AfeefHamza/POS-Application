import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


function SideBarAdmin() {
  const menuItems = [
    { text: "DASHBOARD", icon: <DashboardIcon />, path: "/dashboardAdmin" },
    { text: "ADD PRODUCT", icon: <AddBoxIcon />, path: "/create-product" },
    { text: "MANAGE PRODUCTS", icon: <InventoryIcon />, path: "/products" },
    { text: "COMPANY LIST", icon: <StorefrontIcon />, path: "/purchasers-list" },
    { text: "CATEGORY LIST", icon: <CategoryIcon />, path: "/category-list" },
    { text: "BRAND LIST", icon: <BrandingWatermarkIcon />, path: "/brand-list" },
    { text: "CUSTOMERS LIST", icon: <ReceiptIcon />, path: "/customers-list" },
    { text: "USERS LIST", icon: <PeopleIcon />, path: "/users-list" },

  ];

  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.clear()
    navigate('/login')

  }

  return (
    <Drawer
      variant="permanent" sx={{ width: 250, flexShrink: 0, "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", backgroundColor: "Black" },
      }}
    >
      <h3 className="ms-3 p-3 text-white">WELCOME ADMIN</h3>
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

export default SideBarAdmin;
