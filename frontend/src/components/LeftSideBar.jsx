import React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Divider,
  useTheme,
  useColorMode,
} from "@mui/material";
import {
  Instagram,
  Home,
  Search,
  Add,
  Favorite,
  Person,
  Menu as MenuIcon,
  Chat,
  DarkMode,
  LightMode,
  Logout,
} from "@mui/icons-material";
import authScreenAtom from "../../atoms/authAtom";
import userAtom from "../../atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link as RouterLink } from "react-router-dom";

export default function SidebarLeft() {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode(); // Chuyển đổi chế độ màu
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const handleLogout = () => {
    // Đăng xuất
    localStorage.removeItem("user");
    setAuthScreen("login");
    window.location.reload(); // Tải lại trang để trở về trang đăng nhập
  };

  return (
    <Box
      sx={{
        width: 64,
        height: "100vh",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        gap: 2,
        boxShadow: 1,
      }}
    >
      {/* Logo Instagram */}
      <IconButton>
        <Instagram fontSize="large" />
      </IconButton>

      {/* Link đến Home */}
      <Tooltip title="Home" arrow>
        <IconButton component={RouterLink} to="/">
          <Home fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Link đến Chat */}
      <Tooltip title="Chat" arrow>
        <IconButton component={RouterLink} to="/chat">
          <Chat fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Search */}
      <Tooltip title="Search" arrow>
        <IconButton>
          <Search fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Add Post */}
      <Tooltip title="Add Post" arrow>
        <IconButton
          sx={{
            bgcolor: "grey.200",
            borderRadius: "50%",
            width: 40,
            height: 40,
          }}
        >
          <Add fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Favorites */}
      <Tooltip title="Favorites" arrow>
        <IconButton>
          <Favorite fontSize="large" />
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 8,
              height: 8,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
        </IconButton>
      </Tooltip>

      {/* Profile */}
      <Tooltip title="Profile" arrow>
        <IconButton component={RouterLink} to={`/${user?.username || ""}`}>
          <Person fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Menu */}
      <Tooltip title="Menu" arrow>
        <Menu>
          <MenuButton>
            <IconButton>
              <MenuIcon fontSize="large" />
            </IconButton>
          </MenuButton>
          <MenuList>
            {/* Chuyển đổi chế độ màu */}
            <MenuItem onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <LightMode fontSize="small" sx={{ mr: 1 }} />
              ) : (
                <DarkMode fontSize="small" sx={{ mr: 1 }} />
              )}
              Toggle Theme
            </MenuItem>

            <Divider />

            {/* Đăng xuất */}
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Tooltip>
    </Box>
  );
}
