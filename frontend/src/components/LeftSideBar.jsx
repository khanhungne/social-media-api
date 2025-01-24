import React, { useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  Divider,
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
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";

export default function SidebarLeft({ toggleColorMode, mode }) {
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const [anchorEl, setAnchorEl] = useState(null);
  const [hasNotifications, setHasNotifications] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthScreen("login");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: { xs: 56, sm: 64 },
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        gap: 3,
        boxShadow: 1,
        position: 'fixed', 
        left: 0,
        top: 0, 
        zIndex: 1000, 
      }}
    >
      {/* Logo */}
      <IconButton>
        <Instagram fontSize="large" />
      </IconButton>

      {/* Các chức năng dành cho người dùng đã đăng nhập */}
      {user ? (
        <>
          <Tooltip title="Trang chủ" arrow>
            <IconButton component={RouterLink} to="/">
              <Home fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Chat" arrow>
            <IconButton component={RouterLink} to="/chat">
              <Chat fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Tìm kiếm" arrow>
            <IconButton component={RouterLink} to="/search">
              <Search fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Thêm bài" arrow>
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

          <Tooltip title="Yêu thích" arrow>
            <IconButton>
              <Favorite fontSize="large" />
              {hasNotifications && (
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
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Hồ sơ" arrow>
            <IconButton component={RouterLink} to={`/${user.username || "profile"}`}>
              <Person fontSize="large" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Đăng nhập" arrow>
          <IconButton component={RouterLink} to="/login">
            <Person fontSize="large" />
          </IconButton>
        </Tooltip>
      )}

      {/* Menu */}
      <Tooltip title="Menu" arrow>
        <IconButton onClick={handleMenuOpen}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuList>
          <MenuItem
            onClick={() => {
              toggleColorMode();
              handleMenuClose();
            }}
          >
            {mode === "dark" ? (
              <LightMode fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <DarkMode fontSize="small" sx={{ mr: 1 }} />
            )}
            Chuyển đổi chế độ
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ mr: 1 }} />
            Đăng xuất
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
