import React, { useState } from 'react';
import '../../styles/teacherList.css';
import TeacherPreview, { TeacherPreviewProps } from './TeacherPreview';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';

export interface TeacherPreviewListProps {
  title: string;
  canEdit?: boolean;
  teachers: TeacherPreviewProps[];
}

const TeacherPreviewList = ({
  title,
  teachers,
  canEdit,
}: TeacherPreviewListProps) => {
  const { id } = useParams();
  const [teachersList, setTeachersList] =
    useState<TeacherPreviewProps[]>(teachers);
  const [deleteError, setDeleteError] = useState<AxiosError>();

  function onRemove(teacherId: number) {
    axios
      .delete(`subjects/${id}/teacher`, {
        data: {
          teacherId: teacherId,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setTeachersList(
            teachersList.filter((t) => t.teacher.id != teacherId),
          );
        }
      })
      .catch((deleteError_) => {
        setDeleteError(deleteError_);
      });
  }

  return (
    <div className="teacher">
      <span className="teacher__header">{title}</span>
      <ul className="teacher__list">
        {teachersList.map((t) => (
          <TeacherPreview
            key={t.teacher.id}
            {...t}
            canEdit={canEdit}
            onRemove={onRemove}
          />
        ))}
      </ul>
      {deleteError && <NoConnection />}
    </div>
  );
};

export default TeacherPreviewList;
