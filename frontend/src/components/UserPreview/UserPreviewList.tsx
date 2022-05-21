import React, { useState } from 'react';
import '../../styles/userList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import UserPreview, {
  UserPreviewFormInput,
  UserPreviewProps,
} from './UserPreview';

export interface UserPreviewListProps {
  title: string;
  users: UserPreviewProps[];
}

const UserPreviewList = ({ title, users }: UserPreviewListProps) => {
  const { id } = useParams();
  const [requestError, setRequestError] = useState<AxiosError>();
  const [userList, setUserList] = useState<UserPreviewProps[]>(users);

  function onAddTeacher(teacherId: number, teacherProps: UserPreviewFormInput) {
    axios
      .post(`subjects/${id}/teacher`, {
        teacherId: teacherId,
        ...teacherProps,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          setUserList(userList.filter((u) => u.id != teacherId));
        }
      })
      .catch((error_) => {
        setRequestError(error_);
      });
  }

  return (
    <div className="user">
      <span className="user__header">{title}</span>
      <ul className="user__list">
        {userList.map((u) => (
          <UserPreview key={u.id} {...u} addTeacher={onAddTeacher} />
        ))}
      </ul>
      {requestError && <NoConnection />}
    </div>
  );
};

export default UserPreviewList;
