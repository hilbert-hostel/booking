import * as Yup from 'yup';
import { LoginModel } from '../../core/models/auth';

export const loginSchema = Yup.object<LoginModel>({
  email: Yup.string().required('Please enter your email.'),
  password: Yup.string().required('Please enter your password.'),
});
