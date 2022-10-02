import { DocumentData } from 'firebase-admin/firestore';

export interface UserModel extends DocumentData {
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