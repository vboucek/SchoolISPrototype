import React, { useState } from 'react';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/addUserList.css';

export interface AddUserPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
  addTeacher: (
    teacherId: number,
    teacherProps: AddUserPreviewFormInput,
  ) => void;
}

export interface AddUserPreviewFormInput {
  isHelper: boolean;
  isLecturer: boolean;
}

const AddUserPreview = ({
  id,
  firstName,
  lastName,
  addTeacher,
}: AddUserPreviewProps) => {
  const [addUserIcon, setAddUserIcon] = useState(add);
  const { register, handleSubmit } = useForm<AddUserPreviewFormInput>();

  function userAddIconHover() {
    setAddUserIcon(addUserIcon === add ? hoverAdd : add);
  }

  const onSubmit: SubmitHandler<AddUserPreviewFormInput> = (
    data: AddUserPreviewFormInput,
  ) => {
    addTeacher(id, data);
  };

  return (
    <li className="add-user__item">
      <div className="add-user__name">
        {firstName} {lastName}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="add-user__form">
        <div className="add-user__controls-container">
          <label htmlFor="isLecturer">Lecturer:</label>
          <input
            className="add-user__checkbox"
            type="checkbox"
            {...register('isLecturer', {
              setValueAs: (value) => Boolean(value),
            })}
          />
        </div>
        <div className="add-user__controls-container">
          <label htmlFor="isHelper">Helper:</label>
          <input
            className="add-user__checkbox"
            type="checkbox"
            {...register('isHelper', {
              setValueAs: (value) => Boolean(value),
            })}
          />
        </div>
        <button className="add-user__add-button" type="submit">
          <img
            onMouseEnter={userAddIconHover}
            onMouseLeave={userAddIconHover}
            src={addUserIcon}
            alt="add"
            className="add-user__add-icon"
          />
        </button>
      </form>
    </li>
  );
};

export default AddUserPreview;
