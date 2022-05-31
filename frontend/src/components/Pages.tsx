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
import { UserDeletePage } from './User/UserDeletePage';
import { UserDetailPage } from './User/UserDetailPage';
import MainPage from './MainPage/MainPage';
import SubjectPage from './Subject/SubjectPage';
import SubjectDetailPage from './Subject/SubjectDetailPage';
import { UserRole } from '../types/UserRole';
import SubjectFormPage from './Subject/SubjectFormPage';
import SubjectAddTeacherPage from './Subject/SubjectAddTeacherPage';
import UserFormPage from './User/UserFormPage';
import { SubjectDeletePage } from './Subject/SubjectDeletePage';

export const Pages = () => {
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={loggedInUser && <Logout />} />
      <Route path="/admin" element={loggedInUser && <AdminPage />}>
        <Route index element={<AdminPageOverview />} />
        <Route path="/admin/createSemester" element={<SemesterCreate />} />
        <Route path="/admin/createFaculty" element={<FacultyCreate />} />
        <Route path="/admin/semester/:id/delete" element={<SemesterDelete />} />
        <Route path="/admin/semester/:id/edit" element={<SemesterEdit />} />
        <Route path="/admin/faculty/:id/delete" element={<FacultyDelete />} />
        <Route path="/admin/faculty/:id/edit" element={<FacultyEdit />} />
      </Route>
      <Route path="/user/:id" element={<UserDetailPage />} />
      <Route path="/user/:id/edit" element={<UserFormPage edit={true} />} />
      <Route
        path="/user/create"
        element={
          loggedInUser?.roles.includes(UserRole.admin) && (
            <UserFormPage edit={false} />
          )
        }
      />
      <Route
        path="/user/:id/delete"
        element={
          loggedInUser?.roles.includes(UserRole.admin) && <UserDeletePage />
        }
      />

      <Route path="/subject" element={loggedInUser && <SubjectPage />} />
      <Route
        path="/subject/:id"
        element={loggedInUser && <SubjectDetailPage />}
      />
      <Route
        path="/subject/create"
        element={
          loggedInUser?.roles.includes(UserRole.teacher) && (
            <SubjectFormPage edit={false} />
          )
        }
      />
      <Route
        path="/subject/:id/edit"
        element={
          (loggedInUser?.roles.includes(UserRole.teacher) ||
            loggedInUser?.roles.includes(UserRole.admin)) && (
            <SubjectFormPage edit={true} />
          )
        }
      />
      <Route
        path="/subject/:id/delete"
        element={
          (loggedInUser?.roles.includes(UserRole.teacher) ||
            loggedInUser?.roles.includes(UserRole.admin)) && (
            <SubjectDeletePage />
          )
        }
      />
      <Route
        path="/subject/:id/teachers/add"
        element={
          (loggedInUser?.roles.includes(UserRole.teacher) ||
            loggedInUser?.roles.includes(UserRole.admin)) && (
            <SubjectAddTeacherPage />
          )
        }
      />
    </Routes>
  );
};

export default Pages;
