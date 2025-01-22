import React from 'react';
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


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    primary: {
      main: '#fff', // Màu chính
    },
    secondary: {
      main: '#dc004e', // Màu phụ
    },
    background: {
    default: '#101010', // Màu nền tối
    paper: '#424242', // Màu nền cho các thành phần như Card
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      {/* <ThemeProvider theme={}> */}
          {/* <CssBaseline /> */}
          <ToastProvider>
            <App />
          </ToastProvider>
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)
