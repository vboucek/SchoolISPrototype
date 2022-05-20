import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../state/atoms';
import { AdminPage } from './Admin/AdminPage';
import { AdminPageOverview } from './Admin/AdminPageOverview';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
import { FacultyCreate } from './Faculty/FacultyCreate';
import { FacultyDelete } from './Faculty/FacultyDelete';
import { FacultyEdit } from './Faculty/FacultyEdit';
import { SemesterCreate } from './Semester/SemesterCreate';
import { SemesterDelete } from './Semester/SemesterDelete';
import { SemesterEdit } from './Semester/SemesterEdit';
import { UserCreate } from './User/UserCreate';
import { UserDelete } from './User/UserDelete';
import { UserEdit } from './User/UserEdit';
import { UserInspect } from './User/UserInspect';
import { UserPage } from './User/UserPage';
import MainPage from './MainPage/MainPage';
import SubjectPage from './Subject/SubjectPage';
import SubjectDetailPage from './Subject/SubjectDetailPage';

export const Pages = () => {
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={loggedInUser && <Logout />} />
      <Route path="/admin" element={loggedInUser && <AdminPage />}>
        <Route index element={<AdminPageOverview />} />
        <Route path="/admin/createUser" element={<UserCreate />} />
        <Route path="/admin/createSemester" element={<SemesterCreate />} />
        <Route path="/admin/createFaculty" element={<FacultyCreate />} />
        <Route path="/admin/semester/:id/delete" element={<SemesterDelete />} />
        <Route path="/admin/semester/:id/edit" element={<SemesterEdit />} />
        <Route path="/admin/faculty/:id/delete" element={<FacultyDelete />} />
        <Route path="/admin/faculty/:id/edit" element={<FacultyEdit />} />
      </Route>
      <Route path="/user/:id" element={<UserPage />}>
        <Route index element={<UserInspect />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />
        <Route path="/user/:id/delete" element={<UserDelete />} />
      </Route>
      <Route path="/subject" element={loggedInUser && <SubjectPage />} />
      <Route
        path="/subject/:id"
        element={loggedInUser && <SubjectDetailPage />}
      />
    </Routes>
  );
};

export default Pages;
