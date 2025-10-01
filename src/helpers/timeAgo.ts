export const timeAgo = (timestamp: number): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${getMinutesWord(minutes)} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${getHoursWord(hours)} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${getDaysWord(days)} ago`;
  }
};

const getMinutesWord = (num: number) => {
  if (num === 1) return 'minute';
  if (num >= 2 && num <= 4) return 'minutes';
  return 'minute';
};

const getHoursWord = (num: number) => {
  if (num === 1) return 'hour';
  if (num >= 2 && num <= 4) return 'hours';
  return 'hours';
};

const getDaysWord = (num: number) => {
  if (num === 1) return 'day';
  if (num >= 2 && num <= 4) return 'days';
  return 'days';
};
