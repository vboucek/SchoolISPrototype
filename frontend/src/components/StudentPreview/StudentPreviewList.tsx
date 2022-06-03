import React, { useState } from 'react';
import '../../styles/teacherList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import StudentPreview, { StudentPreviewProps } from './StudentPreview';

export interface StudentPreviewListProps {
  title: string;
  canEdit?: boolean;
  students: StudentPreviewProps[];
}

const StudentPreviewList = ({
  title,
  students,
  canEdit,
}: StudentPreviewListProps) => {
  const { id } = useParams();
  const [studentList, setStudentList] =
    useState<StudentPreviewProps[]>(students);
  const [deleteError, setDeleteError] = useState<AxiosError>();

  function onRemove(studentId: number) {
    axios
      .delete(`seminar-group/${id}/student`, {
        data: {
          studentId: studentId,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setStudentList(studentList.filter((t) => t.id != studentId));
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
        {studentList.map((s) => (
          <StudentPreview
            key={s.id}
            student={s}
            canEdit={canEdit}
            onRemove={onRemove}
          />
        ))}
      </ul>
      {deleteError && <NoConnection />}
    </div>
  );
};

export default StudentPreviewList;
