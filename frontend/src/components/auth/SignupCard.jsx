import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 3,
                    p: 4,
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Stack spacing={2} width="100%">
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                required
                                fullWidth
                                label="Full name"
                                placeholder="Enter your full name"
                                disabled
                            />
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                placeholder="Enter your username"
                                disabled
                            />
                        </Stack>
                        <TextField
                            required
                            fullWidth
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
                            disabled
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            disabled
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled
                        >
                            Sign up
                        </Button>
                        <Typography variant="body2" align="center">
                            Already a user?{' '}
                            <Button color="primary" onClick={() => { /* Handle login */ }}>
                                Login
                            </Button>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}