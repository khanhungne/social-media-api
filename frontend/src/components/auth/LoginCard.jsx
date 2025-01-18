import React from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { Google } from '@mui/icons-material';

export default function LoginCard() {
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
                    placeholder="your@email.com"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    placeholder="******"
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
        </Container>
    );
}