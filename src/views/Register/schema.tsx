import * as Yup from 'yup';
import { RegistrationModel } from '../../core/models/registration';

export const registrationSchema = Yup.object<RegistrationModel>({
  username: Yup.string()
    .required('Please enter your username')
    .min(5, 'User name too short, minimum 5 characters'),
  password: Yup.string()
    .required('No password provided.')
    .min(9, 'Password is too short - should be 9 chars minimum.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{9,}$/gm,
      'Password must contain numbers, letters and capital letters'
    ),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('Please enter your email'),
  firstname: Yup.string().required('Please enter your first name'),
  lastname: Yup.string().required('Please enter your last name'),
});
