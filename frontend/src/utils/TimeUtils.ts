const convertTime = (minutes: number | undefined): string => {
  if (minutes == undefined) {
    return '0:00';
  }
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
};

const getMinFromForm = (time: string | number): number => {
  if (typeof time === 'number') {
    return time;
  }

  const split = time.split(':');

  if (split.length < 2) {
    return -1;
  }

  return Number(split[0]) * 60 + Number(split[1]);
};

const convertToLocalDatetime = (date: Date | undefined): string => {
  if (date == undefined) {
    return '';
  }

  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, -8);
};

export { convertTime, getMinFromForm, convertToLocalDatetime };
