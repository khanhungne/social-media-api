  import React, { useState } from "react";
  import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    FormControlLabel,
    Checkbox,
  } from "@mui/material";
  import authScreenAtom from "../../atoms/authAtom";
  import userScreenAtom from "../../atoms/userAtom";
  import useShowToast from "../../hooks/userShowSnackbar";
  import { Google } from "@mui/icons-material";
  import { useSetRecoilState } from "recoil";

  export default function LoginCard() {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast, ToastComponent } = useShowToast();
    const [errors, setErrors] = useState({ email: "", password: "" });

    const setAuthScreen = useSetRecoilState(authScreenAtom); // Manage auth screen
    const setUser = useSetRecoilState(userScreenAtom); // Store user data

    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      const handleToast = (msg, severity = "info") => {
        const defaultMessages = {
          success: "Đăng nhập thành công!",
          error: "Đã xảy ra lỗi khi đăng nhập.",
        };
        showToast(msg || defaultMessages[severity], severity);
      };

      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });
        const data = await res.json();

        if(!res.ok){
          setErrors({
            email: data.message.includes("Email") ? data.message : "",
            password: data.message.includes("mật khẩu") ? data.message : "",
          });
          showToast(data.message || "Đã xảy ra lỗi", "error");
          setTimeout(() => {
            setErrors({ email: "", password: "" });
          }, 2000);
          return;
        }

          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
          handleToast("Đăng nhập thành công!", "success");

      } catch (error) {
        handleToast(null, "error");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Đăng nhập vào ứng dụng
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
          Chào mừng bạn, hãy đăng nhập để tiếp tục
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ mb: 4 }}
          >
            Đăng nhập với Google
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <hr style={{ flexGrow: 1, borderColor: "#ccc" }} />
            <span style={{ margin: "0 10px", color: "#aaa" }}>hoặc</span>
            <hr style={{ flexGrow: 1, borderColor: "#ccc" }} />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={inputs.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            placeholder="******"
            value={inputs.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Button href="#" color="primary" sx={{ textDecoration: "none" }}>
            Quên mật khẩu
            </Button>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
          <Typography variant="body2" align="center">
          Chưa có tài khoản?{" "}
            <Button
              color="primary"
              onClick={() => {
                setAuthScreen("signup");
              }}
            >
              Đăng ký
            </Button>
          </Typography>
        </Box>
        {ToastComponent}
      </Container>
    );
  }
