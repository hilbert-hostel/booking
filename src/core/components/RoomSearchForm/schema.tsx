import * as Yup from 'yup';
import { RoomSearchFormInput } from '../../models/search';

export const roomSearchFormSchema = Yup.object<RoomSearchFormInput>({
  checkIn: Yup.date().required(),
  checkOut: Yup.date().required(),
  guests: Yup.number()
    .integer()
    .positive('Guests must be positive')
    .required('Please enter number of guests'),
});
