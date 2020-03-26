import moment from 'moment';

export const convertDateObject = (obj: any) => {
  if (obj) {
    return {
      guests: obj.guests || 1,
      checkIn: obj.checkIn ? new Date(obj.checkIn) : new Date(),
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
