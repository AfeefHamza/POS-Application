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
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './SidebarPOS.css';


function SidebarPOS() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [username, setUserName] = useState("");

  const menuItems = [
    { text: "DASHBOARD", icon: <DashboardIcon />, path: "/dashboardUser" },
    { text: "ADD CUSTOMER", icon: <DashboardIcon />, path: "/create-customer" },
    { text: "PRODUCTS", icon: <InventoryIcon />, path: "/allproducts" },
    { text: "SALES REPORT", icon: <ShoppingCartIcon />, path: "/sales-report" },
    { text: "PROFILE", icon: <PersonIcon />, path: "/profile" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
  sessionStorage.clear();
  navigate("/login", { replace: true }); // ✅ important
};

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUserName(JSON.parse(sessionStorage.getItem("user")).username);
    } else {
      setUserName("");
    }
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        sx={{
          display: { xs: 'none', md: 'block' },
          width: isExpanded ? 260 : 80,
          flexShrink: 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          "& .MuiDrawer-paper": {
            width: isExpanded ? 260 : 80,
            boxSizing: "border-box",
            backgroundColor: "#1a1a2e",
            borderRight: "2px solid #16213e",
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            "::-webkit-scrollbar": {
              width: "6px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "#2a2a4e",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#0f3460",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#16213e",
              },
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: "20px 16px",
            background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
            borderBottom: "2px solid #0f3460",
            textAlign: "center",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: isExpanded ? "flex-start" : "center",
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Box
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00d4ff 30%, #0099ff 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: isExpanded ? "nowrap" : "pre",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isExpanded ? `HI, ${username.split(" ")[0].toUpperCase()}` : username.split(" ")[0][0]?.toUpperCase()}
          </Box>
        </Box>

        {/* Menu Items */}
        <Box sx={{ marginTop: "10px", width: "100%", paddingBottom: "100px" }} role="presentation">
          <List sx={{ padding: 0 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  padding: "8px 12px",
                  transition: 'all 0.2s ease',
                  "&:hover": {
                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                    transform: isExpanded ? "translateX(4px)" : "none",
                  },
                  borderLeft: "3px solid transparent",
                  "&:hover .sidebar-item": {
                    borderLeft: "3px solid #00d4ff",
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  className="sidebar-item"
                  sx={{
                    padding: "12px 8px",
                    borderRadius: "8px",
                    transition: 'all 0.3s ease',
                    justifyContent: isExpanded ? "flex-start" : "center",
                    "&:hover": {
                      backgroundColor: "rgba(0, 212, 255, 0.15)",
                      boxShadow: isExpanded ? "0 4px 12px rgba(0, 212, 255, 0.1)" : "none",
                    },
                    color: "#e0e0e0",
                    textDecoration: "none",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#00d4ff",
                      minWidth: isExpanded ? 40 : 24,
                      display: "flex",
                      justifyContent: "center",
                      transition: 'all 0.3s ease',
                      fontSize: "24px",
                      "& svg": {
                        fontSize: "24px",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isExpanded && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        marginLeft: "12px",
                        "& .MuiListItemText-primary": {
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#e0e0e0",
                          whiteSpace: "nowrap",
                          transition: 'all 0.3s ease',
                          letterSpacing: "0.5px",
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Logout Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            padding: "0 12px",
            transition: 'all 0.3s ease',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: isExpanded ? "12px 16px" : "12px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: isExpanded ? "14px" : "0",
              display: "flex",
              alignItems: "center",
              justifyContent: isExpanded ? "flex-start" : "center",
              gap: "8px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 8px rgba(231, 76, 60, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c0392b";
              e.target.style.boxShadow = "0 6px 16px rgba(231, 76, 60, 0.4)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e74c3c";
              e.target.style.boxShadow = "0 4px 8px rgba(231, 76, 60, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <LogoutIcon sx={{ fontSize: "20px" }} />
            {isExpanded && "LOGOUT"}
          </button>
        </Box>
      </Drawer>

      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1300,
          backgroundColor: '#1a1a2e',
          borderRadius: '8px',
          border: '2px solid #16213e',
        }}
      >
        <IconButton
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          sx={{ color: '#00d4ff' }}
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isMobileOpen}
        onClose={handleMobileClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            backgroundColor: '#1a1a2e',
            borderRight: '2px solid #16213e',
            width: 260,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: "20px 16px",
            background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
            borderBottom: "2px solid #0f3460",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00d4ff 30%, #0099ff 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {`HI, ${username.split(" ")[0].toUpperCase()}`}
          </Box>
          <IconButton onClick={handleMobileClose} sx={{ color: '#00d4ff' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <Box sx={{ width: "100%", paddingBottom: "100px" }} role="presentation">
          <List sx={{ padding: 0 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  padding: "8px 12px",
                  transition: 'all 0.2s ease',
                  "&:hover": {
                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleMobileClose}
                  className="sidebar-item"
                  sx={{
                    padding: "12px 8px",
                    borderRadius: "8px",
                    transition: 'all 0.3s ease',
                    "&:hover": {
                      backgroundColor: "rgba(0, 212, 255, 0.15)",
                    },
                    color: "#e0e0e0",
                    textDecoration: "none",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#00d4ff",
                      minWidth: 40,
                      transition: 'all 0.3s ease',
                      fontSize: "24px",
                      "& svg": {
                        fontSize: "24px",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      marginLeft: "12px",
                      "& .MuiListItemText-primary": {
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#e0e0e0",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.5px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Logout Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 12,
            right: 12,
            transition: 'all 0.3s ease',
          }}
        >
          <button
            onClick={() => {
              handleMobileClose();
              handleLogout();
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 8px rgba(231, 76, 60, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#c0392b";
              e.target.style.boxShadow = "0 6px 16px rgba(231, 76, 60, 0.4)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#e74c3c";
              e.target.style.boxShadow = "0 4px 8px rgba(231, 76, 60, 0.2)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <LogoutIcon sx={{ fontSize: "20px" }} />
            LOGOUT
          </button>
        </Box>
      </Drawer>
    </>
  );
}

export default SidebarPOS;
