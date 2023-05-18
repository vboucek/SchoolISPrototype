import React from 'react';
import { Link } from 'react-router-dom';
import remove from '../../../public/assets/remove.svg';

export interface TutorPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
}

export interface TutorPreviewItemProps {
  tutor: TutorPreviewProps;
  canEdit: boolean | undefined;
  onRemove: (teacherId: number) => void;
}

const TutorPreview = ({ tutor, canEdit, onRemove }: TutorPreviewItemProps) => {
  return (
    <li className="teacher__item">
      <Link className="teacher__link" to={`/user/${tutor?.id}`}>
        <div className="teacher__name">
          {tutor.firstName} {tutor.lastName}
        </div>
      </Link>
      {canEdit && (
        <img
          onClick={() => onRemove(tutor.id)}
          src={remove}
          alt="remove"
          className="teacher__remove-icon"
        />
      )}
    </li>
  );
};

export default TutorPreview;
