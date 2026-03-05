export const convertDateToLocaleDate = (date: string): string => {
  const isoDate = new Date(date);
  const localeDate = isoDate.toLocaleDateString('en-GB');
  return localeDate;
};

export const convertToDateAndTimeDisplay = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  const time = isoDate.split('T')[1].split('.')[0];

  return `${day} ${month} ${year}, ${time}`;
};
