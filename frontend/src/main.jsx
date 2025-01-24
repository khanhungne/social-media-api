import React, { useState, useMemo  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from "./hooks//userShowSnackbar.jsx";

function Root() {
  const [mode, setMode] = useState('light');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: mode, // light hoặc dark
        ...(mode === 'dark'
          ? {
              background: {
                default: '#101010',
                paper: '#424242',
              },
              text: {
                primary: '#ffffff',
                secondary: '#b0b0b0',
              },
            }
          : {
              background: {
                default: '#ffffff',
                paper: '#f5f5f5',
              },
              text: {
                primary: '#000000',
                secondary: '#5f5f5f',
              },
            }),
      },
    }), [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <BrowserRouter>
          <ToastProvider>
            <App toggleColorMode={toggleColorMode} mode={mode} />
          </ToastProvider>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
