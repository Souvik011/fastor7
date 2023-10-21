import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import ValidateOtp from './Auth/ValidateOtp';
import ResturentPage from './Auth/MainPage';
import Cuisines from './Auth/Cuisines';



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<ValidateOtp />} />
      <Route path='/main' element={<ResturentPage />} />
      <Route path ='/cuisine' element={<Cuisines />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
