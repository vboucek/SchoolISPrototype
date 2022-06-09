import '../../styles/timetable.css';
import TimeTableDayPreview from './TimeTableDayPreview';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { currentSemesterIdAtom, loggedInUserAtom } from '../../state/atoms';
import { useRecoilValue } from 'recoil';
import { TimeTableEntryProps } from './TimeTableSubjectPreview';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';

export const TimeTablePage = () => {
  const user = useRecoilValue(loggedInUserAtom);
  const semesterId = useRecoilValue(currentSemesterIdAtom);
  const [entries, setEntries] = React.useState<
    Record<string, TimeTableEntryProps[]>
  >(Object.create(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState();

  useEffect(() => {
    axios
      .get(`users/${user?.id}/timetable`, {
        params: { semesterId: semesterId },
      })
      .then((response: AxiosResponse) => {
        setEntries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [semesterId]);

  return (
    <div className="main-content">
      <div className="main-content-container">
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <>
            {[
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ].map((day) => (
              <TimeTableDayPreview title={day} entries={entries[day] || []} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
