import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import '../../styles/subjectDetail.css';
import { format } from 'date-fns';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import TeacherPreviewList from '../TeacherPreview/TeacherPreviewList';
import SemGroupPreviewList from '../SemGroupPreview/SemGroupPreviewList';
import { SemGroupPreviewProps } from '../SemGroupPreview/SemGroupPreview';
import { TeacherPreviewProps } from '../TeacherPreview/TeacherPreview';
import { IFacultyDto } from '../../types/Faculty.dto';
import { ISemesterDto } from '../../types/Semester.dto';
import { convertTime } from '../../utils/TimeUtils';
import { IUserDto } from '../../types/User.dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserAtom, userSubjectsAtom } from '../../state/atoms';

export interface SubjectDetailProps {
  id: number;
  code: string;
  title: string;
  startSign: number;
  endSign: number;
  endType: string;
  credits: number;
  description: string;
  room: string;
  capacity: number;
  lectureDay: string;
  lectureDurationMin: number;
  lectureStartTimeMin: number;
  seminarGroups: SemGroupPreviewProps[];
  creator: IUserDto;
  teachers: TeacherPreviewProps[];
  facultyId: number;
  faculty: IFacultyDto;
  semesterId: number;
  semester: ISemesterDto;
}

const SubjectDetailPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [signError, setSignError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState<SubjectDetailProps>();
  const { id } = useParams();
  const [subjects, setSubjects] = useRecoilState(userSubjectsAtom);
  const user = useRecoilValue(loggedInUserAtom);

  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  useEffect(() => {
    setSignedUp(subjects.find((s) => s.id === Number(id)) != null);
  }, [subjects]);

  useEffect(() => {
    setIsCreator(user?.id === subject?.creator.id);
  }, [user]);

  useEffect(() => {
    axios
      .get(`subjects/${id}`)
      .then((response: AxiosResponse) => {
        const subject: SubjectDetailProps = response.data;
        console.log(subject);
        setSubject(subject);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  }, []);

  function signUp() {
    axios
      .post(`subjects/${id}/signup`, {
        userId: user?.id,
      })
      .then((response: AxiosResponse) => {
        if (response.status == 201 && subject) {
          setSubjects([...subjects, subject]);
        }
      })
      .catch((signError_) => {
        setSignError(signError_);
      });
  }

  return (
    <main className="main-content">
      <div className="main-content-container">
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <>
            <div className="subject-info">
              <div className="subject-info__header">
                <div className="subject-info__sub-header">
                  <span className="subject-info__faculty">
                    {subject?.faculty.name}
                  </span>
                </div>
                <div className="subject-info__main-header">
                  <div className="subject-info__row">
                    <span className="subject-info__code">PB138</span>
                    <h1 className="subject-info__title">{subject?.title}</h1>
                  </div>
                  <div className="subject-info__row">
                    <span className="subject-info__end-type">
                      {subject?.endType}
                    </span>
                    <span className="subject-info__credits">
                      {subject?.credits} kr.
                    </span>
                  </div>
                </div>
              </div>
              <hr className="subject-info__line" />
              <div className="subject-info__detail">
                <div className="subject-info__detail-row">
                  <div className="subject-info__label">Supervisor:</div>
                  <div className="subject-info__supervisor">
                    {subject?.creator.firstName} {subject?.creator.firstName}
                  </div>
                </div>
                <div className="subject-info__detail-row">
                  <div className="subject-info__label">Lecture:</div>
                  <div className="subject-info__lecture">
                    {subject?.lectureDay}{' '}
                    {convertTime(subject?.lectureStartTimeMin)}
                    {'-'}
                    {convertTime(
                      subject != null
                        ? subject?.lectureStartTimeMin +
                            subject?.lectureDurationMin
                        : undefined,
                    )}
                  </div>
                </div>
                <div className="subject-info__detail-row">
                  <div className="subject-info__label">Room:</div>
                  <div className="subject-info__room">{subject?.room}</div>
                </div>
                <div className="subject-info__detail-row">
                  <div className="subject-info__label">Sign:</div>
                  <div className="subject-info__sign">
                    {format(
                      new Date(subject ? subject.startSign : new Date()),
                      'dd.MM.yyyy HH:mm',
                    )}
                    -
                    {format(
                      new Date(subject ? subject.endSign : new Date()),
                      'dd.MM.yyyy HH:mm',
                    )}
                  </div>
                </div>
              </div>
              <div className="subject-info__description-container">
                <div className="subject-info__label">Description:</div>
                <div className="subject-info__description">
                  {subject?.description}
                </div>
              </div>
            </div>
            <div className="subject-controls">
              {!isCreator && (
                <button
                  onClick={signUp}
                  disabled={signedUp}
                  className="subject-controls__button"
                >
                  {signedUp ? 'Signed Up' : 'Sign Up'}
                </button>
              )}
              <button className="subject-controls__button">Delete</button>
              <button className="subject-controls__button">Edit</button>
            </div>
            {signError && (
              <div className="sign-error">You cannot sign this course now!</div>
            )}
            {subject && (
              <TeacherPreviewList
                title="Teachers:"
                teachers={subject.teachers}
              />
            )}
            {subject && (
              <SemGroupPreviewList
                title={'Seminar groups:'}
                seminarGroups={subject.seminarGroups}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};
export default SubjectDetailPage;
