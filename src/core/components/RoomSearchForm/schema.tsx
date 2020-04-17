import * as Yup from 'yup';
import { RoomSearchFormInput } from '../../models/search';
import moment from 'moment';

export const roomSearchFormSchema = Yup.object<RoomSearchFormInput>({
  checkIn: Yup.date()
    .required()
    .min(
      moment()
        .subtract(1, 'day')
        .set({ hours: 23, minutes: 59, seconds: 59 })
        .toDate(),
      "Check In date can't be in the past"
    ),
  checkOut: Yup.date()
    .required()
    .min(Yup.ref('checkIn'), "Check Out date can't be before check in date"),
  guests: Yup.number()
    .integer()
    .required('Please enter number of guests')
    .min(1, 'Guests must be more than 0')
    .max(36, 'Guests must be less than 36'),
});
