import * as Yup from 'yup';
import { LoginModel } from '../../core/models/auth';

export const loginSchema = Yup.object<LoginModel>({
  username: Yup.string().required('Please enter your username.'),
  password: Yup.string().required('Please enter your password.'),
});
