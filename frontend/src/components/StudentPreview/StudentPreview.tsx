import React from 'react';
import { Link } from 'react-router-dom';
import remove from '../../../public/assets/remove.svg';

export interface StudentPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
}

export interface StudentPreviewItemProps {
  student: StudentPreviewProps;
  canEdit: boolean | undefined;
  onRemove: (studentId: number) => void;
}

const StudentPreview = ({
  student,
  canEdit,
  onRemove,
}: StudentPreviewItemProps) => {
  return (
    <li className="teacher__item">
      <Link className="teacher__link" to={`/user/${student?.id}`}>
        <div className="teacher__name">
          {student.firstName} {student.lastName}
        </div>
      </Link>
      {canEdit && (
        <img
          onClick={() => onRemove(student.id)}
          src={remove}
          alt="remove"
          className="teacher__remove-icon"
        />
      )}
    </li>
  );
};

export default StudentPreview;
