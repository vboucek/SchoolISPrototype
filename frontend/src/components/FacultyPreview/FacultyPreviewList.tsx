import React, { useState } from 'react';
import '../../styles/facultyList.css';
import { IFacultyDto } from '../../types/Faculty.dto';
import FacultyPreview from './FacultyPreview';
import { Link } from 'react-router-dom';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';

export interface FacultyPreviewListProps {
  title: string;
  faculties: IFacultyDto[];
}

const FacultyPreviewList = ({ title, faculties }: FacultyPreviewListProps) => {
  const [facultyAddLogo, setFacultyAddLogo] = useState(add);

  function facultyAddHover() {
    setFacultyAddLogo(facultyAddLogo === add ? hoverAdd : add);
  }

  return (
    <div className="faculty">
      <span className="faculty__header">{title}</span>
      <ul className="faculty__list">
        {faculties.map((f) => (
          <FacultyPreview key={f.id} id={f.id} name={f.name} />
        ))}
      </ul>
      <div className="add">
        <Link
          onMouseEnter={facultyAddHover}
          onMouseLeave={facultyAddHover}
          className="add__link"
          to="/faculty/create"
        >
          <img className="add__logo" src={facultyAddLogo} alt="add" />
          <button type="button" className="add__button">
            Add faculty
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FacultyPreviewList;
