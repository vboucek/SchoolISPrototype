import React from 'react';
import { Link } from 'react-router-dom';
import remove from '../../../public/assets/remove.svg';

export interface TeacherPreviewProps {
  teacher: {
    id: number;
    firstName: string;
    lastName: string;
  };
  isLecturer: boolean;
  isHelper: boolean;
  canEdit: boolean | undefined;
  onRemove: (teacherId: number) => void;
}

const TeacherPreview = ({
  canEdit,
  teacher,
  isLecturer,
  isHelper,
  onRemove,
}: TeacherPreviewProps) => {
  return (
    <li className="teacher__item">
      <Link className="teacher__link" to={`/user/${teacher?.id}`}>
        <div className="teacher__name">
          {teacher.firstName} {teacher.lastName}
        </div>
        <div className="teacher__position">
          {[isLecturer ? 'Lecturer' : null, isHelper ? 'Helper' : null]
            .filter((x) => x != null)
            .join(', ')}
        </div>
      </Link>
      {canEdit && (
        <img
          onClick={() => onRemove(teacher.id)}
          src={remove}
          alt="remove"
          className="teacher__remove-icon"
        />
      )}
    </li>
  );
};

export default TeacherPreview;
