export interface UserModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  address?: {
    city?: string;
    street?: string;
    zipCode?: string;
  }
}