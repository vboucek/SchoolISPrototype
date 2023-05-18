import React, { useEffect, useState } from 'react';
import '../../styles/teacherList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import TutorPreview, { TutorPreviewProps } from './TutorPreview';

export interface TutorPreviewListProps {
  title: string;
  canEdit?: boolean;
  tutors: TutorPreviewProps[];
}

const TutorPreviewList = ({
  title,
  tutors,
  canEdit,
}: TutorPreviewListProps) => {
  const { id } = useParams();
  const [tutorList, setTutorList] = useState<TutorPreviewProps[]>(tutors);
  const [deleteError, setDeleteError] = useState<AxiosError>();
  const [hasTutors, setHasTutors] = useState<boolean>(false);

  useEffect(() => {
    setHasTutors(tutorList.length > 0);
  }, [tutorList]);

  function onRemove(tutorId: number) {
    axios
      .delete(`seminar-group/${id}/tutor`, {
        data: {
          tutorId: tutorId,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setTutorList(tutorList.filter((t) => t.id != tutorId));
        }
      })
      .catch((deleteError_) => {
        setDeleteError(deleteError_);
      });
  }

  return (
    <div className="teacher">
      <span className="teacher__header">{title}</span>
      {hasTutors && (
        <ul className="teacher__list">
          {tutorList.map((t) => (
            <TutorPreview
              key={t.id}
              tutor={t}
              canEdit={canEdit}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
      {!hasTutors && <div className="info">This seminar has no tutors.</div>}
      {deleteError && <NoConnection />}
    </div>
  );
};

export default TutorPreviewList;
