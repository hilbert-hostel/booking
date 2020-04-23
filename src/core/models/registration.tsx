export interface RegistrationModel {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  nationalID: string;
  phone: string;
}

export interface EditProfileModel {
  firstname: string;
  lastname: string;
  address: string;
  nationalID: string;
  phone: string;
}
