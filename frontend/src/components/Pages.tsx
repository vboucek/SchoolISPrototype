import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../state/atoms';
import { AdminPage } from './Admin/AdminPage';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
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
import { FacultyFormPage } from './Faculty/FacultyFormPage';
import { FacultyDeletePage } from './Faculty/FacultyDeletePage';
import { SemesterFormPage } from './Semester/SemesterFormPage';
import { SemesterDeletePage } from './Semester/SemesterDeletePage';
import { SemGroupPage } from './SemGroup/SemGroupPage';
import { SemGroupAddTutorPage } from './SemGroup/SemGroupAddTutorPage';

export const Pages = () => {
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={loggedInUser && <Logout />} />

      <Route
        path="/admin"
        element={
          loggedInUser &&
          loggedInUser.roles.includes(UserRole.admin) && <AdminPage />
        }
      />
      <Route
        path="/faculty/create"
        element={<FacultyFormPage edit={false} />}
      />
      <Route path="/faculty/:id/delete" element={<FacultyDeletePage />} />
      <Route
        path="/faculty/:id/edit"
        element={<FacultyFormPage edit={true} />}
      />
      <Route
        path="/semester/create"
        element={<SemesterFormPage edit={false} />}
      />
      <Route path="/semester/:id/delete" element={<SemesterDeletePage />} />
      <Route
        path="/semester/:id/edit"
        element={<SemesterFormPage edit={true} />}
      />

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

      <Route path="/seminar/:id" element={loggedInUser && <SemGroupPage />} />
      <Route
        path="/seminar/:id/tutors/add"
        element={<SemGroupAddTutorPage />}
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
