import * as Yup from 'yup';
import { RegistrationModel } from '../../core/models/registration';

export const registrationSchema = Yup.object<RegistrationModel>({
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
  address: Yup.string().required('Please enter your address'),
  phone: Yup.string()
    .required('Please enter your phone number')
    .matches(/^0[0-9]{9}$/g, 'Invalid Phone number format'),
  nationalID: Yup.string()
    .required('Please enter your national ID')
    .matches(
      /^[0-9]{13}$/g,
      'Invalid National ID, National ID Card has to be 13 Characters'
    ),
});
