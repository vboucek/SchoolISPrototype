import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../state/atoms';
import { AdminPage } from './Admin/AdminPage';
import { AdminPageOverview } from './Admin/AdminPageOverview';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
import MainPage from './Pages/MainPage';
import { UserCreate } from './User/UserCreate';
import { UserPage } from './User/UserPage';

export const Pages = () => {
  const logedInUser = useRecoilValue(loggedInUserAtom);

  return (<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/user" element={logedInUser && <UserPage userId={logedInUser}/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={logedInUser && <Logout/>} />
    <Route path="/admin" element={<AdminPage />} >
      <Route index element={<AdminPageOverview />} ></Route>
      <Route path="/admin/createUser" element={<UserCreate />}></Route>
    </Route>
  </Routes>);
};

export default Pages;
