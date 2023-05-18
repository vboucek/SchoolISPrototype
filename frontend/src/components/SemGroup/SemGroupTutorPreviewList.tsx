import React, { useState } from 'react';
import '../../styles/tutorList.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import SemGroupUserPreview, {
  SemGroupUserPreviewProps,
} from './SemGroupUserPreview';

export interface SemGroupTutorPreviewListProps {
  title: string;
  tutors: SemGroupUserPreviewProps[];
}

const SemGroupTutorPreviewList = ({
  title,
  tutors,
}: SemGroupTutorPreviewListProps) => {
  const { id } = useParams();
  const [requestError, setRequestError] = useState<AxiosError>();
  const [tutorList, setTutorList] =
    useState<SemGroupUserPreviewProps[]>(tutors);

  function onAddTutor(tutorId: number) {
    axios
      .post(`seminar-group/${id}/tutor`, {
        tutorId: tutorId,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          setTutorList(tutorList.filter((u) => u.id != tutorId));
        }
      })
      .catch((error_) => {
        setRequestError(error_);
      });
  }

  return (
    <div className="tutor">
      <span className="tutor__header">{title}</span>
      <ul className="tutor__list">
        {tutorList.map((u) => (
          <SemGroupUserPreview key={u.id} {...u} addUser={onAddTutor} />
        ))}
      </ul>
      {requestError && <NoConnection />}
    </div>
  );
};

export default SemGroupTutorPreviewList;
