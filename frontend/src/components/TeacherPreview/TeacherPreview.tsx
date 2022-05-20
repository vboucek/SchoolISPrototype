import React from 'react';
import { Link } from 'react-router-dom';

export interface TeacherPreviewProps {
  id: number;
  teacher: {
    firstName: string;
    lastName: string;
  };
  isLecturer: boolean;
  isHelper: boolean;
}

const TeacherPreview = ({
  id,
  teacher,
  isLecturer,
  isHelper,
}: TeacherPreviewProps) => {
  return (
    <Link to={`/user/${id}`}>
      <li className="teacher__item">
        <div className="teacher__name">
          {teacher.firstName} {teacher.lastName}
        </div>
        <div className="teacher__position">
          {[isLecturer ? 'Lecturer' : null, isHelper ? 'Helper' : null]
            .filter((x) => x != null)
            .join(', ')}
        </div>
      </li>
    </Link>
  );
};

export default TeacherPreview;
