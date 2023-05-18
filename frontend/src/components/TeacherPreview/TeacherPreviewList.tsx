import React, { useEffect, useState } from 'react';
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
  const [hasTeachers, setHasTeachers] = useState<boolean>(false);

  useEffect(() => {
    setHasTeachers(teachersList.length > 0);
  }, [teachersList]);

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
      {hasTeachers && (
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
      )}
      {!hasTeachers && <div className="info"> No teachers available. </div>}
      {deleteError && <NoConnection />}
    </div>
  );
};

export default TeacherPreviewList;
