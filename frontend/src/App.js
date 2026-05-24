import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/AuthContext';
import { AuthDialogProvider } from './context/AuthDialogContext';
import AuthDialog from './components/AuthDialog';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AuthDialogProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
          <AuthDialog />
          <Toaster position="top-center" />
        </AuthDialogProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
