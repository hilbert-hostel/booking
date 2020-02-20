import * as Yup from 'yup';
import { RoomSearchForm } from '../../../../core/models/search';

export const roomSearchFormSchema = Yup.object<RoomSearchForm>({
  from: Yup.date().required(),
  to: Yup.date().required(),
  guests: Yup.number()
    .integer()
    .required('Please enter number of guests'),
});
