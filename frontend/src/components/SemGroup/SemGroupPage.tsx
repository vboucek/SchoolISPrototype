import '../../styles/seminarDetail.css';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TutorPreviewList from '../TutorPreview/TutorPreviewList';
import StudentPreviewList from '../StudentPreview/StudentPreviewList';
import { TutorPreviewProps } from '../TutorPreview/TutorPreview';
import { StudentPreviewProps } from '../StudentPreview/StudentPreview';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import { format } from 'date-fns';
import { UserRole } from '../../types/UserRole';
import add from '../../../public/assets/add.svg';
import hoverAdd from '../../../public/assets/add-hover.svg';

interface SemGroupProps {
  id: string;
  seminarGroupDay: Day;
  seminarGroupDurationStartMins: number;
  seminarGroupDurationMins: number;
  capacity: number;
  room: string;
  course: {
    creatorId: number;
    code: string;
    credits: number;
    endType: string;
    startSign: number;
    endSign: number;
    faculty: {
      name: string;
    };
  };
  tutors: { tutor: TutorPreviewProps }[];
  students: { student: StudentPreviewProps }[];
}

export const SemGroupPage = () => {
  const { id } = useParams();
  const user = useRecoilValue(loggedInUserAtom);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [semGroup, setSemGroup] = useState<SemGroupProps>();
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [tutorAddLogo, setTutorAddLogo] = useState(add);

  useEffect(() => {
    axios
      .get(`/seminar-group/${id}`)
      .then((response: AxiosResponse) => {
        const semGroup: SemGroupProps = response.data;
        setSemGroup(semGroup);
        setIsCreator(user?.id === semGroup?.course.creatorId);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  });

  return (
    <main className="main-content">
      <div className="main-content-container">
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <>
            <div className="seminar-info">
              <div className="seminar-info__header">
                <div className="seminar-info__sub-header">
                  <span className="seminar-info__faculty">
                    {semGroup?.course?.faculty.name}
                  </span>
                </div>
                <div className="seminar-info__main-header">
                  <div className="seminar-info__row">
                    <span className="subject-info__code">
                      {semGroup?.course?.code}
                    </span>
                    <h1 className="subject-info__title">Seminar Group #XXX</h1>
                  </div>
                  <div className="seminar-info__row">
                    <span className="seminar-info__end-type">
                      {semGroup?.course?.endType}
                    </span>
                    <span className="seminar-info__credits">
                      {semGroup?.course?.credits} kr
                    </span>
                  </div>
                </div>
              </div>
              <hr className="seminar-info__line" />
              <div className="seminar-info__detail">
                <div className="seminar-info__detail-row">
                  <div className="seminar-info__label">Seminar:</div>
                  <div className="seminar-info__lecture">
                    Monday 16:00-18:00
                  </div>
                </div>
                <div className="seminar-info__detail-row">
                  <div className="seminar-info__label">Room:</div>
                  <div className="subject-info__room">{semGroup?.room}</div>
                </div>
                <div className="seminar-info__detail-row">
                  <div className="seminar-info__label">Capacity:</div>
                  <div className="seminar-info__room">7/20</div>
                </div>
                <div className="seminar-info__detail-row">
                  <div className="seminar-info__label">Sign:</div>
                  <div className="seminar-info__sign">
                    {format(
                      new Date(
                        semGroup ? semGroup.course.startSign : new Date(),
                      ),
                      'dd. MM. yyyy HH:mm',
                    )}
                    -
                    {format(
                      new Date(semGroup ? semGroup.course.endSign : new Date()),
                      'dd. MM. yyyy HH:mm',
                    )}
                  </div>
                </div>
              </div>
            </div>
            {semGroup && (
              <TutorPreviewList
                title="Tutors:"
                canEdit={isCreator || user?.roles.includes(UserRole.admin)}
                tutors={semGroup.tutors.map((t) => t.tutor)}
              />
            )}
            {semGroup && (isCreator || user?.roles.includes(UserRole.admin)) && (
              <Link
                onMouseEnter={() => setTutorAddLogo(hoverAdd)}
                onMouseLeave={() => setTutorAddLogo(add)}
                className="add"
                to={`/seminar/${id}/tutors/add`}
              >
                <img className="add__logo" src={tutorAddLogo} alt="add" />
                <button type="button" className="add__button">
                  Add tutor
                </button>
              </Link>
            )}
            {semGroup && (
              <StudentPreviewList
                title={'Students:'}
                canEdit={isCreator || user?.roles.includes(UserRole.admin)}
                students={semGroup.students.map((s) => s.student)}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
