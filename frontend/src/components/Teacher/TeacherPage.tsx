import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
    loggedInUserAtom,
} from '../../state/atoms';
import '../../styles/userDetail.css';

import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { currentSemesterSelector } from '../../state/selectors';
import {Link} from "react-router-dom";

export const TeacherPage = () => {
    const user = useRecoilValue(loggedInUserAtom);
    const currentSemester = useRecoilValue(currentSemesterSelector);
    const [currentSubjects, setCurrentSubjects] = useState<SubjectPreviewProps[]>(
        [],
    );
    const [currentTaughtSubjects, setCurrentTaughtSubjects] = useState<
        SubjectPreviewProps[]
        >([]);

    useEffect(() => {
        axios
            .get(`users/${user?.id}/subjects`, {
                params: {
                    semesterId: currentSemester?.id,
                },
            })
            .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
                const subjects: SubjectPreviewProps[] = response.data;
                setCurrentSubjects(subjects);
            })
        axios
            .get(`users/${user?.id}/teacher/subjects`, {
                params: {
                    semesterId: currentSemester?.id,
                },
            })
            .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
                const subjects: SubjectPreviewProps[] = response.data;
                setCurrentTaughtSubjects(subjects);
            })
    }, [currentSemester]);


    return (
        <main className="main-content">
            <div className="main-content-container">

                <SubjectPreviewList
                    title={'Subjects taught by me:'}
                    subjects={currentTaughtSubjects}
                />

                <Link className="add" to="/teacher/add">
                    <img className="add__logo" src="/public/assets/add.svg" alt="add"/>
                    <button type="button" className="add__button">
                        Add course
                    </button>
                </Link>
            </div>
        </main>
    );
};
