import React, { useState } from 'react';
import '../../styles/semesterList.css';
import { Link } from 'react-router-dom';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';
import { ISemesterDto } from '../../types/Semester.dto';
import SemesterPreview from './SemesterPreview';
import { semesterComparator } from '../../utils/SemesterComparator';

export interface semesterPreviewListProps {
  title: string;
  semesters: ISemesterDto[];
}

const SemesterPreviewList = ({
  title,
  semesters,
}: semesterPreviewListProps) => {
  const [semesterAddLogo, setSemesterAddLogo] = useState(add);
  const years = [...new Set(semesters.map((s) => s.year))];
  const [selectedYear, setSelectedYear] = useState(Math.max.apply(null, years));

  function semesterAddHover() {
    setSemesterAddLogo(semesterAddLogo === add ? hoverAdd : add);
  }

  function handleChange(e: React.FormEvent<HTMLSelectElement>) {
    setSelectedYear(Number(e.currentTarget.value));
  }

  return (
    <div className="semester">
      <div className="semester__header">{title}</div>
      <select onChange={handleChange} className="semester__select">
        {years
          .sort()
          .reverse()
          .map((y) => (
            <option value={y}>{y}</option>
          ))}
      </select>
      <ul className="semester__list">
        {semesters
          .filter((s) => s.year === selectedYear)
          .sort(semesterComparator)
          .reverse()
          .map((s) => (
            <SemesterPreview key={s.id} {...s} />
          ))}
      </ul>
      <div className="add">
        <Link
          onMouseEnter={semesterAddHover}
          onMouseLeave={semesterAddHover}
          className="add__link"
          to="/semester/create"
        >
          <img className="add__logo" src={semesterAddLogo} alt="add" />
          <button type="button" className="add__button">
            Add semester
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SemesterPreviewList;
