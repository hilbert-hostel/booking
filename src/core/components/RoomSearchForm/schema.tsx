import * as Yup from 'yup';
import { RoomSearchFormInput } from '../../models/search';

export const roomSearchFormSchema = Yup.object<RoomSearchFormInput>({
  from: Yup.date().required(),
  to: Yup.date().required(),
  guests: Yup.number()
    .integer()
    .positive('Guests must be positive')
    .required('Please enter number of guests'),
});
