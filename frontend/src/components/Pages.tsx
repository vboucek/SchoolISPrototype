import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../state/atoms';
import { AdminPage } from './Admin/AdminPage';
import { AdminPageOverview } from './Admin/AdminPageOverview';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
import { FacultyCreate } from './Faculty/FacultyCreate';
import { FacultyDelete } from './Faculty/FacultyDelete';
import { FacultyEdit } from './Faculty/FacultyEdit';
import { FacultyPage } from './Faculty/FacultyPage';
import MainPage from './Pages/MainPage';
import { SemesterCreate } from './Semester/SemesterCreate';
import { SemesterDelete } from './Semester/SemesterDelete';
import { SemesterEdit } from './Semester/SemesterEdit';
import { SemesterPage } from './Semester/SemesterPage';
import { UserCreate } from './User/UserCreate';
import { UserDelete } from './User/UserDelete';
import { UserEdit } from './User/UserEdit';
import { UserInspect } from './User/UserInspect';
import { UserPage } from './User/UserPage';

export const Pages = () => {
  const logedInUser = useRecoilValue(loggedInUserAtom);

  return (<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={logedInUser && <Logout />} />
    <Route path="/admin" element={logedInUser && <AdminPage />} >
      <Route index element={<AdminPageOverview />} ></Route>
      <Route path="/admin/createUser" element={<UserCreate />}></Route>
      <Route path="/admin/createSemester" element={<SemesterCreate />}></Route>
      <Route path="/admin/createFaculty" element={<FacultyCreate />}></Route>
      <Route path="/admin/semester/:id/delete" element={<SemesterDelete />}></Route>
      <Route path="/admin/semester/:id/edit" element={<SemesterEdit />}></Route>
      <Route path="/admin/faculty/:id/delete" element={<FacultyDelete />}></Route>
      <Route path="/admin/faculty/:id/edit" element={<FacultyEdit />}></Route>
    </Route>
    <Route path="/user/:id" element={<UserPage />} >
      <Route index element={<UserInspect />}></Route>
      <Route path="/user/:id/edit" element={<UserEdit />}></Route>
      <Route path="/user/:id/delete" element={<UserDelete />}></Route>
    </Route>
  </Routes>);
};

export default Pages;
