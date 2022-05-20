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

const getMinFromString = (time: string): number => {
  const split = time.split(':');

  if (split.length < 2) {
    return -1;
  }

  return Number(split[0]) * 60 + Number(split[1]);
};

export { convertTime, convertLength, getMinFromString };
