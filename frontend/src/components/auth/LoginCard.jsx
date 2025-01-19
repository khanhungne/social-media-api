import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import authScreenAtom from '../../atoms/authAtom';
import userScreenAtom  from '../../atoms/userAtom';
import { Google } from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import useShowToast from '../../hooks/userShowSnackbar';

export default function LoginCard() {
    const [inputs, setInputs] = useState({email: '', password:''});
    const [isLoading, setIsLoading] = useState(false);
    const { showToast, ToastComponent } = useShowToast();

    const setAuthScreen = useSetRecoilState(authScreenAtom); // Quản lý màn hình
    const setUser = useSetRecoilState(userScreenAtom); // Lưu thông tin người dùng
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e)
        setInputs((prev) => ({ ...prev, [name]: value }));
    }
    const handleLogin = async (e) =>{
        try{
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));
            console.log(res)
            const data = await res.json();
            if(data.error){
                showToast(data.error, 'error');  // Gọi showToast khi có lỗi
                return;
            }
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
            showToast('Login successful!', 'success');
        }catch(error){
            showToast('An error occurred while logging in', 'error');   
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    bgcolor: 'white',
                    p: 4,
                    borderRadius: 1,
                    boxShadow: 3,
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Sign in to App
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                    Welcome, please sign in to continue
                </Typography>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google />}
                    sx={{ mb: 4 }}
                >
                    Sign In With Google
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <hr style={{ flexGrow: 1, borderColor: '#ccc' }} />
                    <span style={{ margin: '0 10px', color: '#aaa' }}>or</span>
                    <hr style={{ flexGrow: 1, borderColor: '#ccc' }} />
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
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Remember me"
                    />
                    <Button href="#" color="primary" sx={{ textDecoration: 'none' }}>
                        Forgot password?
                    </Button>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
                <Typography variant="body2" align="center">
                        Don&apos;t have an account?{' '}
                        <Button color="primary" onClick={() => { /* Handle sign up */ }}>
                            Sign up
                        </Button>
                </Typography>
            </Box>
            {ToastComponent}
        </Container>
    );
}