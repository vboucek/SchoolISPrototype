import React, { useEffect, useState } from 'react';
import '../../styles/userList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import AddUserPreview, {
  AddUserPreviewFormInput,
  AddUserPreviewProps,
} from './AddUserPreview';

export interface UserPreviewListProps {
  title: string;
  users: AddUserPreviewProps[];
}

const AddUserPreviewList = ({ title, users }: UserPreviewListProps) => {
  const { id } = useParams();
  const [requestError, setRequestError] = useState<AxiosError>();
  const [userList, setUserList] = useState<AddUserPreviewProps[]>(users);
  const [hasTeachers, setHasTeachers] = useState<boolean>(false);

  useEffect(() => {
    setHasTeachers(userList.length > 0);
  }, [userList]);

  function onAddTeacher(
    teacherId: number,
    teacherProps: AddUserPreviewFormInput,
  ) {
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
      {hasTeachers && (
        <ul className="user__list">
          {userList.map((u) => (
            <AddUserPreview key={u.id} {...u} addTeacher={onAddTeacher} />
          ))}
        </ul>
      )}
      {!hasTeachers && <div className="info"> No teachers available. </div>}
      {requestError && <NoConnection />}
    </div>
  );
};

export default AddUserPreviewList;
