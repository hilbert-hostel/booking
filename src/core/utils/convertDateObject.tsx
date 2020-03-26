import moment from 'moment';

export const convertDateObject = (obj: any) => {
  if (obj) {
    return {
      guests: obj.guests || 1,
      checkIn: new Date(obj.checkIn || ''),
      checkOut: obj.checkOut
        ? new Date(obj.checkOut || '')
        : moment()
            .add('day', 1)
            .toDate(),
    };
  } else {
    return;
  }
};
