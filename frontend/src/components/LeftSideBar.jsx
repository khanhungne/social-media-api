import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Instagram, Home, Search, Add, Favorite, Person, Menu, Chat   } from '@mui/icons-material';
export default function SidebarLeft() {
    return (
        <Box
            sx={{
                width: 64,
                height: '100vh',
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                gap: 2,
                boxShadow: 1,
            }}
        >
            <IconButton>
                <Instagram fontSize="large" />
            </IconButton>
            <IconButton>
                <Home fontSize="large" />
            </IconButton>
            <IconButton>
                <Chat fontSize="large" />
            </IconButton>

            <IconButton>
                <Search fontSize="large" />
            </IconButton>
            <IconButton sx={{ bgcolor: 'grey.200', borderRadius: '50%', width: 40, height: 40 }}>
                <Add fontSize="large" />
            </IconButton>
            <IconButton>
                <Favorite fontSize="large" />
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    backgroundColor: 'red',
                    borderRadius: '50%',
                }} />
            </IconButton>
            <IconButton>
                <Person fontSize="large" />
            </IconButton>
            <IconButton>
                <Menu fontSize="large" />
            </IconButton>
        </Box>
    );
}