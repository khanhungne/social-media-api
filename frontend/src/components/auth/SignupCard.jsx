import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useShowToast from "../../hooks/userShowSnackbar";
import { validateSignupForm } from "../../utils/validation";
import authScreenAtom from "../../atoms/authAtom";
import userAtom from "../../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Import biểu tượng quay lại

export default function SignupCard() {
  const defaultFormData = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const { showToast, ToastComponent } = useShowToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Vui lòng sửa các lỗi trong biểu mẫu!", "error");
      return;
    }
    setIsSubmitting(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        if (data.errors) {
          setErrors(data.errors);
        }
        showToast(data.message || "Đăng ký thất bại!", "error");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      showToast("Đăng ký thành công!", "success");
      setAuthScreenState("login");
      setFormData(defaultFormData);
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      showToast("Đã xảy ra lỗi. Vui lòng thử lại!", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPasswordField = (field) => (
    <TextField
      key={field.name}
      required
      fullWidth
      label={field.label}
      name={field.name}
      type={showPassword ? "text" : "password"}
      value={formData[field.name]}
      onChange={handleChange}
      error={Boolean(errors[field.name])}
      helperText={errors[field.name]}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const renderTextField = (field) => (
    <TextField
      key={field.name}
      required
      fullWidth
      label={field.label}
      name={field.name}
      type="text"
      value={formData[field.name]}
      onChange={handleChange}
      error={Boolean(errors[field.name])}
      helperText={errors[field.name]}
    />
  );

  const fields = [
    { label: "Tên", name: "name" },
    { label: "Tên tài khoản", name: "username" },
    { label: "Email", name: "email" },
    { label: "Mật khẩu", name: "password", isPassword: true },
    { label: "Xác nhận mật khẩu", name: "confirmPassword", isPassword: true },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          p: 4,
        }}
      >
      <IconButton 
          onClick={() => setAuthScreenState("login")} 
          color="default" 
          sx={{ 
            alignSelf: "flex-start", 
            mt: 1, 
            p: 0, 
            width: '24px', 
            height: '24px', 
          }}
      >
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Stack spacing={2} width="100%">
            {fields.map((field) =>
              field.isPassword
                ? renderPasswordField(field)
                : renderTextField(field)
            )}
            <Button
              type="submit" 
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Đăng ký"}
            </Button>
          </Stack>
        </Box>
      </Box>
      {ToastComponent}
    </Container>
  );
}
