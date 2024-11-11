import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import { ChakraProvider } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ChatContextProvider } from './context/chatContex.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <BrowserRouter>
    <ChatContextProvider>
  <ChakraProvider>

  <NextUIProvider>
    <AuthProvider>
    <Toaster />
    <App />
    </AuthProvider>
  </NextUIProvider>
  </ChakraProvider>
    </ChatContextProvider>
    </BrowserRouter>
    </React.StrictMode>,

)
