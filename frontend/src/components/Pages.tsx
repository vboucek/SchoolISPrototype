import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';

export const Pages = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
  </Routes>
);

export default Pages;
