import React, { useState } from 'react';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface UserPreviewProps {
  id: number;
  firstName: string;
  lastName: string;
  addTeacher: (teacherId: number, teacherProps: UserPreviewFormInput) => void;
}

export interface UserPreviewFormInput {
  isHelper: boolean;
  isLecturer: boolean;
}

const UserPreview = ({
  id,
  firstName,
  lastName,
  addTeacher,
}: UserPreviewProps) => {
  const [addUserIcon, setAddUserIcon] = useState(add);
  const { register, handleSubmit } = useForm<UserPreviewFormInput>();

  function userAddIconHover() {
    setAddUserIcon(addUserIcon === add ? hoverAdd : add);
  }

  const onSubmit: SubmitHandler<UserPreviewFormInput> = (
    data: UserPreviewFormInput,
  ) => {
    addTeacher(id, data);
  };

  return (
    <li className="user__item">
      <div className="user__name">
        {firstName} {lastName}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="user__form">
        <div className="user__controls-container">
          <label htmlFor="isLecturer">Lecturer:</label>
          <input
            className="user__checkbox"
            type="checkbox"
            {...register('isLecturer', {
              setValueAs: (value) => Boolean(value),
            })}
          />
        </div>
        <div className="user__controls-container">
          <label htmlFor="isHelper">Helper:</label>
          <input
            className="user__checkbox"
            type="checkbox"
            {...register('isHelper', {
              setValueAs: (value) => Boolean(value),
            })}
          />
        </div>
        <button className="user__add-button" type="submit">
          <img
            onMouseEnter={userAddIconHover}
            onMouseLeave={userAddIconHover}
            src={addUserIcon}
            alt="add"
            className="user__add-icon"
          />
        </button>
      </form>
    </li>
  );
};

export default UserPreview;
