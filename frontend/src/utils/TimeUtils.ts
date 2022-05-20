const convertTime = (minutes: number | undefined): string => {
  if (minutes == undefined) {
    return '0:00';
  }
  return `${minutes / 60}:${String(minutes % 60).padStart(2, '0')}`;
};

const convertLength = (minutes: number | undefined): string => {
  if (minutes == undefined) {
    return '0';
  }
  return `${minutes / 60.0}h`;
};

export { convertTime, convertLength };
