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
  name: string;
  seminarGroupDay: Day;
  seminarGroupDurationStartMins: number;
  seminarGroupDurationMins: number;
  capacity: number;
  room: string;
  course: {
    id: number;
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
  const [signError, setSignError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const [semGroup, setSemGroup] = useState<SemGroupProps>();
  const [students, setStudents] = useState<StudentPreviewProps[]>([]);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [tutorAddLogo, setTutorAddLogo] = useState(add);
  const [studentCount, setStudentCount] = useState(0);
  const [signedUp, setSignedUp] = useState<boolean>(false);

  function signUp() {
    axios
      .post(`/seminar-group/${id}/student`, {
        studentId: user?.id,
      })
      .then((response: AxiosResponse) => {
        setStudents([...students, response.data]);
        setSignError(undefined);
      })
      .catch((signError) => {
        setSignError(signError);
      });
  }

  function signOut() {
    axios
      .delete(`seminar-group/${id}/student`, {
        data: {
          studentId: user?.id,
        },
      })
      .then(() => {
        setStudents(students.filter((s) => s.id !== user?.id));
        setSignError(undefined);
      })
      .catch((error) => {
        setSignError(error);
      });
  }

  useEffect(() => {
    axios
      .get(`/seminar-group/${id}`)
      .then((response: AxiosResponse) => {
        const semGroup: SemGroupProps = response.data;
        setSemGroup(semGroup);
        const students = semGroup?.students?.map((student) => student.student);
        setStudents(students ?? []);
        setIsCreator(user?.id === semGroup?.course.creatorId);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });

    axios
      .get(`/seminar-group/${id}/student-count`)
      .then((response: AxiosResponse) => {
        const studentCount = response.data;
        setStudentCount(studentCount);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  });

  useEffect(() => {
    setSignedUp(students.find((s) => s.id === Number(user?.id)) != null);
  }, [students]);

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
                    <h1 className="seminar-info__title">{semGroup?.name}</h1>
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
                  <div className="seminar-info__room">{semGroup?.room}</div>
                </div>
                <div className="seminar-info__detail-row">
                  <div className="seminar-info__label">Capacity:</div>
                  <div className="seminar-info__room">
                    {studentCount} / {semGroup?.capacity}
                  </div>
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
            <div className="seminar-controls">
              {!isCreator && (
                <>
                  <button
                    onClick={signUp}
                    disabled={signedUp}
                    className="seminar-controls__button"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={signOut}
                    disabled={!signedUp}
                    className="seminar-controls__button"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {(isCreator || user?.roles.includes(UserRole.admin)) && (
                <Link to="delete" state={{ courseId: semGroup?.course.id }}>
                  <button className="seminar-controls__button">Delete</button>
                </Link>
              )}
            </div>
            {signError && (
              <div className="seminar-info__error">
                {signError.response?.data.message}
              </div>
            )}
            {semGroup && (
              <TutorPreviewList
                title="Tutors:"
                canEdit={isCreator || user?.roles.includes(UserRole.admin)}
                tutors={semGroup.tutors.map((t) => t.tutor)}
              />
            )}
            {semGroup && (isCreator || user?.roles.includes(UserRole.admin)) && (
              <div className="add">
                <Link
                  onMouseEnter={() => setTutorAddLogo(hoverAdd)}
                  onMouseLeave={() => setTutorAddLogo(add)}
                  className="add__link"
                  to={`/seminar/${id}/tutors/add`}
                >
                  <img className="add__logo" src={tutorAddLogo} alt="add" />
                  <button type="button" className="add__button">
                    Add tutor
                  </button>
                </Link>
              </div>
            )}
            {semGroup && (
              <StudentPreviewList
                title={'Students:'}
                canEdit={isCreator || user?.roles.includes(UserRole.admin)}
                students={students}
                setStudents={setStudents}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
