import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';


function App(props) {
  return (
    <div>
      <Routes>
      <Route path='/' element={<FirstPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      
    </div>
  );
}

export default App;